import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ArrowRight, Building2 } from "lucide-react";

const projects = [
  {
    id: "1",
    title: "Автоматизация нефтеперерабатывающего завода",
    category: "Автоматизация",
    location: "Атырау",
    year: "2023",
    image: null,
    gradient: "from-blue-900 to-blue-700",
  },
  {
    id: "2",
    title: "Электромонтаж торгового центра «Мега»",
    category: "Электромонтаж",
    location: "Астана",
    year: "2023",
    image: null,
    gradient: "from-indigo-900 to-purple-700",
  },
  {
    id: "3",
    title: "Проектирование инженерных систем отеля",
    category: "Проектирование",
    location: "Алматы",
    year: "2022",
    image: null,
    gradient: "from-slate-900 to-blue-800",
  },
  {
    id: "4",
    title: "Техническое обслуживание промышленного комплекса",
    category: "Обслуживание",
    location: "Шымкент",
    year: "2022",
    image: null,
    gradient: "from-navy-900 to-blue-700",
  },
  {
    id: "5",
    title: "Система управления зданием (BMS)",
    category: "Автоматизация",
    location: "Астана",
    year: "2024",
    image: null,
    gradient: "from-blue-800 to-cyan-700",
  },
  {
    id: "6",
    title: "Реконструкция энергосистемы завода",
    category: "Электромонтаж",
    location: "Усть-Каменогорск",
    year: "2024",
    image: null,
    gradient: "from-slate-800 to-indigo-700",
  },
];

const categoryColors: Record<string, string> = {
  "Автоматизация": "bg-purple-100 text-purple-700",
  "Электромонтаж": "bg-yellow-100 text-yellow-700",
  "Проектирование": "bg-blue-100 text-blue-700",
  "Обслуживание": "bg-green-100 text-green-700",
};

export default function ProjectsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <AnimateIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
              Портфолио
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Последние{" "}
              <span className="text-gradient">проекты</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 border-2 text-sm font-semibold rounded-xl hover:bg-navy-50 transition-all"
            style={{ borderColor: "#0f2057", color: "#0f2057" }}
          >
            Все проекты
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimateIn key={project.id} direction="up" delay={index * 80}>
              <Link href={`/projects/${project.id}`} className="group block">
                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  {/* Image */}
                  <div
                    className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-white/20" />
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          categoryColors[project.category] ||
                          "bg-white/20 text-white"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-blue-700" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        📍 {project.location}
                      </span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
