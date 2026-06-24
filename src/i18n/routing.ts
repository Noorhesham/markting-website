import { defineRouting } from "next-intl/routing";

/**
 * THE single source of truth for locale routing.
 *
 * Everything else in the i18n layer (navigation helpers, the request config,
 * the proxy, the `Locale` type, the direction map, the locale switcher) is
 * derived from this object. To add a locale later you change it here and add a
 * matching `messages/<locale>.json` file — nothing else needs editing.
 */
export const routing = defineRouting({
  // All supported locales. Order is meaningful: it's the order used by the
  // locale switcher and (when relevant) for content-negotiation fallbacks.
  locales: ["en", "ar"],

  // Used when no locale matches the request or an invalid locale is requested.
  defaultLocale: "en",

  // `"always"` keeps every URL explicitly prefixed (`/en/...`, `/ar/...`) and
  // redirects the bare `/` to the default locale. This is the clearest strategy
  // for a public bilingual marketing site and makes `hreflang`/canonical wiring
  // straightforward later. Alternatives: `"as-needed"` (no prefix for the
  // default locale) or `"never"` (cookie-only).
  localePrefix: "always",

  // Localized pathnames are intentionally left out for now. When marketing wants
  // SEO-friendly Arabic slugs, add them here and they flow through every `<Link>`
  // and navigation helper automatically, e.g.:
  //
  // pathnames: {
  //   "/": "/",
  //   "/about": { en: "/about", ar: "/من-نحن" },
  // },
});
