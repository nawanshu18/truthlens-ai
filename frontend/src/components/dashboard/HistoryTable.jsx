import { Video, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HistoryTable({ history = [] }) {
  const navigate = useNavigate();

  // Only show the latest 6 items on Dashboard
  const recentHistory = history.slice(0, 6);

  return (
    <div className="bg-slate-900 border border-slate-800
      rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between
        px-6 py-5 border-b border-slate-800">

        <div>
          <h2 className="text-2xl font-bold">
            Recent Analysis
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Previously analyzed videos
          </p>
        </div>

        <span className="px-3 py-1 rounded-full
          bg-blue-500/10 text-blue-400
          text-sm font-semibold">
          {history.length} Videos
        </span>

      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_100px_100px]
        gap-4 px-6 py-4
        text-sm font-semibold text-gray-500
        border-b border-slate-800">

        <span>Video</span>

        <span>Prediction</span>

        <span>Confidence</span>

      </div>

      {/* Scrollable Recent List */}
      <div className="max-h-[430px] overflow-y-auto">

        {recentHistory.length === 0 ? (

          <div className="py-16 text-center">

            <Video
              size={40}
              className="mx-auto text-gray-600 mb-4"
            />

            <p className="text-gray-500">
              No videos analyzed yet.
            </p>

          </div>

        ) : (

          recentHistory.map((item) => (

            <div
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_100px_100px]
                gap-4 items-center
                px-6 py-4
                border-b border-slate-800
                last:border-b-0
                hover:bg-slate-800/40
                transition"
            >

              {/* Video */}
              <div className="flex items-center gap-3
                min-w-0">

                <div className="w-9 h-9 rounded-lg
                  bg-blue-500/10
                  flex items-center justify-center
                  shrink-0">

                  <Video
                    size={18}
                    className="text-blue-400"
                  />

                </div>

                <span
                  className="text-sm text-gray-200
                    truncate"
                  title={item.video_name}
                >
                  {item.video_name}
                </span>

              </div>

              {/* Prediction */}
              <div>

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

              </div>

              {/* Confidence */}
              <span className="text-sm text-gray-300">
                {(Number(item.confidence) * 100).toFixed(0)}%
              </span>

            </div>

          ))

        )}

      </div>

      {/* Footer */}
      {history.length > 0 && (

        <div className="px-6 py-4 border-t
          border-slate-800">

          <button
            onClick={() => navigate("/history")}
            className="w-full flex items-center
              justify-center gap-2
              py-2.5 rounded-lg
              bg-slate-800
              hover:bg-slate-700
              text-gray-300
              hover:text-white
              transition
              text-sm font-medium"
          >

            View All History

            <ArrowRight size={16} />

          </button>

        </div>

      )}

    </div>
  );
}

export default HistoryTable;