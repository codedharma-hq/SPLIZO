"use client";

import { ArrowRight } from "lucide-react";
import { LAUNCH } from "@/components/launch/launch-config";
import { APP_LOGIN_URL, APP_SIGNUP_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The launch page's call to action, now that the beta is open: sign up, or log
 * in if you already have a household. Replaces the waitlist form the page used
 * while Splizo was still unreleased.
 *
 * Both point at the beta subdomain, so these are plain anchors — there is no
 * client-side route to prefetch across origins.
 *
 * Sized to match the old form (h-11, rounded-xl) so the hero layout is unchanged.
 */
export function LaunchCta({
  align = "start",
  className,
}: {
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 sm:flex-row",
        align === "center" && "sm:justify-center",
        className,
      )}
    >
      <a
        href={APP_SIGNUP_URL}
        className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover active:translate-y-px"
      >
        {LAUNCH.ctaPrimary}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
      <a
        href={APP_LOGIN_URL}
        className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card/80 px-6 text-sm font-semibold backdrop-blur transition-colors hover:bg-muted active:translate-y-px"
      >
        {LAUNCH.ctaSecondary}
      </a>
    </div>
  );
}
