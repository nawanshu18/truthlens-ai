from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse

from app.services.audio_extractor import extract_audio
from app.services.transcriber import transcribe_audio
from app.services.classifier import predict_text
from app.services.keyword_checker import detect_keywords
from app.services.ocr_extractor import extract_text_from_video
from app.services.deepfake_detector import detect_deepfake
from app.services.report_generator import generate_report

from app.database.db import SessionLocal
from app.database.db import VideoAnalysis

from app.services.explainer import explain_content
from app.services.category_detector import detect_category

import os
import time


router = APIRouter()

UPLOAD_FOLDER = "uploads"


# =========================================================
# ANALYZE VIDEO
# =========================================================

@router.post("/analyze-video")
async def analyze_video(file: UploadFile = File(...)):

    # -----------------------------------------------------
    # Start total timer
    # -----------------------------------------------------

    start_time = time.time()

    # -----------------------------------------------------
    # Create upload folder
    # -----------------------------------------------------

    os.makedirs(
        UPLOAD_FOLDER,
        exist_ok=True
    )

    video_path = f"{UPLOAD_FOLDER}/{file.filename}"

    # -----------------------------------------------------
    # Save uploaded video
    # -----------------------------------------------------

    with open(video_path, "wb") as buffer:

        buffer.write(
            await file.read()
        )

    print(
        f"📁 Video saved: {file.filename}"
    )

    # =====================================================
    # Extract audio
    # =====================================================

    audio_start = time.time()

    audio_path = extract_audio(
        video_path
    )

    print(
        f"⏱️ Audio extraction: "
        f"{time.time() - audio_start:.2f}s"
    )

    # =====================================================
    # Speech-to-text
    # =====================================================

    transcription_start = time.time()

    transcription = transcribe_audio(
        audio_path
    )

    print(
        f"⏱️ Transcription: "
        f"{time.time() - transcription_start:.2f}s"
    )

    # =====================================================
    # OCR extraction
    # =====================================================

    ocr_start = time.time()

    ocr_text = extract_text_from_video(
        video_path
    )

    print(
        f"⏱️ OCR: "
        f"{time.time() - ocr_start:.2f}s"
    )

    # =====================================================
    # Combine speech + OCR text
    # =====================================================

    combined_text = (
        transcription
        + " "
        + ocr_text
    )

    # =====================================================
    # Risk explanation
    # =====================================================

    reasons = explain_content(
        combined_text
    )

    # =====================================================
    # Category detection
    # =====================================================

    category = detect_category(
        combined_text
    )

    # =====================================================
    # ML prediction
    # =====================================================

    classification_start = time.time()

    result = predict_text(
        combined_text
    )

    print(
        f"⏱️ Classification: "
        f"{time.time() - classification_start:.2f}s"
    )

    # =====================================================
    # Suspicious keywords
    # =====================================================

    keywords = detect_keywords(
        combined_text
    )

    # =====================================================
    # Deepfake detection
    # =====================================================

    deepfake_start = time.time()

    deepfake_result = detect_deepfake(
        video_path
    )

    print(
        f"⏱️ Deepfake analysis: "
        f"{time.time() - deepfake_start:.2f}s"
    )

    # =====================================================
    # Trust Score
    # =====================================================

    trust_score = result[
        "trust_score"
    ]

    # =====================================================
    # Save analysis to database
    # =====================================================

    db = SessionLocal()

    video_entry = VideoAnalysis(

        video_name=file.filename,

        transcription=transcription,

        ocr_text=ocr_text,

        prediction=result["label"],

        confidence=result["confidence"],

        trust_score=trust_score,

        category=category,

        risk_reasons="|".join(
            reasons
        ),

        suspicious_keywords="|".join(
            keywords
        ),

        deepfake_status=deepfake_result.get(
            "deepfake_status"
        ),

        deepfake_score=deepfake_result.get(
            "deepfake_score"
        )
    )

    db.add(
        video_entry
    )

    db.commit()

    # -----------------------------------------------------
    # Get database ID
    # -----------------------------------------------------

    db.refresh(
        video_entry
    )

    video_id = video_entry.id

    db.close()

    # =====================================================
    # Dynamic message
    # =====================================================

    if result["label"] == "Safe":

        message = (
            "The model classified the content as Safe. "
            "This is an AI-assisted classification and "
            "does not guarantee factual accuracy."
        )

    elif result["label"] == "Risky":

        if reasons:

            message = (
                "The model classified the content as Risky "
                "and rule-based indicators were detected. "
                "Further verification is recommended."
            )

        else:

            message = (
                "The model classified the content as Risky, "
                "but no rule-based risk indicators were "
                "detected. Further verification is recommended."
            )

    else:

        message = (
            "The model is uncertain. "
            "Manual review and verification are recommended."
        )

    # =====================================================
    # Total analysis time
    # =====================================================

    total_time = (
        time.time()
        - start_time
    )

    print(
        f"⏱️ TOTAL ANALYSIS TIME: "
        f"{total_time:.2f}s"
    )

    print(
        "✅ Analysis completed successfully"
    )

    # =====================================================
    # API response
    # =====================================================

    return {

        "status": "processed",

        "video_id": video_id,

        "video_name": file.filename,

        "analysis": {

            "transcription": transcription,

            "ocr_text": ocr_text,

            "prediction": result["label"],

            "confidence_score": result["confidence"],

            "suspicious_keywords": keywords,

            "trust_score": trust_score,

            "deepfake_analysis": deepfake_result,

            "category": category,

            "risk_reasons": reasons,

        },

        "message": message

    }


