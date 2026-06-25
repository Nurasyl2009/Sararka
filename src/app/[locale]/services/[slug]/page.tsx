import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SERVICE_DATA } from "@/types";
import { CheckCircle, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ slug: string; locale?: string }>;
}

export async function generateStaticParams() {
  return SERVICE_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_DATA.find((s) => s.slug === slug);
  const t = await getTranslations('ServiceDetail');
  const ts = await getTranslations('ServicesData');

  if (!service) return { title: t("notFound") };
  return {
    title: ts(`${service.slug}.title`),
    description: ts(`${service.slug}.description`),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_DATA.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = SERVICE_DATA.filter((s) => s.slug !== slug);
  const t = await getTranslations('ServiceDetail');
  const ts = await getTranslations('ServicesData');

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container-custom relative z-10">
            <AnimateIn>
              <Link href="/services" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> {t("allServices")}
              </Link>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-5 shadow-lg`}>
                {service.icon}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {ts(`${service.slug}.title`)}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl">{ts(`${service.slug}.description`)}</p>
            </AnimateIn>
          </div>
        </section>

        {/* Details */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <AnimateIn direction="left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("includes")}</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {[1, 2, 3, 4, 5].map((fNum) => (
                      <div key={fNum} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{ts(`${service.slug}.f${fNum}`)}</span>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("process")}</h2>
                  <div className="space-y-4 mb-10">
                    {[1, 2, 3, 4, 5, 6].map((pNum) => (
                      <div key={pNum} className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold">
                          0{pNum}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{t(`p${pNum}t`)}</h4>
                          <p className="text-gray-600 text-sm">{t(`p${pNum}d`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              </div>

              {/* Sidebar */}
              <AnimateIn direction="right" delay={200} className="lg:col-span-1">
                <div className="sticky top-28">
                  {/* CTA Card */}
                  <div className="rounded-2xl p-6 mb-6 text-white"
                    style={{ background: "linear-gradient(135deg, #0f2057, #1e40af)" }}>
                    <h3 className="text-xl font-bold mb-3">{t("ctaTitle")}</h3>
                    <p className="text-blue-200 text-sm mb-5">{t("ctaDesc")}</p>
                    <Link href="/contact"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                      <Phone className="w-4 h-4" /> {t("ctaBtn")}
                    </Link>
                  </div>

                  {/* Other Services */}
                  <div className="rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">{t("otherServices")}</h3>
                    <div className="space-y-3">
                      {otherServices.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                          <span className="text-xl">{s.icon}</span>
                          <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">{ts(`${s.slug}.shortTitle`)}</span>
                          <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </Link>
                      ))}
                    </div>
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
