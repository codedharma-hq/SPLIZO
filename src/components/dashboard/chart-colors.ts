// Alternates cool/warm hues so consecutive categories (which often land in
// adjacent slots since categories are sorted by value, not color) never pair
// two similar blues/teals or two similar warm tones next to each other.
export const CHART_COLORS = [
  "var(--chart-9)", // teal (cool)
  "var(--chart-7)", // coral (warm)
  "var(--chart-11)", // blue (cool)
  "var(--chart-10)", // amber (warm)
  "var(--chart-3)", // indigo (cool)
  "var(--chart-8)", // pink (warm)
  "var(--chart-6)", // olive
  "var(--chart-12)", // gray
];

// Shared recharts <Tooltip> styling so it follows the app theme (light/dark)
// instead of recharts' hardcoded white-box default, which looked wrong in
// both themes.
export const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    color: "var(--popover-foreground)",
    fontSize: "12px",
  },
  labelStyle: { color: "var(--popover-foreground)" },
  itemStyle: { color: "var(--popover-foreground)" },
} as const;

// The rectangle highlighted behind a bar on hover — recharts defaults to a
// flat gray that doesn't adapt to the theme either.
export const CHART_CURSOR_FILL = { fill: "var(--muted)" };

// Axis labels: ₹12,34,567 is far too wide for a y-axis gutter, so shorten to
// the Indian short scale (K / L / Cr) once the numbers get big.
export function compactINR(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(abs >= 10_00_00_000 ? 0 : 1)}Cr`;
  if (abs >= 1_00_000) return `₹${(value / 1_00_000).toFixed(abs >= 10_00_000 ? 0 : 1)}L`;
  if (abs >= 1_000) return `₹${(value / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}K`;
  return `₹${value}`;
}
