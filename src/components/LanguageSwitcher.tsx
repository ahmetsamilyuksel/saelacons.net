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
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            lang === locale
              ? "bg-blue-900 text-white"
              : "text-gray-500 hover:text-blue-900 hover:bg-gray-100"
          }`}
        >
          {langNames[locale]}
        </button>
      ))}
    </div>
  );
}
