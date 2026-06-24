"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeLabels, type Locale } from "@/i18n/config";

/**
 * Locale switcher built entirely on the i18n navigation layer.
 *
 * `usePathname()` (from `@/i18n/navigation`) returns the path WITHOUT the locale
 * prefix, so switching is just "same path, different locale" — no string
 * surgery, no losing the current route. `useTransition` keeps the UI responsive
 * and shows a pending state while the server re-renders in the new locale.
 *
 * For routes with dynamic segments, pass `{ pathname, params }` (from
 * `useParams`) instead of the bare `pathname`; next-intl will rebuild the URL.
 */
export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const activeLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function selectLocale(nextLocale: Locale) {
    if (nextLocale === activeLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="inline-flex items-center rounded-full border border-lavender bg-white/70 p-1 text-sm font-semibold backdrop-blur"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            disabled={isPending}
            aria-pressed={isActive}
            aria-label={t("switchTo", { language: localeLabels[locale] })}
            onClick={() => selectLocale(locale)}
            className={
              "rounded-full px-3 py-1 transition-colors disabled:opacity-60 " +
              (isActive
                ? "bg-violet text-cloud"
                : "text-ink/70 hover:text-violet")
            }
          >
            {localeLabels[locale]}
          </button>
        );
      })}
    </div>
  );
}
