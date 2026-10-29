from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib.units import inch
from datetime import datetime
import os


def generate_report(analysis_data, output_path):

    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Title"],
        alignment=TA_CENTER,
        fontSize=22,
        spaceAfter=20,
    )

    heading_style = ParagraphStyle(
        "HeadingStyle",
        parent=styles["Heading2"],
        fontSize=14,
        spaceBefore=12,
        spaceAfter=8,
    )

    body_style = ParagraphStyle(
        "BodyStyle",
        parent=styles["BodyText"],
        fontSize=10,
        leading=15,
    )

    story = []

    # Title
    story.append(
        Paragraph(
            "TruthLens AI",
            title_style
        )
    )

    story.append(
        Paragraph(
            "AI Video Misinformation Analysis Report",
            styles["Heading2"]
        )
    )

    story.append(Spacer(1, 10))

    # Report information
    report_time = datetime.now().strftime(
        "%d %B %Y, %I:%M %p"
    )

    info_data = [
        ["Video", analysis_data.get("video_name", "Unknown")],
        ["Generated", report_time],
        ["Prediction", analysis_data.get("prediction", "Unknown")],
        ["Category", analysis_data.get("category", "Unknown")],
        [
            "Confidence",
            f'{analysis_data.get("confidence_score", 0) * 100:.2f}%'
        ],
        [
            "Trust Score",
            f'{analysis_data.get("trust_score", 0):.2f}%'
        ],
    ]

    info_table = Table(
        info_data,
        colWidths=[1.5 * inch, 4.8 * inch]
    )

    info_table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), colors.lightgrey),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
            ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
            ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("PADDING", (0, 0), (-1, -1), 8),
        ])
    )

    story.append(info_table)

    # Risk explanation
    story.append(
        Paragraph(
            "Risk Explanation",
            heading_style
        )
    )

    reasons = analysis_data.get(
        "risk_reasons",
        []
    )

    if reasons:

        for reason in reasons:

            story.append(
                Paragraph(
                    f"• {reason}",
                    body_style
                )
            )

    else:

        story.append(
            Paragraph(
                "No specific risk reasons detected.",
                body_style
            )
        )

    # Suspicious keywords
    story.append(
        Paragraph(
            "Suspicious Keywords",
            heading_style
        )
    )

    keywords = analysis_data.get(
        "suspicious_keywords",
        []
    )

    if keywords:

        story.append(
            Paragraph(
                ", ".join(keywords),
                body_style
            )
        )

    else:

        story.append(
            Paragraph(
                "No suspicious keywords detected.",
                body_style
            )
        )

    # Deepfake analysis
    story.append(
        Paragraph(
            "Deepfake Analysis",
            heading_style
        )
    )

    deepfake = analysis_data.get(
        "deepfake_analysis",
        {}
    )

    deepfake_status = deepfake.get(
        "deepfake_status",
        "Unavailable"
    )

    deepfake_score = deepfake.get(
        "deepfake_score"
    )

    story.append(
        Paragraph(
            f"Status: {deepfake_status}",
            body_style
        )
    )

    if deepfake_score is not None:

        story.append(
            Paragraph(
                f"Score: {deepfake_score}",
                body_style
            )
        )

    # Transcript
    story.append(
        Paragraph(
            "Speech Transcript",
            heading_style
        )
    )

    transcription = analysis_data.get(
        "transcription",
        ""
    )

    story.append(
        Paragraph(
            transcription or "No transcript available.",
            body_style
        )
    )

    # OCR
    story.append(
        Paragraph(
            "OCR Text",
            heading_style
        )
    )

    ocr_text = analysis_data.get(
        "ocr_text",
        ""
    )

    story.append(
        Paragraph(
            ocr_text or "No OCR text detected.",
            body_style
        )
    )

    # Disclaimer
    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "<b>Disclaimer:</b> TruthLens AI provides "
            "AI-assisted risk analysis. The prediction "
            "and confidence score do not guarantee that "
            "a claim is true or false. Users should "
            "verify important claims using reliable sources.",
            body_style
        )
    )

    doc.build(story)

    return output_path