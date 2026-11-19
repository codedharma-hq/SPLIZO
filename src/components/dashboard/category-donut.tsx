"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { EmptyChart } from "./empty-chart";
import { CHART_COLORS, CHART_TOOLTIP_STYLE } from "./chart-colors";

// The ring itself keeps a stable plot area and scales with the card's width
// (percentage radii), while the legend lives in normal DOM flow below it so
// extra categories make the card taller instead of shrinking the ring.
const PLOT_HEIGHT = 240;

export function CategoryDonut({ data }: { data: { name: string; value: number }[] }) {
  if (data.length === 0) return <EmptyChart label="No expenses yet this month" />;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="w-full">
      <div className="w-full" style={{ height: PLOT_HEIGHT }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="80%"
              // Gaps eat the whole ring once slices get thin, so drop them
              // when there are a lot of categories.
              paddingAngle={data.length > 16 ? 0 : 2}
              minAngle={1}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
              {...CHART_TOOLTIP_STYLE}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Wraps across as many rows as it needs; scrolls only past ~4 rows so a
          household with dozens of categories can't push the card off-screen. */}
      <ul className="mt-3 flex max-h-28 flex-wrap gap-x-4 gap-y-1.5 overflow-y-auto">
        {data.map((d, i) => (
          <li
            key={d.name}
            className="flex min-w-0 max-w-full items-center gap-1.5 text-xs text-muted-foreground"
            title={`${d.name} — ₹${d.value.toLocaleString("en-IN")}`}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
            />
            <span className="truncate">{d.name}</span>
            {total > 0 && (
              <span className="shrink-0 tabular-nums opacity-70">
                {Math.round((d.value / total) * 100)}%
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
