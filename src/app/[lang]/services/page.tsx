import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const serviceIcons: Record<string, string> = {
  projectManagement:
    "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  structuralEngineering:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  qualityControl:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  consulting:
    "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  supervision:
    "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  design:
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
            backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Saelacons
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
                            d={serviceIcons[key] || serviceIcons.consulting}
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
