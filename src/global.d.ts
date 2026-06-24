import type { routing } from "@/i18n/routing";
import type messages from "../messages/en.json";

/**
 * Compile-time type safety for the whole i18n layer.
 *
 * Augmenting next-intl's `AppConfig` makes:
 *   - `Locale` a strict union (`"en" | "ar"`) everywhere next-intl exposes it,
 *   - translation keys fully autocompleted and type-checked, so
 *     `useTranslations("HomePage")("hero.title")` is verified against the JSON,
 *     and a typo or missing key fails the build.
 *
 * `en.json` is the canonical shape; `ar.json` is checked against it implicitly
 * because both feed the same `Messages` type.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
