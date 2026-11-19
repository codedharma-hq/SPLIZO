"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { EmptyChart } from "./empty-chart";
import { SingleMonthSummary } from "./single-month-summary";
import { CHART_COLORS, CHART_TOOLTIP_STYLE, compactINR } from "./chart-colors";

export function SingleSeriesLine({
  data,
  label = "Total",
}: {
  data: { name: string; value: number }[];
  label?: string;
}) {
  if (data.length === 0) return <EmptyChart label="No data for this range" />;

  if (data.length === 1) {
    return (
      <SingleMonthSummary
        period={data[0].name}
        stats={[{ label, value: data[0].value, color: "var(--foreground)" }]}
      />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          // Thin the labels out instead of letting them overlap once the
          // range covers many points.
          minTickGap={24}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
          width={64}
          tickFormatter={(v) => compactINR(Number(v))}
        />
        <Tooltip formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`} {...CHART_TOOLTIP_STYLE} />
        <Line type="monotone" dataKey="value" stroke={CHART_COLORS[0]} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
