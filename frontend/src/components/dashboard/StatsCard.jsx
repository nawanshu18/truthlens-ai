import { Card, CardContent } from "@/components/ui/card";

function StatsCard({
  title,
  value,
  subtitle = "Updated just now",
  icon,
  iconBg = "bg-blue-500/20",
  iconColor = "text-blue-400",
}) {
  return (
    <Card
      className="
        bg-slate-900
        border
        border-slate-800
        hover:border-blue-500/50
        hover:shadow-lg
        transition-all
        duration-300
      "
    >
      <CardContent className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400 font-medium">
              {title}
            </p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              {value}
            </h2>

            <p className="mt-3 text-sm text-emerald-400">
              {subtitle}
            </p>

          </div>

          <div
            className={`
              h-16
              w-16
              rounded-2xl
              flex
              items-center
              justify-center
              ${iconBg}
            `}
          >
            <div className={iconColor}>
              {icon}
            </div>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}

export default StatsCard;