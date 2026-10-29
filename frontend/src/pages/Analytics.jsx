import {
  BarChart3,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Video,
  TrendingUp,
} from "lucide-react";

function Analytics({ history = [] }) {
  const total = history.length;

  const safe = history.filter(
    (item) => item.prediction === "Safe"
  ).length;

  const risky = history.filter(
    (item) => item.prediction === "Risky"
  ).length;

  const uncertain = history.filter(
    (item) => item.prediction === "Uncertain"
  ).length;

  const averageTrust =
    total > 0
      ? history.reduce(
          (sum, item) =>
            sum + (Number(item.trust_score) || 0),
          0
        ) / total
      : 0;

  const averageConfidence =
    total > 0
      ? history.reduce(
          (sum, item) =>
            sum + (Number(item.confidence) || 0),
          0
        ) /
        total *
        100
      : 0;

  // Category distribution
  const categoryCounts = {};

  history.forEach((item) => {
    const category = item.category || "General";

    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;
  });

  const categories = Object.entries(categoryCounts);

  return (
    <main className="bg-slate-950 min-h-screen text-white px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <span className="text-blue-400 font-semibold
            uppercase tracking-wider">
            Analytics
          </span>

          <h1 className="text-4xl font-bold mt-3">
            Analysis Analytics
          </h1>

          <p className="text-gray-400 mt-3">
            Monitor misinformation detection results
            across all analyzed videos.
          </p>

        </div>

        {/* Main Stats */}
        <div className="grid gap-6 md:grid-cols-2
          xl:grid-cols-4">

          <StatCard
            title="Total Videos"
            value={total}
            subtitle="Analyzed videos"
            icon={<Video size={28} />}
            iconClass="text-blue-400"
          />

          <StatCard
            title="Safe Content"
            value={safe}
            subtitle={
              total
                ? `${((safe / total) * 100).toFixed(1)}% of total`
                : "0% of total"
            }
            icon={<ShieldCheck size={28} />}
            iconClass="text-emerald-400"
          />

          <StatCard
            title="Risky Content"
            value={risky}
            subtitle={
              total
                ? `${((risky / total) * 100).toFixed(1)}% of total`
                : "0% of total"
            }
            icon={<ShieldAlert size={28} />}
            iconClass="text-red-400"
          />

          <StatCard
            title="Average Trust"
            value={`${averageTrust.toFixed(1)}%`}
            subtitle="Across all analyses"
            icon={<Activity size={28} />}
            iconClass="text-violet-400"
          />

        </div>

        {/* Second Stats */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">

          <StatCard
            title="Average Confidence"
            value={`${averageConfidence.toFixed(1)}%`}
            subtitle="Model confidence"
            icon={<TrendingUp size={28} />}
            iconClass="text-cyan-400"
          />

          <StatCard
            title="Uncertain Results"
            value={uncertain}
            subtitle="Require additional review"
            icon={<BarChart3 size={28} />}
            iconClass="text-yellow-400"
          />

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2
          gap-8 mt-8">

          {/* Prediction Distribution */}
          <div className="bg-slate-900 border border-slate-800
            rounded-2xl p-7">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-xl
                bg-blue-500/10 flex items-center
                justify-center">

                <BarChart3
                  size={22}
                  className="text-blue-400"
                />

              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Prediction Distribution
                </h2>

                <p className="text-sm text-gray-500">
                  Classification results
                </p>
              </div>

            </div>

            <PredictionBar
              label="Safe"
              value={safe}
              total={total}
              className="bg-emerald-500"
              textClass="text-emerald-400"
            />

            <PredictionBar
              label="Risky"
              value={risky}
              total={total}
              className="bg-red-500"
              textClass="text-red-400"
            />

            <PredictionBar
              label="Uncertain"
              value={uncertain}
              total={total}
              className="bg-yellow-500"
              textClass="text-yellow-400"
            />

          </div>

          {/* Category Distribution */}
          <div className="bg-slate-900 border border-slate-800
            rounded-2xl p-7">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-xl
                bg-violet-500/10 flex items-center
                justify-center">

                <Activity
                  size={22}
                  className="text-violet-400"
                />

              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Category Distribution
                </h2>

                <p className="text-sm text-gray-500">
                  Analyzed content categories
                </p>
              </div>

            </div>

            {categories.length === 0 ? (

              <p className="text-gray-500">
                No category data available.
              </p>

            ) : (

              <div className="space-y-5">

                {categories.map(
                  ([category, count]) => {

                    const percentage =
                      total > 0
                        ? (count / total) * 100
                        : 0;

                    return (
                      <div key={category}>

                        <div className="flex
                          justify-between mb-2">

                          <span className="text-gray-300">
                            {category}
                          </span>

                          <span className="text-gray-400">
                            {count}{" "}
                            ({percentage.toFixed(0)}%)
                          </span>

                        </div>

                        <div className="h-2 bg-slate-800
                          rounded-full overflow-hidden">

                          <div
                            className="h-full bg-violet-500
                              rounded-full transition-all"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 border border-slate-800
          rounded-2xl p-7 mt-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl
              bg-cyan-500/10 flex items-center
              justify-center">

              <Activity
                size={22}
                className="text-cyan-400"
              />

            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Recent Analysis Activity
              </h2>

              <p className="text-sm text-gray-500">
                Latest analyzed videos
              </p>
            </div>

          </div>

          {history.length === 0 ? (

            <div className="text-center py-10">

              <Video
                size={40}
                className="mx-auto text-gray-600 mb-4"
              />

              <p className="text-gray-500">
                No analysis data available yet.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {history.slice(0, 8).map((item) => (

                <div
                  key={item.id}
                  className="flex items-center
                    justify-between gap-4
                    bg-slate-800/50
                    border border-slate-800
                    rounded-xl p-4"
                >

                  <div className="flex items-center
                    gap-4 min-w-0">

                    <div className="w-10 h-10 rounded-lg
                      bg-slate-700 flex items-center
                      justify-center shrink-0">

                      <Video
                        size={19}
                        className="text-gray-400"
                      />

                    </div>

                    <div className="min-w-0">

                      <p className="font-medium truncate">
                        {item.video_name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.category || "General"}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center
                    gap-5 shrink-0">

                    <div className="hidden md:block
                      text-right">

                      <p className="text-xs text-gray-500">
                        Trust
                      </p>

                      <p className="text-sm font-medium">
                        {Number(
                          item.trust_score || 0
                        ).toFixed(1)}%
                      </p>

                    </div>

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

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}

/* -------------------------------- */
/* Stat Card */
/* -------------------------------- */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800
      rounded-2xl p-6">

      <div className="flex items-start
        justify-between">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <p className="text-3xl font-bold mt-2">
            {value}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {subtitle}
          </p>

        </div>

        <div className={iconClass}>
          {icon}
        </div>

      </div>

    </div>
  );
}

/* -------------------------------- */
/* Prediction Bar */
/* -------------------------------- */

function PredictionBar({
  label,
  value,
  total,
  className,
  textClass,
}) {
  const percentage =
    total > 0
      ? (value / total) * 100
      : 0;

  return (
    <div className="mb-7">

      <div className="flex justify-between
        items-center mb-2">

        <span className={`font-medium ${textClass}`}>
          {label}
        </span>

        <span className="text-sm text-gray-400">
          {value}{" "}
          <span className="text-gray-600">
            ({percentage.toFixed(1)}%)
          </span>
        </span>

      </div>

      <div className="h-3 bg-slate-800
        rounded-full overflow-hidden">

        <div
          className={`h-full rounded-full
            transition-all duration-500 ${className}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default Analytics;