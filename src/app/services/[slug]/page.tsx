import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SERVICE_DATA } from "@/types";
import { CheckCircle, ArrowLeft, ArrowRight, Phone } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICE_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_DATA.find((s) => s.slug === slug);
  if (!service) return { title: "Услуга не найдена" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_DATA.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = SERVICE_DATA.filter((s) => s.slug !== slug);

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
                <ArrowLeft className="w-4 h-4" /> Все услуги
              </Link>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-5 shadow-lg`}>
                {service.icon}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl">{service.description}</p>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Что входит в услугу</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Процесс работы</h2>
                  <div className="space-y-4 mb-10">
                    {[
                      { step: "01", title: "Консультация", desc: "Бесплатная первичная консультация и анализ задачи" },
                      { step: "02", title: "Техническое задание", desc: "Разработка ТЗ и согласование объёма работ" },
                      { step: "03", title: "Коммерческое предложение", desc: "Подготовка детального КП с расчётом стоимости" },
                      { step: "04", title: "Договор", desc: "Заключение договора с фиксированными сроками" },
                      { step: "05", title: "Выполнение", desc: "Реализация проекта с еженедельной отчётностью" },
                      { step: "06", title: "Сдача объекта", desc: "Приёмка, тестирование и гарантийное обслуживание" },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
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
                    <h3 className="text-xl font-bold mb-3">Получить консультацию</h3>
                    <p className="text-blue-200 text-sm mb-5">Ответим в течение 30 минут в рабочее время</p>
                    <Link href="/contact"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                      <Phone className="w-4 h-4" /> Связаться с нами
                    </Link>
                  </div>

                  {/* Other Services */}
                  <div className="rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Другие услуги</h3>
                    <div className="space-y-3">
                      {otherServices.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                          <span className="text-xl">{s.icon}</span>
                          <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600 transition-colors">{s.shortTitle}</span>
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
