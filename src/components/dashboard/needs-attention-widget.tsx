import Link from "next/link";
import { ClipboardCheck, CheckCircle2, ArrowUpRight } from "lucide-react";
import { applyRangeParams } from "@/lib/date-range";

function buildHref(status: string, range: string, from?: string, to?: string) {
  const params = new URLSearchParams({ status });
  applyRangeParams(params, range, from, to);
  return `/transactions?${params.toString()}`;
}

export function NeedsAttentionWidget({
  needsReview,
  unmapped,
  range,
  from,
  to,
}: {
  needsReview: number;
  unmapped: number;
  range: string;
  from?: string;
  to?: string;
}) {
  if (needsReview === 0 && unmapped === 0) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-income" />
        All caught up — nothing needs review.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">
          <ClipboardCheck className="h-4 w-4" />
        </span>
        <h2 className="text-base font-bold text-foreground">Review</h2>
      </div>
      {/* Stacked rows: "Needs review" and "Unmapped" side by side wrapped onto
          two lines of different heights once the card got narrow. */}
      <div className="flex flex-col gap-1.5">
        <Link
          href={buildHref("needs_review", range, from, to)}
          className="group flex items-baseline justify-between gap-2"
        >
          <span className="truncate text-xs text-muted-foreground">Needs review</span>
          <span className="flex shrink-0 items-center gap-1 text-base font-extrabold text-warning tabular-nums group-hover:underline">
            {needsReview}
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </span>
        </Link>
        <Link
          href={buildHref("unmapped", range, from, to)}
          className="group flex items-baseline justify-between gap-2"
        >
          <span className="truncate text-xs text-muted-foreground">Unmapped</span>
          <span className="flex shrink-0 items-center gap-1 text-base font-extrabold text-highlight tabular-nums group-hover:underline">
            {unmapped}
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </span>
        </Link>
      </div>
    </div>
  );
}
