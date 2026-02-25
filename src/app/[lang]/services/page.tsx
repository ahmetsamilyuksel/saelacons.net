import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const serviceIcons: Record<string, string> = {
  apartmentRenovation:
    "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2",
  commercialRenovation:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  cafeRestaurant:
    "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  finishingWork:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  bathroomKitchen:
    "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  designPlanning:
    "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
};

const serviceNumbers = ["01", "02", "03", "04", "05", "06"];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  const servicesList = dict.services.list as Record<
    string,
    { title: string; description: string }
  >;

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-navy-dark py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(30,64,175,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(30,64,175,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {lang === "ru" ? "ООО «САЭЛА»" : "SAELACONS"}
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-white">
              {dict.services.title}
            </h1>
            <p className="mt-6 text-xl text-gray-400 max-w-2xl leading-relaxed">
              {dict.services.subtitle}
            </p>
            <div className="gold-line mt-8" />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-navy py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {Object.entries(servicesList).map(([key, service], index) => (
              <StaggerItem key={key}>
                <div className="group glass rounded-2xl p-8 card-hover h-full relative overflow-hidden">
                  {/* Background number */}
                  <span className="absolute -top-4 -right-2 text-[120px] font-bold text-white/[0.02] leading-none select-none">
                    {serviceNumbers[index] || "00"}
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gold/10 text-gold rounded-xl flex items-center justify-center group-hover:bg-gold group-hover:text-navy-dark transition-all duration-300">
                        <svg
                          className="w-7 h-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={serviceIcons[key] || serviceIcons.finishingWork}
                          />
                        </svg>
                      </div>
                      <span className="text-gold/30 text-sm font-mono">
                        {serviceNumbers[index] || "00"}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover line */}
                    <div className="mt-6 w-0 group-hover:w-full h-px bg-gradient-to-r from-gold to-transparent transition-all duration-500" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
