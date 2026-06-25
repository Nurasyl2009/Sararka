import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";

const newsCategories = ["catAll", "catCompany", "catProjects", "catTech", "catEvents"];

const news = [
  {
    id: "1", categoryKey: "catProjects",
    createdAt: new Date("2024-11-15"), image: null, gradient: "from-blue-900 to-blue-700",
  },
  {
    id: "2", categoryKey: "catCompany",
    createdAt: new Date("2024-10-28"), image: null, gradient: "from-green-900 to-teal-700",
  },
  {
    id: "3", categoryKey: "catEvents",
    createdAt: new Date("2024-10-05"), image: null, gradient: "from-purple-900 to-indigo-700",
  },
  {
    id: "4", categoryKey: "catTech",
    createdAt: new Date("2024-09-12"), image: null, gradient: "from-slate-900 to-blue-800",
  },
  {
    id: "5", categoryKey: "catCompany",
    createdAt: new Date("2024-08-20"), image: null, gradient: "from-orange-900 to-red-800",
  },
  {
    id: "6", categoryKey: "catTech",
    createdAt: new Date("2024-07-15"), image: null, gradient: "from-emerald-900 to-green-700",
  },
];

const categoryColors: Record<string, string> = {
  "catCompany": "bg-blue-50 text-blue-700 border-blue-100",
  "catProjects": "bg-purple-50 text-purple-700 border-purple-100",
  "catTech": "bg-cyan-50 text-cyan-700 border-cyan-100",
  "catEvents": "bg-orange-50 text-orange-700 border-orange-100",
};

export default function NewsPage() {
  const t = useTranslations("NewsPage");
  const tn = useTranslations("NewsData");

  const featured = news[0];
  const rest = news.slice(1);

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
              <p className="text-gray-300 text-lg max-w-xl mx-auto">
                {t("desc")}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-white border-b border-gray-100 sticky top-20 z-30">
          <div className="container-custom">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {newsCategories.map((cat) => (
                <button key={cat}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${cat === "catAll" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {/* Featured */}
            <AnimateIn className="mb-10">
              <Link href={`/news/${featured.id}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="grid md:grid-cols-2">
                    <div className={`h-64 md:h-auto bg-gradient-to-br ${featured.gradient} relative`}>
                      <div className="absolute inset-0 grid-pattern opacity-20" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[featured.categoryKey]}`}>
                          {t(featured.categoryKey)}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-3">{t("featuredLabel")}</span>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {tn(`${featured.id}.title`)}
                      </h2>
                      <p className="text-gray-600 mb-5 leading-relaxed">{tn(`${featured.id}.excerpt`)}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                          <Calendar className="w-4 h-4" />{formatDate(featured.createdAt)}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                          {t("readBtn")} <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article, index) => (
                <AnimateIn key={article.id} direction="up" delay={index * 80}>
                  <Link href={`/news/${article.id}`} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                      <div className={`h-44 bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 grid-pattern opacity-20" />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[article.categoryKey]}`}>
                            {t(article.categoryKey)}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                          {tn(`${article.id}.title`)}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{tn(`${article.id}.excerpt`)}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(article.createdAt)}</span>
                          <span className="flex items-center gap-1 text-blue-600 font-medium">{t("readBtn")} <ArrowRight className="w-3.5 h-3.5" /></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
