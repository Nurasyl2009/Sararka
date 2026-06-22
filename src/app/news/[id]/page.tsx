import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

const newsData: Record<string, {
  id: string; title: string; category: string; excerpt: string;
  content: string; createdAt: Date; gradient: string;
}> = {
  "1": {
    id: "1",
    title: "Сарыарқа Инжиниринг завершила крупнейший проект автоматизации в Атырау",
    category: "Проекты",
    excerpt: "Успешно завершена комплексная автоматизация установок первичной переработки нефти на заводе КазМунайГаз.",
    content: `
      <p>ТОО «Сарыарқа Инжиниринг» успешно завершила один из крупнейших проектов в своей истории — комплексную автоматизацию установок первичной переработки нефти на заводе КазМунайГаз в г. Атырау.</p>
      
      <h2>О проекте</h2>
      <p>Проект продолжался 14 месяцев и охватил несколько производственных установок. Команда специалистов компании внедрила современную систему SCADA на базе Siemens WinCC OA и программируемые логические контроллеры серии S7-1500.</p>
      
      <h2>Ключевые достижения</h2>
      <p>В результате реализации проекта производительность завода возросла на 15%, операционные расходы снизились на 23%, а количество аварийных ситуаций сократилось на 87%.</p>
      
      <h2>Комментарий руководства</h2>
      <p>«Этот проект стал важной вехой в развитии нашей компании. Мы доказали, что способны реализовывать сложнейшие проекты в нефтегазовой отрасли на международном уровне качества», — прокомментировал генеральный директор Асылбек Жаксыбеков.</p>
    `,
    createdAt: new Date("2024-11-15"),
    gradient: "from-blue-900 to-blue-700",
  },
  "2": {
    id: "2",
    title: "Компания получила сертификат ISO 9001:2015 нового образца",
    category: "Компания",
    excerpt: "По итогам аудита компания успешно прошла ресертификацию системы менеджмента качества.",
    content: `
      <p>В ноябре 2024 года ТОО «Сарыарқа Инжиниринг» успешно прошла ресертификационный аудит и получила обновлённый сертификат ISO 9001:2015.</p>
      
      <h2>Значение сертификации</h2>
      <p>Международная сертификация подтверждает, что система менеджмента качества компании соответствует высочайшим мировым стандартам. Это открывает новые возможности для участия в международных тендерах.</p>
      
      <h2>Что проверялось</h2>
      <p>В ходе аудита проверялись все ключевые бизнес-процессы: проектирование, монтаж, управление качеством, работа с клиентами и субподрядчиками.</p>
    `,
    createdAt: new Date("2024-10-28"),
    gradient: "from-green-900 to-teal-700",
  },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const article = newsData[id];
  if (!article) notFound();

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
                <ArrowLeft className="w-4 h-4" /> Все новости
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-sm mb-5">
                <Tag className="w-3.5 h-3.5" />{article.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">{article.title}</h1>
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
                  {article.excerpt}
                </p>
                <div
                  className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </AnimateIn>

              {/* Sidebar */}
              <AnimateIn direction="right" delay={200} className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="rounded-2xl border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Информация</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <dt className="text-gray-500">Дата публикации</dt>
                        <dd className="font-medium text-gray-900">{formatDate(article.createdAt)}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <dt className="text-gray-500">Категория</dt>
                        <dd className="font-medium text-gray-900">{article.category}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0f2057, #1e40af)" }}>
                    <h3 className="font-bold mb-2">Нужна помощь?</h3>
                    <p className="text-blue-200 text-sm mb-4">Задайте вопрос нашим специалистам</p>
                    <Link href="/contact" className="block text-center py-2.5 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                      Связаться с нами
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
