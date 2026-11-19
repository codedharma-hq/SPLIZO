"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { EmptyChart } from "./empty-chart";
import { SingleMonthSummary } from "./single-month-summary";
import { CHART_TOOLTIP_STYLE, compactINR } from "./chart-colors";

export function CompareLine({ data }: { data: { name: string; income: number; expense: number }[] }) {
  if (data.length === 0) return <EmptyChart label="No data for this range" />;

  if (data.length === 1) {
    return (
      <SingleMonthSummary
        period={data[0].name}
        stats={[
          { label: "Income", value: data[0].income, color: "var(--income)" },
          { label: "Expense", value: data[0].expense, color: "var(--expense)" },
        ]}
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
        <Legend
          iconType="circle"
          formatter={(value) => <span style={{ color: "var(--muted-foreground)" }}>{value}</span>}
        />
        <Line type="monotone" dataKey="income" name="Income" stroke="var(--income)" strokeWidth={2} />
        <Line type="monotone" dataKey="expense" name="Expense" stroke="var(--expense)" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
