import {
  Video,
  ShieldCheck,
  ShieldAlert,
  Activity,
  BarChart3,
  Clock,
} from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";
import UploadCard from "../components/dashboard/UploadCard";
import AnalysisCard from "../components/dashboard/AnalysisCard";
import HistoryTable from "../components/dashboard/HistoryTable";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";

function Dashboard({
  file,
  setFile,
  handleUpload,
  loading,
  result,
  history = [],
}) {
  // -----------------------------
  // Dashboard Statistics
  // -----------------------------

  const totalVideos = history.length;

  const safeVideos = history.filter(
    (item) => item.prediction === "Safe"
  ).length;

  const riskyVideos = history.filter(
    (item) => item.prediction === "Risky"
  ).length;

  const uncertainVideos = history.filter(
    (item) => item.prediction === "Uncertain"
  ).length;

  const averageTrust =
    totalVideos > 0
      ? history.reduce(
          (sum, item) =>
            sum + (Number(item.trust_score) || 0),
          0
        ) / totalVideos
      : 0;

  const averageConfidence =
    totalVideos > 0
      ? history.reduce(
          (sum, item) =>
            sum + (Number(item.confidence) || 0),
          0
        ) /
        totalVideos *
        100
      : 0;

  return (
    <main className="bg-slate-950 min-h-screen text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* -------------------------------- */}
        {/* Hero Section */}
        {/* -------------------------------- */}

        <div className="mb-10">

          <span className="text-blue-400 font-semibold
            tracking-wider uppercase text-sm">
            AI Security Platform
          </span>

          <h1 className="text-5xl font-bold mt-3">
            TruthLens AI
          </h1>

          <p className="text-gray-400 text-lg mt-4
            max-w-3xl leading-8">
            Analyze videos for potential misinformation
            signals using speech transcription, OCR,
            machine learning classification, and
            risk analysis.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">

            <Badge
              icon={<Video size={15} />}
              text={`${totalVideos} Videos Analyzed`}
            />

            <Badge
              icon={<Activity size={15} />}
              text={`${averageConfidence.toFixed(1)}% Avg Confidence`}
            />

            <Badge
              icon={<BarChart3 size={15} />}
              text={`${averageTrust.toFixed(1)}% Avg Trust`}
            />

          </div>

        </div>

        {/* -------------------------------- */}
        {/* Statistics */}
        {/* -------------------------------- */}

        <div className="grid gap-6 md:grid-cols-2
          xl:grid-cols-4 mb-10">

          <StatsCard
            title="Videos"
            value={totalVideos}
            subtitle="Videos analyzed"
            icon={<Video size={32} />}
            iconBg="bg-violet-500/20"
            iconColor="text-violet-400"
          />

          <StatsCard
            title="Safe"
            value={safeVideos}
            subtitle="AI classified as safe"
            icon={<ShieldCheck size={32} />}
            iconBg="bg-emerald-500/20"
            iconColor="text-emerald-400"
          />

          <StatsCard
            title="Risky"
            value={riskyVideos}
            subtitle="Requires further review"
            icon={<ShieldAlert size={32} />}
            iconBg="bg-red-500/20"
            iconColor="text-red-400"
          />

          <StatsCard
            title="Avg Trust"
            value={
              totalVideos > 0
                ? `${averageTrust.toFixed(1)}%`
                : "--"
            }
            subtitle="Across analyzed videos"
            icon={<Activity size={32} />}
            iconBg="bg-blue-500/20"
            iconColor="text-blue-400"
          />

        </div>

        {/* -------------------------------- */}
        {/* Uncertain Notice */}
        {/* -------------------------------- */}

        {uncertainVideos > 0 && (

          <div className="mb-8 bg-yellow-500/10
            border border-yellow-500/20 rounded-2xl
            px-5 py-4 flex items-center gap-3">

            <Clock
              size={22}
              className="text-yellow-400 shrink-0"
            />

            <p className="text-sm text-yellow-200">
              <span className="font-semibold">
                {uncertainVideos} analysis
                {uncertainVideos > 1 ? "es" : ""}
              </span>{" "}
              returned an uncertain classification
              and may require additional review.
            </p>

          </div>

        )}

        {/* -------------------------------- */}
        {/* Upload + Analysis */}
        {/* -------------------------------- */}

        <div className="grid grid-cols-1 xl:grid-cols-2
          gap-8 items-stretch">

          <UploadCard
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
            loading={loading}
          />

          <AnalysisCard
            result={result}
          />

        </div>

        {/* -------------------------------- */}
        {/* History + Analytics */}
        {/* -------------------------------- */}

        <div className="grid grid-cols-1 xl:grid-cols-2
          gap-8 mt-8">

          <HistoryTable
            history={history}
          />

          <AnalyticsChart
            history={history}
          />

        </div>

        {/* -------------------------------- */}
        {/* Dashboard Footer */}
        {/* -------------------------------- */}

        <div className="mt-10 pt-6 border-t
          border-slate-800">

          <div className="flex flex-col md:flex-row
            items-start md:items-center
            justify-between gap-4">

            <div>

              <p className="text-sm font-medium
                text-gray-300">
                TruthLens AI
              </p>

              <p className="text-xs text-gray-600 mt-1">
                AI-assisted video misinformation analysis
              </p>

            </div>

            <p className="text-xs text-gray-600">
              AI predictions should be verified with
              reliable sources.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

/* -------------------------------- */
/* Small Dashboard Badge */
/* -------------------------------- */

function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2
      px-3 py-2 rounded-lg
      bg-slate-900 border border-slate-800
      text-sm text-gray-400">

      <span className="text-blue-400">
        {icon}
      </span>

      {text}

    </div>
  );
}

export default Dashboard;