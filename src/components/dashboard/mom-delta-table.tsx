import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Row = { name: string; current: number; previous: number; delta: number };

// Two amounts plus a category name per row leaves no room for paise.
const inr = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export function MomDeltaTable({ data }: { data: Row[] }) {
  const rows = data.filter((d) => d.current !== 0 || d.previous !== 0).slice(0, 8);

  if (rows.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Not enough history yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {rows.map((d) => (
        <div key={d.name} className="flex items-center justify-between gap-3 px-1 py-2 text-sm">
          {/* Category names run long ("Maintenance & Repairs"); truncate them
              rather than letting the row wrap under the amounts. */}
          <span className="min-w-0 flex-1 truncate" title={d.name}>
            {d.name}
          </span>
          <div className="flex shrink-0 items-center gap-1.5 tabular-nums">
            <span className="text-muted-foreground">₹{inr(d.current)}</span>
            {d.delta > 0 && (
              <span className="flex items-center gap-0.5 text-xs text-expense">
                <TrendingUp className="h-3 w-3 shrink-0" />+₹{inr(d.delta)}
              </span>
            )}
            {d.delta < 0 && (
              <span className="flex items-center gap-0.5 text-xs text-income">
                <TrendingDown className="h-3 w-3 shrink-0" />-₹{inr(Math.abs(d.delta))}
              </span>
            )}
            {d.delta === 0 && <Minus className="h-3 w-3 shrink-0 text-muted-foreground" />}
          </div>
        </div>
      ))}
    </div>
  );
}
