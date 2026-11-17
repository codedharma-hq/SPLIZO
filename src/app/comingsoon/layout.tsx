import type { Metadata } from "next";

const PAGE_TITLE = "Household Finance, Actually Tracked";
const SOCIAL_TITLE = "Splizo · Household Finance, Actually Tracked";
const DESCRIPTION =
  "Splizo is in open beta — a household finance tracker for Indian families with bank & UPI statement import, shared account tracking, and a family lending ledger. Create your household free.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: DESCRIPTION,
  // Deployed at the domain root, not at /comingsoon — splizo.codedharma.com
  // serves this route as "/" and 404s /comingsoon. Pointing either of these at
  // the route's own path tells Google and link previews that the canonical URL
  // is a dead page, so both stay "/".
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Splizo",
    locale: "en_IN",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Splizo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
