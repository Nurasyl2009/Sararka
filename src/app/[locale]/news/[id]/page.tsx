import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const newsData: Record<string, {
  id: string; categoryKey: string; createdAt: Date; gradient: string;
}> = {
  "1": {
    id: "1",
    categoryKey: "catProjects",
    createdAt: new Date("2024-11-15"),
    gradient: "from-blue-900 to-blue-700",
  },
  "2": {
    id: "2",
    categoryKey: "catCompany",
    createdAt: new Date("2024-10-28"),
    gradient: "from-green-900 to-teal-700",
  },
};

interface Props {
  params: Promise<{ id: string, locale: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { id, locale } = await params as unknown as { id: string, locale: string };
  const article = newsData[id];
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'NewsDetail' });
  const tn = await getTranslations({ locale, namespace: 'NewsData' });
  const tc = await getTranslations({ locale, namespace: 'NewsPage' });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={`pt-32 pb-20 bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container-custom relative z-10 max-w-4xl">
            <AnimateIn>
              <Link href="/news" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> {t("allNews")}
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-sm mb-5">
                <Tag className="w-3.5 h-3.5" />{tc(article.categoryKey)}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">{tn(`${id}.title`)}</h1>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Calendar className="w-4 h-4 text-blue-400" />
                {formatDate(article.createdAt)}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-12">
              <AnimateIn direction="left" className="lg:col-span-2">
                <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-5">
                  {tn(`${id}.excerpt`)}
                </p>
                <div
                  className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: tn(`${id}.content`) }}
                />
              </AnimateIn>

              {/* Sidebar */}
              <AnimateIn direction="right" delay={200} className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">{t("info")}</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <dt className="text-gray-500">{t("date")}</dt>
                        <dd className="font-medium text-gray-900">{formatDate(article.createdAt)}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <dt className="text-gray-500">{t("category")}</dt>
                        <dd className="font-medium text-gray-900">{tc(article.categoryKey)}</dd>
                      </div>
                    </dl>
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
