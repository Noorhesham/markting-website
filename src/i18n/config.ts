import { routing } from "./routing";

/**
 * App-level locale metadata derived from the routing config.
 *
 * Kept separate from `routing.ts` so this file stays a pure, dependency-light
 * module that both server and client components can import (it contains no
 * next-intl runtime, only plain data + types).
 */

/** Union of supported locale codes, e.g. `"en" | "ar"`. */
export type Locale = (typeof routing.locales)[number];

/** Re-exports so consumers depend on one i18n entry point, not `routing` directly. */
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

export type Direction = "ltr" | "rtl";

/**
 * Text direction per locale. `satisfies` guarantees this map stays exhaustive:
 * adding a locale to `routing` without adding it here is a compile-time error.
 */
export const localeDirection = {
  en: "ltr",
  ar: "rtl",
} as const satisfies Record<Locale, Direction>;

/** Native display names for the locale switcher (always shown in their own script). */
export const localeLabels = {
  en: "English",
  ar: "العربية",
} as const satisfies Record<Locale, string>;

/** Resolve the writing direction for a locale. */
export function getDirection(locale: Locale): Direction {
  return localeDirection[locale];
}
