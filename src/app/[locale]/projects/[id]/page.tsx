import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Building2, ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

const projects: Record<string, {
  id: string; categoryKey: string; year: string;
  technologies: string[]; gradient: string;
}> = {
  "1": {
    id: "1", categoryKey: "catAutomation", year: "2023",
    technologies: ["Siemens SCADA", "PLC S7-1500", "WinCC OA", "PROFIBUS", "OPC UA"],
    gradient: "from-blue-900 to-blue-700",
  },
  "2": {
    id: "2", categoryKey: "catElectric", year: "2023",
    technologies: ["ABB", "Schneider Electric", "КЭАЗ", "Legrand", "SEL"],
    gradient: "from-indigo-900 to-purple-700",
  },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id, locale } = await params as unknown as { id: string, locale: string };
  const project = projects[id];
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'ProjectDetail' });
  const tp = await getTranslations({ locale, namespace: 'ProjectsData' });
  const tc = await getTranslations({ locale, namespace: 'ProjectsPage' });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={`pt-32 pb-20 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container-custom relative z-10">
            <AnimateIn>
              <Link href="/projects" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> {t("allProjects")}
              </Link>
              <span className="inline-flex px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-sm mb-4">
                {tc(project.categoryKey)}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">{tp(`${id}.title`)}</h1>
              <div className="flex flex-wrap gap-5 text-gray-300 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-400" />{tp(`${id}.location`)}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" />{project.year}</span>
                <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-blue-400" />{t("client")} {tp(`${id}.client`)}</span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* Project Image Placeholder */}
                <AnimateIn direction="up">
                  <div className={`h-72 rounded-2xl bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <Building2 className="w-24 h-24 text-white/20" />
                  </div>
                </AnimateIn>

                <AnimateIn direction="left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("descTitle")}</h2>
                  <p className="text-gray-600 leading-relaxed">{tp(`${id}.description`)}</p>
                </AnimateIn>

                {[
                  { title: t("task"), content: tp(`${id}.challenge`), icon: "🎯" },
                  { title: t("solution"), content: tp(`${id}.solution`), icon: "💡" },
                  { title: t("result"), content: tp(`${id}.result`), icon: "🏆" },
                ].map((block, i) => (
                  <AnimateIn key={block.title} direction="left" delay={i * 100}>
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>{block.icon}</span>{block.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{block.content}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              {/* Sidebar */}
              <AnimateIn direction="right" delay={200} className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">{t("details")}</h3>
                    <dl className="space-y-3 text-sm">
                      {[
                        { label: t("clientLabel"), value: tp(`${id}.client`) },
                        { label: t("location"), value: tp(`${id}.location`) },
                        { label: t("year"), value: project.year },
                        { label: t("duration"), value: tp(`${id}.duration`) },
                        { label: t("category"), value: tc(project.categoryKey) },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                          <dt className="text-gray-500">{item.label}</dt>
                          <dd className="font-medium text-gray-900">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">{t("tech")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0f2057, #1e40af)" }}>
                    <h3 className="font-bold mb-2">{t("ctaTitle")}</h3>
                    <p className="text-blue-200 text-sm mb-4">{t("ctaDesc")}</p>
                    <Link href="/contact" className="block text-center py-2.5 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                      {t("ctaBtn")}
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
