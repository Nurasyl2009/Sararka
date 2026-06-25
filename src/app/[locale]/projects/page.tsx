"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Building2, ArrowRight, MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

const categories = ["catAll", "catAutomation", "catElectric", "catDesign", "catMaintenance"];

const projects = [
  { id: "1", categoryKey: "catAutomation", year: "2023", technologies: ["Siemens SCADA", "PLC S7-1500", "WinCC OA"], gradient: "from-blue-900 to-blue-700" },
  { id: "2", categoryKey: "catElectric", year: "2023", technologies: ["ABB", "Schneider Electric", "КЭАЗ"], gradient: "from-indigo-900 to-purple-700" },
  { id: "3", categoryKey: "catDesign", year: "2022", technologies: ["AutoCAD MEP", "Revit MEP", "ARCHICAD"], gradient: "from-slate-900 to-blue-800" },
  { id: "4", categoryKey: "catMaintenance", year: "2022", technologies: ["Mitsubishi", "Omron", "Beckhoff"], gradient: "from-green-900 to-teal-700" },
  { id: "5", categoryKey: "catAutomation", year: "2024", technologies: ["KNX", "BACnet", "Modbus TCP"], gradient: "from-blue-800 to-cyan-700" },
  { id: "6", categoryKey: "catElectric", year: "2024", technologies: ["Legrand", "ABB", "Eaton"], gradient: "from-slate-800 to-indigo-700" },
  { id: "7", categoryKey: "catDesign", year: "2021", technologies: ["Esser", "Bosch", "Notifier"], gradient: "from-red-900 to-orange-800" },
  { id: "8", categoryKey: "catAutomation", year: "2023", technologies: ["Siemens WMS", "RFID", "IoT"], gradient: "from-purple-900 to-blue-800" },
  { id: "9", categoryKey: "catElectric", year: "2024", technologies: ["Legrand", "Schneider", "ИЭК"], gradient: "from-yellow-900 to-orange-700" },
];

const categoryColors: Record<string, string> = {
  "catAutomation": "bg-purple-100 text-purple-700 border-purple-200",
  "catElectric": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "catDesign": "bg-blue-100 text-blue-700 border-blue-200",
  "catMaintenance": "bg-green-100 text-green-700 border-green-200",
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("catAll");
  const t = useTranslations("ProjectsPage");
  const tp = useTranslations("ProjectsData");

  const filteredProjects = activeCategory === "catAll" 
    ? projects 
    : projects.filter(p => p.categoryKey === activeCategory);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container-custom relative z-10 text-center">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
                {t("badge")}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {t("title1")} <span className="text-gradient">{t("title2")}</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {t("desc")}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30">
          <div className="container-custom">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-gray-50 min-h-[50vh]">
          <div className="container-custom">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">{t("noProjects")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <AnimateIn key={project.id} direction="up" delay={index * 60}>
                    <Link href={`/projects/${project.id}`} className="group block">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                        {/* Thumbnail */}
                        <div className={`h-52 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                          <div className="absolute inset-0 grid-pattern opacity-20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Building2 className="w-20 h-20 text-white/15" />
                          </div>
                          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[project.categoryKey] || "bg-white/20 text-white"}`}>
                            {t(project.categoryKey)}
                          </span>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                              <ArrowRight className="w-5 h-5 text-blue-700" />
                            </div>
                          </div>
                        </div>
                        {/* Info */}
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{tp(`${project.id}.title`)}</h3>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{tp(`${project.id}.location`)}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{project.year}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
