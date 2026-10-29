import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  BarChart3,
  ShieldCheck,
  ShieldAlert,
  CircleHelp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

function AnalyticsChart({ history = [] }) {
  const safe = history.filter(
    (item) => item.prediction === "Safe"
  ).length;

  const risky = history.filter(
    (item) => item.prediction === "Risky"
  ).length;

  const uncertain = history.filter(
    (item) => item.prediction === "Uncertain"
  ).length;

  const total = history.length;

  const data = [
    {
      name: "Safe",
      value: safe,
      fill: "#10b981",
    },
    {
      name: "Risky",
      value: risky,
      fill: "#ef4444",
    },
    {
      name: "Uncertain",
      value: uncertain,
      fill: "#eab308",
    },
  ];

  const safePercentage =
    total > 0 ? (safe / total) * 100 : 0;

  const riskyPercentage =
    total > 0 ? (risky / total) * 100 : 0;

  const uncertainPercentage =
    total > 0 ? (uncertain / total) * 100 : 0;

  return (
    <Card className="bg-slate-900 border-slate-800 h-full">

      <CardContent className="p-6 md:p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl
                bg-blue-500/10 flex items-center
                justify-center">

                <BarChart3
                  size={21}
                  className="text-blue-400"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Analytics Summary
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  AI classification distribution
                </p>

              </div>

            </div>

          </div>

          <span className="px-3 py-1 rounded-full
            bg-blue-500/10 text-blue-400
            text-sm font-semibold">

            {total} Total

          </span>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-7">

          {/* Safe */}
          <div className="bg-slate-800/60
            border border-slate-800
            rounded-xl p-3">

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={17}
                className="text-emerald-400"
              />

              <span className="text-xs text-gray-400">
                Safe
              </span>

            </div>

            <p className="text-xl font-bold
              text-white mt-2">
              {safe}
            </p>

            <p className="text-xs
              text-emerald-400 mt-1">
              {safePercentage.toFixed(1)}%
            </p>

          </div>

          {/* Risky */}
          <div className="bg-slate-800/60
            border border-slate-800
            rounded-xl p-3">

            <div className="flex items-center gap-2">

              <ShieldAlert
                size={17}
                className="text-red-400"
              />

              <span className="text-xs text-gray-400">
                Risky
              </span>

            </div>

            <p className="text-xl font-bold
              text-white mt-2">
              {risky}
            </p>

            <p className="text-xs
              text-red-400 mt-1">
              {riskyPercentage.toFixed(1)}%
            </p>

          </div>

          {/* Uncertain */}
          <div className="bg-slate-800/60
            border border-slate-800
            rounded-xl p-3">

            <div className="flex items-center gap-2">

              <CircleHelp
                size={17}
                className="text-yellow-400"
              />

              <span className="text-xs text-gray-400">
                Uncertain
              </span>

            </div>

            <p className="text-xl font-bold
              text-white mt-2">
              {uncertain}
            </p>

            <p className="text-xs
              text-yellow-400 mt-1">
              {uncertainPercentage.toFixed(1)}%
            </p>

          </div>

        </div>

        {/* Chart */}
        {total === 0 ? (

          <div className="h-[250px]
            flex items-center justify-center">

            <div className="text-center">

              <BarChart3
                size={40}
                className="mx-auto text-slate-600 mb-3"
              />

              <p className="text-slate-500">
                No analysis data available.
              </p>

            </div>

          </div>

        ) : (

          <div className="h-[250px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >

                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(51, 65, 85, 0.25)",
                  }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    color: "#ffffff",
                  }}
                  formatter={(value) => [
                    `${value} videos`,
                    "Count",
                  ]}
                />

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={70}
                >

                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.fill}
                    />
                  ))}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        )}

      </CardContent>

    </Card>
  );
}

export default AnalyticsChart;