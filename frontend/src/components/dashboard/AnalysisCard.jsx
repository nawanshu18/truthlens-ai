import {
  ShieldCheck,
  ShieldAlert,
  Brain,
  Tags,
  FileText,
  ScanText,
  Download,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

function AnalysisCard({ result }) {
  if (!result) {
    return (
      <Card className="bg-slate-900 border-slate-800 h-full shadow-xl">
        <CardContent className="flex h-full min-h-[500px] flex-col items-center justify-center p-10 text-center">
          <Brain className="h-14 w-14 text-slate-500 mb-4" />

          <h2 className="text-2xl font-bold text-white">
            AI Analysis Overview
          </h2>

          <p className="mt-2 max-w-sm text-slate-400">
            Upload a video to generate an AI-powered analysis report.
          </p>
        </CardContent>
      </Card>
    );
  }

  const analysis = result.analysis || {};

  const isSafe = analysis.prediction === "Safe";

  const trustScore = Number(analysis.trust_score) || 0;

  const confidenceValue =
    Number(
      analysis.confidence ??
      analysis.confidence_score
    ) || 0;

  const confidence =
    confidenceValue <= 1
      ? confidenceValue * 100
      : confidenceValue;

  const deepfake =
    analysis.deepfake_analysis || {};

  const keywords = Array.isArray(
    analysis.suspicious_keywords
  )
    ? analysis.suspicious_keywords
    : [];

  const riskReasons = Array.isArray(
    analysis.risk_reasons
  )
    ? analysis.risk_reasons
    : [];


  // =====================================================
  // DOWNLOAD PDF REPORT
  // =====================================================

  const handleDownloadReport = async () => {

    if (!result.video_id) {
      alert("Report ID is not available.");
      return;
    }

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/generate-report/${result.video_id}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to generate report."
        );
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        `truthlens_report_${result.video_id}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        "Report download error:",
        error
      );

      alert(
        "Unable to download the report."
      );
    }
  };


  return (
    <Card className="bg-slate-900 border-slate-800 shadow-xl h-full">

      <CardContent className="p-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm uppercase tracking-wider text-blue-400 font-semibold">
              AI Report
            </p>

            <h2 className="text-2xl font-bold text-white mt-1">
              Analysis Overview
            </h2>

          </div>

          <Badge
            className={`w-fit px-4 py-2 text-sm ${
              isSafe
                ? "bg-emerald-600 hover:bg-emerald-600"
                : "bg-red-600 hover:bg-red-600"
            }`}
          >

            {isSafe ? (
              <ShieldCheck className="mr-2 h-4 w-4" />
            ) : (
              <ShieldAlert className="mr-2 h-4 w-4" />
            )}

            {analysis.prediction || "Unknown"}

          </Badge>

        </div>


        {/* Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

          {/* Trust */}
          <div className="rounded-2xl bg-slate-800 p-5">

            <div className="flex justify-between items-center mb-3">

              <span className="text-slate-400 text-sm">
                Trust Score
              </span>

              <span className="text-white font-bold">
                {trustScore}%
              </span>

            </div>

            <Progress value={trustScore} />

          </div>


          {/* Confidence */}
          <div className="rounded-2xl bg-slate-800 p-5">

            <div className="flex justify-between items-center mb-3">

              <span className="text-slate-400 text-sm">
                Confidence
              </span>

              <span className="text-white font-bold">
                {confidence.toFixed(1)}%
              </span>

            </div>

            <Progress value={confidence} />

          </div>

        </div>


        {/* Category + Deepfake */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

          {/* Category */}
          <div className="rounded-2xl bg-slate-800 p-5">

            <p className="text-slate-400 text-sm">
              Content Category
            </p>

            <p className="text-white font-semibold text-lg mt-2">
              {analysis.category || "Unknown"}
            </p>

          </div>


          {/* Deepfake */}
          <div className="rounded-2xl bg-slate-800 p-5">

            <p className="text-slate-400 text-sm">
              Deepfake Analysis
            </p>

            <p className="text-white font-semibold mt-2">
              {deepfake.deepfake_status ||
                "Not available"}
            </p>

            {deepfake.deepfake_score !==
              undefined &&
              deepfake.deepfake_score !==
                null && (
                <p className="text-slate-400 text-sm mt-1">
                  Score:{" "}
                  {deepfake.deepfake_score}
                </p>
              )}

          </div>

        </div>


        {/* Risk Explanation */}
        {riskReasons.length > 0 && (

          <div className="mt-6 rounded-2xl bg-red-500/5 border border-red-500/20 p-5">

            <div className="flex items-center gap-2 mb-4">

              <AlertTriangle className="h-5 w-5 text-red-400" />

              <h3 className="font-semibold text-white">
                Risk Explanation
              </h3>

            </div>

            <ul className="space-y-2">

              {riskReasons.map(
                (reason, index) => (

                  <li
                    key={index}
                    className="text-sm text-slate-300 flex gap-2"
                  >

                    <span className="text-red-400">
                      •
                    </span>

                    <span>
                      {reason}
                    </span>

                  </li>

                )
              )}

            </ul>

          </div>

        )}


        {/* Suspicious Keywords */}
        <div className="mt-6">

          <div className="flex items-center gap-2 mb-3">

            <Tags className="h-5 w-5 text-blue-400" />

            <h3 className="text-white font-semibold">
              Suspicious Keywords
            </h3>

          </div>

          <div className="flex flex-wrap gap-2">

            {keywords.length > 0 ? (

              keywords.map(
                (word, index) => (

                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    {word}
                  </Badge>

                )
              )

            ) : (

              <span className="text-sm text-slate-500">
                No suspicious keywords detected.
              </span>

            )}

          </div>

        </div>


        {/* Transcript */}
        <div className="mt-6 rounded-2xl bg-slate-800 p-5">

          <div className="flex items-center gap-2 mb-3">

            <FileText className="h-5 w-5 text-blue-400" />

            <h3 className="text-white font-semibold">
              Speech Transcript
            </h3>

          </div>

          <div className="max-h-40 overflow-y-auto pr-2">

            <p className="text-sm leading-6 text-slate-300 whitespace-pre-wrap">

              {analysis.transcription ||
                "No transcript available."}

            </p>

          </div>

        </div>


        {/* OCR */}
        <div className="mt-4 rounded-2xl bg-slate-800 p-5">

          <div className="flex items-center gap-2 mb-3">

            <ScanText className="h-5 w-5 text-blue-400" />

            <h3 className="text-white font-semibold">
              OCR Text
            </h3>

          </div>

          <div className="max-h-40 overflow-y-auto pr-2">

            <p className="text-sm leading-6 text-slate-300 whitespace-pre-wrap">

              {analysis.ocr_text ||
                "No text detected."}

            </p>

          </div>

        </div>


        {/* Download Report */}
        <div className="mt-6 flex justify-end">

          <Button
            variant="outline"
            onClick={
              handleDownloadReport
            }
            className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
          >

            <Download className="mr-2 h-4 w-4" />

            Download Report

          </Button>

        </div>

      </CardContent>

    </Card>
  );
}

export default AnalysisCard;
