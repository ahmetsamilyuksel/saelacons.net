import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import HeroParticles from "@/components/HeroParticles";
import CountUpNumber from "@/components/CountUpNumber";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  const services = [
    {
      key: "apartmentRenovation",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2",
    },
    {
      key: "cafeRestaurant",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      key: "finishingWork",
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    },
  ];

  const stats = [
    { value: 30, suffix: "+", label: dict.home.stats.projects },
    { value: 3500, suffix: "+", label: dict.home.stats.area },
    { value: 25, suffix: "+", label: dict.home.stats.clients },
    { value: 15, suffix: "+", label: dict.home.stats.team },
  ];

  const serviceDict = dict.services.list as Record<string, { title: string; description: string }>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/generated-Yan09zvbq5in8ywg.png"
          alt="Luxury interior"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy-dark/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-transparent" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <HeroParticles />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full">
          <div className="max-w-4xl">
            <AnimatedSection delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-gold text-sm mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                {lang === "ru" ? "ООО «САЭЛА»" : "SAELACONS"}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                {dict.hero.title.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="gradient-text">
                  {dict.hero.title.split(" ").slice(2, 4).join(" ")}
                </span>{" "}
                {dict.hero.title.split(" ").slice(4).join(" ")}
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <p className="mt-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                {dict.hero.subtitle}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.8}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  {dict.hero.cta}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${lang}/services`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/30 transition-all"
                >
                  {dict.hero.learnMore}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gold/60 rounded-full mt-1.5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-slate-50 py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600">
                    <CountUpNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-3 text-sm text-slate-500 font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Image Banner */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/generated-YrD4NL72QeCrkMyy.png"
          alt="Modern interior design"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-transparent to-navy-dark" />
      </section>

      {/* Services Preview */}
      <section className="relative bg-white py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              {dict.home.servicesTitle}
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-slate-900">
              {dict.home.servicesSubtitle}
            </h2>
            <div className="gold-line mx-auto mt-6" />
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {services.map((service) => {
              const s = serviceDict[service.key];
              return (
                <StaggerItem key={service.key}>
                  <div className="group bg-slate-50 hover:bg-white rounded-2xl p-8 card-hover h-full border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-12">
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
            >
              {dict.home.viewAll}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="relative bg-slate-50 py-28 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection>
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
                  {dict.home.whyUsTitle}
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
                  {dict.home.whyUsTitle}
                </h2>
                <div className="gold-line mt-6" />
              </AnimatedSection>

              <div className="mt-10 space-y-6">
                {Object.entries(dict.about.valuesList)
                  .filter(([key]) => !key.endsWith("Text"))
                  .map(([key, value], index) => {
                    const textKey = `${key}Text` as keyof typeof dict.about.valuesList;
                    return (
                      <AnimatedSection key={key} delay={0.1 * index} direction="left">
                        <div className="flex gap-4 group">
                          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 text-lg">{value}</h3>
                            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                              {dict.about.valuesList[textKey]}
                            </p>
                          </div>
                        </div>
                      </AnimatedSection>
                    );
                  })}
              </div>
            </div>

            <AnimatedSection direction="right" delay={0.3}>
              <div className="relative">
                {/* Image card */}
                <div className="relative rounded-2xl overflow-hidden img-zoom">
                  <Image
                    src="/images/generated-m5K8blOEyDHyJ56E.png"
                    alt="Interior design project"
                    width={600}
                    height={450}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src="/images/amin logo arka plan şeffaf 3d.png"
                        alt="Saelacons Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                      <h3 className="text-2xl font-bold text-white">
                        {lang === "ru" ? "ООО «САЭЛА»" : "SAELACONS"}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {dict.about.description}
                    </p>
                    <Link
                      href={`/${lang}/about`}
                      className="inline-flex items-center mt-4 text-gold font-semibold hover:text-gold-light transition-colors group"
                    >
                      {dict.hero.learnMore}
                      <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 border border-gold/10 rounded-xl -z-10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/generated-mP43QXRDx9UGDqV9.png"
          alt="Renovation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/75" />
        <div className="absolute inset-0 particle-bg" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              {dict.hero.cta}
            </h2>
            <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {dict.hero.subtitle}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 mt-10 px-10 py-5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg"
            >
              {dict.hero.cta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
