// Line charts always group by month, so the "This month" and "Last month"
// ranges give a single data point — and recharts draws a lone dot with no
// line, which reads as a broken chart. Show the figure plainly instead, and
// say why there's no trend.
export function SingleMonthSummary({
  period,
  stats,
}: {
  period: string;
  stats: { label: string; value: number; color: string }[];
}) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 px-2 py-6 text-center">
      {/* The period sits on its own line: month labels are formatted "Nov 26"
          for axis ticks, which reads as a date inside a sentence. */}
      <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {period}
      </div>
      <div className="flex flex-wrap items-end justify-center gap-x-10 gap-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-0">
            <div
              className="text-2xl font-extrabold tracking-tight tabular-nums"
              style={{ color: stat.color }}
            >
              ₹{stat.value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs font-medium text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        Only one month falls in this range — a trend needs at least two. Pick a longer range
        to see one.
      </p>
    </div>
  );
}
