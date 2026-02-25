import Image from "next/image";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const projectImages = [
  "/images/generated-A1azJgGgpnS8EqMN.png",
  "/images/generated-A1azJr0eykcPZJJZ.png",
  "/images/generated-A1azJr8L2pS81Q9R.png",
  "/images/generated-A1azJrXvJWIENJE0.png",
  "/images/generated-AMqD4pBwa7s6lL1k.png",
  "/images/generated-AVLxbD2jzjTxvPwO.png",
];

const years = ["2025", "2025", "2024", "2024", "2024", "2025"];

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
        <Image
          src="/images/generated-ALp2obgoRjH935QN.png"
          alt="Interior renovation"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/50 via-navy-dark/80 to-navy-dark" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {lang === "ru" ? "Портфолио" : "Portfolio"}
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
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
            {Object.entries(projectsList).map(([key, project], index) => (
              <StaggerItem key={key}>
                <div className="group glass rounded-2xl overflow-hidden card-hover">
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden img-zoom">
                    <Image
                      src={projectImages[index] || projectImages[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />

                    {/* Year badge */}
                    <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full">
                      <span className="text-xs font-mono text-gold">
                        {years[index] || "2024"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1.5 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm mb-4">
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
