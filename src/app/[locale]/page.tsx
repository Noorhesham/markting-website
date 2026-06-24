import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { AnimatedHero } from "@/components/animations/animated-hero";
import { FadeIn } from "@/components/animations/fade-in";
import { LocaleSwitcher } from "@/components/locale-switcher";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

// Feature cards are data-driven so adding one is a JSON edit, not JSX surgery.
const FEATURE_KEYS = ["strategy", "design", "growth"] as const;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Required again here (per page) to keep this route statically rendered.
  setRequestLocale(locale);

  // Server-side translations — no client JS shipped for this copy.
  const t = await getTranslations("HomePage");
  const tCommon = await getTranslations("Common");
  const tNav = await getTranslations("Navigation");

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Accessibility: first focusable element, hidden until focused. */}
      <a
        href="#main"
        className="sr-only rounded-md bg-violet px-4 py-2 text-cloud focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50"
      >
        {tCommon("skipToContent")}
      </a>

      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-lavender/60 bg-cloud/80 px-6 py-4 backdrop-blur">
        <Link
          href="/"
          className="font-display text-xl font-black tracking-tight text-violet"
        >
          {tCommon("brand")}
        </Link>

        {/* Logical `gap` only — identical markup works LTR and RTL. */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 sm:flex">
          <a href="#top" className="hover:text-violet">
            {tNav("home")}
          </a>
          <a href="#features" className="hover:text-violet">
            {tNav("services")}
          </a>
          <a href="#contact" className="hover:text-violet">
            {tNav("contact")}
          </a>
        </nav>

        <LocaleSwitcher />
      </header>

      <main id="main" className="flex-1">
        {/* Hero — client component: translations + GSAP entrance timeline. */}
        <section id="top" className="px-6 py-20 sm:py-28">
          <AnimatedHero />
        </section>

        {/* Features + stats — server-rendered, revealed on scroll via <FadeIn>. */}
        <section id="features" className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="font-display text-3xl font-black text-ink sm:text-4xl">
                  {t("features.title")}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-ink/70">
                  {t("features.subtitle")}
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {FEATURE_KEYS.map((key, index) => (
                <FadeIn key={key} delay={index * 0.1}>
                  <article className="h-full rounded-2xl border border-lavender bg-white/70 p-6 text-start">
                    <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-violet/10 font-display text-lg font-black text-violet">
                      {index + 1}
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      {t(`features.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-ink/70">
                      {t(`features.items.${key}.description`)}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>

            {/*
              Stats showcase ICU formatting. In Arabic, next-intl renders
              localized (Arabic-Indic) digits and a localized percent sign,
              and `projects` resolves the correct CLDR plural category.
            */}
            <FadeIn delay={0.1}>
              <dl className="mt-16 grid gap-8 rounded-3xl bg-ink px-8 py-10 text-cloud sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-cloud/60">{t("stats.title")}</dt>
                  <dd className="mt-2 font-display text-2xl font-black">
                    {t("stats.projects", { count: 250 })}
                  </dd>
                </div>
                <div className="sm:text-center">
                  <dd className="font-display text-2xl font-black">
                    {t("stats.satisfaction", { value: 0.98 })}
                  </dd>
                </div>
                <div className="sm:text-end">
                  <dd className="font-display text-2xl font-black">
                    {t("stats.countries", { count: 12 })}
                  </dd>
                </div>
              </dl>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="px-6 py-24">
          <FadeIn className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-gradient-to-br from-violet via-cobalt to-magenta px-8 py-16 text-center text-cloud">
              <h2 className="font-display text-3xl font-black sm:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-cloud/80">
                {t("cta.subtitle")}
              </p>
              <a
                href="mailto:hello@noor.studio"
                className="mt-8 inline-block rounded-full bg-cloud px-7 py-3 font-semibold text-violet transition-transform hover:scale-105"
              >
                {t("cta.button")}
              </a>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-lavender/60 px-6 py-8 text-center text-sm text-ink/60">
        {tCommon("brand")} — {tCommon("tagline")}
      </footer>
    </div>
  );
}
