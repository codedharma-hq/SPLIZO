/**
 * Public URLs for the marketing site and the app, in one place.
 *
 * Two hosts while the beta runs on its own subdomain: SITE_URL is this
 * marketing/SEO site, APP_URL is where people actually sign in. When the beta
 * graduates to the main domain, only APP_URL changes.
 *
 * These are `NEXT_PUBLIC_` because the launch page's CTAs are client
 * components. Next inlines those at **build** time, so changing one needs a
 * rebuild and redeploy, not just a restart — set them in the build environment,
 * not only at runtime.
 *
 * The reads below are deliberately written as literal `process.env.X` property
 * access: Next only inlines that form, never a destructured or dynamic lookup.
 *
 * The fallbacks are today's real URLs, so a missing variable degrades to a
 * working site rather than a broken one.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://splizo.codedharma.com";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://beta.splizo.codedharma.com";

export const APP_SIGNUP_URL = `${APP_URL}/signup`;
export const APP_LOGIN_URL = `${APP_URL}/login`;
