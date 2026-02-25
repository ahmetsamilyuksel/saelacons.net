import type { Metadata } from "next";
import "../globals.css";
import { i18n, Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Saelacons — İnşaat ve Mühendislik Danışmanlığı",
  description:
    "Saelacons, inşaat ve mühendislik sektöründe uluslararası standartlarda danışmanlık hizmeti sunan bir firmadır.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="antialiased font-sans">
        <Header lang={lang} dict={dict} />
        <main className="pt-20">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
