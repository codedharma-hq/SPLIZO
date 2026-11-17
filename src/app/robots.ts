import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/comingsoon", "/signup", "/terms", "/privacy"],
        disallow: [
          "/login",
          "/dashboard",
          "/transactions",
          "/accounts",
          "/categories",
          "/homes",
          "/household",
          "/import",
          "/loans",
          "/people",
          "/vendors",
          "/invite",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
