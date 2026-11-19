import type { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Sparkline } from "./sparkline";

export type DeltaInfo = { pct: number; direction: "up" | "down"; tone: "good" | "bad" } | null;

export type CardSpec = {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClass: string;
  spark?: number[];
  sparkColor?: string;
  delta?: DeltaInfo;
};

// Headline figures are rounded to whole rupees — paise add ~30px of width to
// a card that can be as narrow as a quarter of the row, and nobody reads a
// KPI to two decimals. The exact amount stays in the title tooltip.
function formatValue(value: number, exact = false) {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  return `${sign}₹${abs.toLocaleString("en-IN", exact ? undefined : { maximumFractionDigits: 0 })}`;
}

// Renders bare cards (no wrapping grid) so the page can place them in a
// shared grid row alongside other dashboard cards.
export function HeadlineCards({ cards }: { cards: CardSpec[] }) {
  return (
    <>
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${card.iconClass}`}>
              <card.icon className="h-4 w-4" />
            </span>
            {card.spark && card.spark.some((v) => v !== 0) && (
              <Sparkline data={card.spark} color={card.sparkColor ?? "var(--chart-1)"} />
            )}
          </div>
          {/* The delta sits under the amount rather than beside it: side by
              side, a lakh-sized figure and "11.8% from last month" can't both
              fit once the row is four cards wide. */}
          <div className="mt-3 min-w-0">
            <div
              className="truncate text-xl font-extrabold tracking-tight text-foreground xl:text-2xl"
              title={formatValue(card.value, true)}
            >
              {formatValue(card.value)}
            </div>
            <div className="truncate text-xs font-medium text-muted-foreground">{card.label}</div>
            {card.delta && (
              <div className="mt-2 flex min-w-0 items-center gap-1.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    card.delta.tone === "good" ? "bg-income/10 text-income" : "bg-expense/10 text-expense"
                  }`}
                >
                  {card.delta.direction === "up" ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                </span>
                <span
                  className={`truncate text-[11px] font-semibold ${
                    card.delta.tone === "good" ? "text-income" : "text-expense"
                  }`}
                >
                  {Math.abs(card.delta.pct).toFixed(1)}% from last month
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
