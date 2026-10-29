import { downloadReport } from "../services/api";
import { useState } from "react";
import {
  Search,
  Video,
  Eye,
  Download,
  X,
  ShieldCheck,
  ShieldAlert,
  Activity,
  FileText,
} from "lucide-react";

function History({ history = [] }) {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const filteredHistory = history.filter((item) =>
    item.video_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDownloadReport = async (videoId) => {
  if (!videoId) {
    alert("Report ID is not available.");
    return;
  }

  try {
    setDownloading(true);

    const blob = await downloadReport(videoId);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `truthlens_report_${videoId}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Report download error:", error);
    alert("Unable to download the report.");
  } finally {
    setDownloading(false);
  }
};

  return (
    <main className="bg-slate-950 min-h-screen text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <span className="text-blue-400 font-semibold uppercase tracking-wider">
            History
          </span>

          <h1 className="text-4xl font-bold mt-3">
            Analysis History
          </h1>

          <p className="text-gray-400 mt-3">
            View and manage your previously analyzed videos.
          </p>

        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">

          <Search
            size={20}
            className="absolute left-3 top-3 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800
              rounded-xl py-3 pl-10 pr-4 text-white
              placeholder:text-gray-600 focus:outline-none
              focus:border-blue-500"
          />

        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800
          rounded-2xl overflow-hidden">

          {filteredHistory.length === 0 ? (

            <div className="p-12 text-center">

              <Video
                size={40}
                className="mx-auto text-gray-600 mb-4"
              />

              <p className="text-gray-400">
                No analysis history found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-800/60">

                  <tr>

                    <th className="text-left p-4">
                      Video
                    </th>

                    <th className="text-left p-4">
                      Prediction
                    </th>

                    <th className="text-left p-4">
                      Confidence
                    </th>

                    <th className="text-left p-4">
                      Trust
                    </th>

                    <th className="text-left p-4">
                      Category
                    </th>

                    <th className="text-right p-4">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredHistory.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-slate-800
                        hover:bg-slate-800/40"
                    >

                      {/* Video */}
                      <td className="p-4 max-w-xs">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-lg
                            bg-blue-500/10 flex items-center
                            justify-center">

                            <Video
                              size={20}
                              className="text-blue-400"
                            />

                          </div>

                          <span className="truncate">
                            {item.video_name}
                          </span>

                        </div>

                      </td>

                      {/* Prediction */}
                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full
                            text-xs font-semibold ${
                              item.prediction === "Safe"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : item.prediction === "Risky"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                        >
                          {item.prediction}
                        </span>

                      </td>

                      {/* Confidence */}
                      <td className="p-4 text-gray-300">
                        {(Number(item.confidence) * 100).toFixed(1)}%
                      </td>

                      {/* Trust */}
                      <td className="p-4 text-gray-300">
                        {Number(item.trust_score || 0).toFixed(1)}%
                      </td>

                      {/* Category */}
                      <td className="p-4 text-gray-400">
                        {item.category || "General"}
                      </td>

                      {/* Actions */}
                      <td className="p-4">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              setSelectedItem(item)
                            }
                            className="p-2 rounded-lg
                              bg-blue-500/10 text-blue-400
                              hover:bg-blue-500/20 transition"
                            title="View Analysis"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleDownloadReport(item.id)
                            }
                            disabled={downloading}
                            className="p-2 rounded-lg
                              bg-emerald-500/10 text-emerald-400
                              hover:bg-emerald-500/20
                              disabled:opacity-50 transition"
                            title="Download Report"
                          >
                            <Download size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* Analysis Modal */}
      {selectedItem && (

        <div
          className="fixed inset-0 z-50 bg-black/70
            backdrop-blur-sm flex items-center
            justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >

          <div
            className="bg-slate-900 border border-slate-800
              rounded-2xl w-full max-w-3xl max-h-[90vh]
              overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between
              p-6 border-b border-slate-800">

              <div>

                <p className="text-sm text-blue-400">
                  Analysis #{selectedItem.id}
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {selectedItem.video_name}
                </h2>

              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-lg
                  hover:bg-slate-800 transition"
              >
                <X size={22} />
              </button>

            </div>

            <div className="p-6">

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <AnalysisStat
                  icon={<ShieldAlert />}
                  title="Prediction"
                  value={selectedItem.prediction}
                />

                <AnalysisStat
                  icon={<Activity />}
                  title="Confidence"
                  value={`${(
                    Number(selectedItem.confidence) * 100
                  ).toFixed(1)}%`}
                />

                <AnalysisStat
                  icon={<ShieldCheck />}
                  title="Trust Score"
                  value={`${Number(
                    selectedItem.trust_score || 0
                  ).toFixed(1)}%`}
                />

              </div>

              {/* Category */}
              <div className="mt-6">

                <h3 className="text-sm font-semibold
                  text-gray-400 uppercase tracking-wider">
                  Category
                </h3>

                <p className="mt-2 text-gray-200">
                  {selectedItem.category || "General"}
                </p>

              </div>

              {/* Risk Reasons */}
              <div className="mt-6">

                <h3 className="text-sm font-semibold
                  text-gray-400 uppercase tracking-wider">
                  Risk Explanation
                </h3>

                <div className="mt-2 bg-slate-800/60
                  rounded-xl p-4">

                  {selectedItem.risk_reasons ? (
                    selectedItem.risk_reasons
                      .split("|")
                      .map((reason, index) => (
                        <p
                          key={index}
                          className="text-gray-300 mb-2"
                        >
                          • {reason}
                        </p>
                      ))
                  ) : (
                    <p className="text-gray-500">
                      No specific risk reasons available.
                    </p>
                  )}

                </div>

              </div>

              {/* Keywords */}
              <div className="mt-6">

                <h3 className="text-sm font-semibold
                  text-gray-400 uppercase tracking-wider">
                  Suspicious Keywords
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {selectedItem.suspicious_keywords ? (
                    selectedItem.suspicious_keywords
                      .split("|")
                      .map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full
                            bg-red-500/10 text-red-400
                            text-sm"
                        >
                          {keyword}
                        </span>
                      ))
                  ) : (
                    <span className="text-gray-500">
                      No suspicious keywords detected.
                    </span>
                  )}

                </div>

              </div>

              {/* Transcript */}
              <div className="mt-6">

                <h3 className="text-sm font-semibold
                  text-gray-400 uppercase tracking-wider">
                  Speech Transcript
                </h3>

                <div className="mt-2 bg-slate-800/60
                  rounded-xl p-4">

                  <p className="text-gray-300 leading-6">
                    {selectedItem.transcription ||
                      "No transcript available."}
                  </p>

                </div>

              </div>

              {/* Download */}
              <button
                onClick={() =>
                  handleDownloadReport(selectedItem.id)
                }
                disabled={downloading}
                className="mt-6 w-full flex items-center
                  justify-center gap-2 px-5 py-3
                  rounded-xl bg-blue-600
                  hover:bg-blue-500
                  disabled:opacity-50
                  transition font-semibold"
              >

                <FileText size={18} />

                {downloading
                  ? "Generating Report..."
                  : "Download PDF Report"}

              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

function AnalysisStat({
  icon,
  title,
  value,
}) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-4">

      <div className="flex items-center gap-2
        text-blue-400">

        {icon}

        <span className="text-sm text-gray-400">
          {title}
        </span>

      </div>

      <p className="text-2xl font-bold mt-3">
        {value}
      </p>

    </div>
  );
}

export default History;