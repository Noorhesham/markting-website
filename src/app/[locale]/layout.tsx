import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getDirection } from "@/i18n/config";
import { fontVariables } from "@/fonts";
import { GsapProvider } from "@/components/providers/gsap-provider";
import "../globals.css";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Pre-render every locale at build time (`/en`, `/ar`). Combined with
 * `setRequestLocale` below, this enables fully static rendering of localized
 * pages instead of forcing them dynamic.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Per-locale metadata. This is the SEO foundation:
 *   - localized <title>/<description> from the `Metadata` namespace,
 *   - `title.template` so child pages get "Page · Mediaverse" automatically,
 *   - `alternates.languages` — the hook for `hreflang` once a real base URL
 *     is configured via `NEXT_PUBLIC_SITE_URL`.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://mediaverseagency.com",
    ),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((keyword) => keyword.trim()),
    alternates: {
      // TODO: set `canonical` per page; languages map drives <link hreflang>.
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc}`]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Reject unknown locales before rendering anything (narrows `locale` to the
  // `Locale` union for everything below).
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opt this request into static rendering for the active locale.
  setRequestLocale(locale);

  const direction = getDirection(locale);

  return (
    // `lang` + `dir` are the foundation of correct RTL: the whole document
    // mirrors, and CSS logical properties (ms/me/ps/pe/start/end) follow.
    <html
      lang={locale}
      dir={direction}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        {/*
          No messages prop needed: in a Server Component, NextIntlClientProvider
          inherits locale + messages from the request config, then exposes them
          to all Client Components below.
        */}
        <NextIntlClientProvider>
          <GsapProvider>{children}</GsapProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
