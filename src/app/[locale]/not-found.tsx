import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Localized 404. Rendered inside the `[locale]` layout, so it inherits the
 * correct `lang`/`dir`, fonts, and the next-intl request context — which is why
 * `useTranslations` works here in a Server Component.
 */
export default function LocaleNotFound() {
  const t = useTranslations("Common");

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-7xl font-black text-violet">404</p>
      <Link
        href="/"
        className="rounded-full bg-violet px-6 py-3 font-semibold text-cloud transition-colors hover:bg-cobalt"
      >
        {t("backToHome")}
      </Link>
    </main>
  );
}
