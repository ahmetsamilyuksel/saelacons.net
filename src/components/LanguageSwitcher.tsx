"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n, Locale } from "@/i18n/config";

const langNames: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  ru: "RU",
};

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
            lang === locale
              ? "bg-gold/20 text-gold border border-gold/30"
              : "text-gray-400 hover:text-gold hover:bg-white/5"
          }`}
        >
          {langNames[locale]}
        </button>
      ))}
    </div>
  );
}