# =========================================================
# ANALYSIS HISTORY
# =========================================================

@router.get("/history")
def get_history():

    db = SessionLocal()

    records = (
        db.query(VideoAnalysis)
        .order_by(
            VideoAnalysis.id.desc()
        )
        .all()
    )

    history = []

    for record in records:

        history.append({

            "id": record.id,

            "video_name": record.video_name,

            "transcription": (
                record.transcription
            ),

            "ocr_text": (
                record.ocr_text
                or ""
            ),

            "prediction": (
                record.prediction
            ),

            "confidence": (
                record.confidence
            ),

            "trust_score": (
                record.trust_score
            ),

            "category": (
                record.category
            ),

            "risk_reasons": (
                record.risk_reasons
            ),

            "suspicious_keywords": (
                record.suspicious_keywords
            ),

            "deepfake_status": (
                record.deepfake_status
            ),

            "deepfake_score": (
                record.deepfake_score
            )

        })

    db.close()

    return {

        "total_records": len(
            history
        ),

        "data": history

    }


# =========================================================
# GENERATE PDF REPORT
# =========================================================

@router.get(
    "/generate-report/{video_id}"
)
def generate_analysis_report(
    video_id: int
):

    db = SessionLocal()

    # -----------------------------------------------------
    # Find analysis record
    # -----------------------------------------------------

    record = (
        db.query(VideoAnalysis)
        .filter(
            VideoAnalysis.id == video_id
        )
        .first()
    )

    # -----------------------------------------------------
    # Record not found
    # -----------------------------------------------------

    if not record:

        db.close()

        return {
            "error":
            "Analysis record not found"
        }

    # -----------------------------------------------------
    # Convert risk reasons
    # -----------------------------------------------------

    risk_reasons = []

    if record.risk_reasons:

        risk_reasons = (
            record.risk_reasons
            .split("|")
        )

    # -----------------------------------------------------
    # Convert suspicious keywords
    # -----------------------------------------------------

    suspicious_keywords = []

    if record.suspicious_keywords:

        suspicious_keywords = (
            record.suspicious_keywords
            .split("|")
        )

    # -----------------------------------------------------
    # Deepfake information
    # -----------------------------------------------------

    deepfake_analysis = {

        "deepfake_status": (
            record.deepfake_status
            or "Deepfake analysis unavailable"
        ),

        "deepfake_score": (
            record.deepfake_score
        )

    }

    # -----------------------------------------------------
    # Complete report data
    # -----------------------------------------------------

    report_data = {

        "video_name": (
            record.video_name
        ),

        "prediction": (
            record.prediction
        ),

        "confidence_score": (
            record.confidence
        ),

        "trust_score": (
            record.trust_score
            or 0
        ),

        "category": (
            record.category
            or "General"
        ),

        "risk_reasons": (
            risk_reasons
        ),

        "suspicious_keywords": (
            suspicious_keywords
        ),

        "deepfake_analysis": (
            deepfake_analysis
        ),

        "transcription": (
            record.transcription
            or ""
        ),

        "ocr_text": (
            record.ocr_text
            or ""
        )

    }

    # -----------------------------------------------------
    # Create reports folder
    # -----------------------------------------------------

    reports_folder = "reports"

    os.makedirs(
        reports_folder,
        exist_ok=True
    )

    # -----------------------------------------------------
    # PDF path
    # -----------------------------------------------------

    report_path = (
        f"{reports_folder}/"
        f"truthlens_report_{video_id}.pdf"
    )

    # -----------------------------------------------------
    # Generate PDF
    # -----------------------------------------------------

    generate_report(
        report_data,
        report_path
    )

    db.close()

    # -----------------------------------------------------
    # Return PDF
    # -----------------------------------------------------

    return FileResponse(

        report_path,

        media_type="application/pdf",

        filename=(
            f"truthlens_report_{video_id}.pdf"
        )

    )