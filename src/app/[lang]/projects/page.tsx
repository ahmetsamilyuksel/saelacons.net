import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const projectGradients = [
  "from-gold/20 via-amber-900/30 to-navy",
  "from-blue-900/30 via-navy to-gold/10",
  "from-emerald-900/20 via-navy to-gold/10",
  "from-purple-900/20 via-navy to-gold/10",
];

const years = ["2024", "2023", "2022", "2021"];

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  const projectsList = dict.projects.list as Record<
    string,
    {
      title: string;
      description: string;
      category: string;
      location: string;
    }
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
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gold/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Portfolio
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-white">
              {dict.projects.title}
            </h1>
            <p className="mt-6 text-xl text-gray-400 max-w-2xl leading-relaxed">
              {dict.projects.subtitle}
            </p>
            <div className="gold-line mt-8" />
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-navy py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
            {Object.entries(projectsList).map(([key, project], index) => (
              <StaggerItem key={key}>
                <div className="group glass rounded-2xl overflow-hidden card-hover">
                  {/* Image area / gradient placeholder */}
                  <div className={`relative h-56 bg-gradient-to-br ${projectGradients[index] || projectGradients[0]} overflow-hidden`}>
                    {/* Decorative elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <svg
                          className="w-20 h-20 text-gold/10 group-hover:text-gold/20 transition-colors duration-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={0.5}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full">
                      <span className="text-xs font-mono text-gold">
                        {years[index] || "2021"}
                      </span>
                    </div>

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1.5 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-2 text-gold/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {project.location}
                    </div>

                    {/* Bottom line */}
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
