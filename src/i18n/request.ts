import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Request-scoped i18n configuration.
 *
 * Runs once per request on the server and feeds every server-side translation
 * API (`getTranslations`, `getFormatter`, `getMessages`, metadata, ...) as well
 * as the `NextIntlClientProvider` boundary. Referenced from `next.config.ts`
 * via `createNextIntlPlugin("./src/i18n/request.ts")`.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` typically corresponds to the `[locale]` route segment.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // Lazily load only the active locale's messages. The dynamic import keeps
    // each locale's bundle separate and code-split. Add namespaces by editing
    // the JSON files — no change is needed here.
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
