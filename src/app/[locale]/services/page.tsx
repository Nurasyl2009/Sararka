import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ArrowRight } from "lucide-react";
import { SERVICE_DATA } from "@/types";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });
  return {
    title: t('badge'),
    description: t('desc'),
  };
}

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  const ts = useTranslations("ServicesData");
  
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

        {/* Services List */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="space-y-8">
              {SERVICE_DATA.map((service, index) => (
                <AnimateIn key={service.slug} direction={index % 2 === 0 ? "left" : "right"} delay={index * 80}>
                  <div className="grid lg:grid-cols-5 gap-8 items-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 bg-white">
                    <div className="lg:col-span-2">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-5 shadow-lg`}>
                        {service.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{ts(`${service.slug}.title`)}</h2>
                      <p className="text-gray-600 leading-relaxed mb-5">{ts(`${service.slug}.description`)}</p>
                      <Link href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all text-sm">
                        {t("readMore")} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="lg:col-span-3">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t("includes")}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[1, 2, 3, 4, 5].map((fNum) => (
                          <div key={fNum} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                            <span className="text-gray-700 text-sm">{ts(`${service.slug}.f${fNum}`)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom text-center">
            <AnimateIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("ctaTitle")}</h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                {t("ctaDesc")}
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/30">
                {t("ctaBtn")} <ArrowRight className="w-5 h-5" />
              </Link>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
