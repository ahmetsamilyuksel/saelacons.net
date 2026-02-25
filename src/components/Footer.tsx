import Link from "next/link";
import { Locale } from "@/i18n/config";

interface FooterProps {
  lang: Locale;
  dict: {
    nav: {
      home: string;
      about: string;
      services: string;
      projects: string;
      contact: string;
    };
    footer: {
      description: string;
      quickLinks: string;
      contactInfo: string;
      rights: string;
    };
    contact: {
      info: {
        addressText: string;
        phoneText: string;
        emailText: string;
      };
    };
  };
}

export default function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SAELACONS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {dict.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {[
                { href: `/${lang}`, label: dict.nav.home },
                { href: `/${lang}/about`, label: dict.nav.about },
                { href: `/${lang}/services`, label: dict.nav.services },
                { href: `/${lang}/projects`, label: dict.nav.projects },
                { href: `/${lang}/contact`, label: dict.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {dict.footer.contactInfo}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{dict.contact.info.addressText}</li>
              <li>{dict.contact.info.phoneText}</li>
              <li>{dict.contact.info.emailText}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Saelacons. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
