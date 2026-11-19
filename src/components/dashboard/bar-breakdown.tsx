"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { EmptyChart } from "./empty-chart";
import { CHART_COLORS, CHART_TOOLTIP_STYLE, CHART_CURSOR_FILL } from "./chart-colors";

// One row per bar, so the chart grows with the data instead of packing more
// bars into a fixed box (which collapsed the labels into each other).
const ROW_HEIGHT = 32;
const MIN_HEIGHT = 160;
// Past this the plot scrolls rather than stretching the card forever.
const MAX_HEIGHT = 420;

const TICK_FONT_SIZE = 12;
// Space between the end of a label and its bar, plus a little slack.
const TICK_GUTTER = 14;
const APPROX_CHAR_WIDTH = 7.2; // ~0.6em at 12px; deliberately generous so
// truncated labels never spill out past the axis gutter

function CategoryTick({
  x,
  y,
  payload,
  maxChars,
}: {
  x?: number;
  y?: number;
  payload?: { value: string | number };
  maxChars?: number;
}) {
  const label = String(payload?.value ?? "");
  const limit = maxChars ?? label.length;
  const shown = label.length > limit ? `${label.slice(0, Math.max(1, limit - 1))}…` : label;

  return (
    <text
      x={x}
      y={y}
      dx={-4}
      dy={4}
      textAnchor="end"
      fontSize={TICK_FONT_SIZE}
      fill="var(--muted-foreground)"
    >
      <title>{label}</title>
      {shown}
    </text>
  );
}

export function BarBreakdown({ data }: { data: { name: string; value: number }[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapWidth, setWrapWidth] = useState(0);

  // The label gutter is a share of the card's real width, so the bars stay
  // readable on a phone and long account names get room on a wide screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    setWrapWidth(el.clientWidth);
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setWrapWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (data.length === 0) return <EmptyChart label="No data yet this month" />;

  const chartHeight = Math.max(MIN_HEIGHT, data.length * ROW_HEIGHT + 24);
  const scrolls = chartHeight > MAX_HEIGHT;

  const longestLabel = data.reduce((max, d) => Math.max(max, d.name.length), 0);
  const idealAxisWidth = longestLabel * APPROX_CHAR_WIDTH + TICK_GUTTER;
  const axisCap = wrapWidth > 0 ? Math.max(72, wrapWidth * 0.42) : 110;
  const yAxisWidth = Math.round(Math.max(64, Math.min(idealAxisWidth, axisCap, 200)));
  const maxChars = Math.max(6, Math.floor((yAxisWidth - TICK_GUTTER) / APPROX_CHAR_WIDTH));

  return (
    <div
      ref={wrapRef}
      className={scrolls ? "w-full overflow-y-auto" : "w-full"}
      style={scrolls ? { maxHeight: MAX_HEIGHT } : undefined}
    >
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={yAxisWidth}
            interval={0}
            tickLine={false}
            axisLine={false}
            tick={<CategoryTick maxChars={maxChars} />}
          />
          <Tooltip
            cursor={CHART_CURSOR_FILL}
            formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
            {...CHART_TOOLTIP_STYLE}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
