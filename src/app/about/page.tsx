import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Award, Target, Heart, Users, CheckCircle, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "О компании",
  description: "История, миссия, ценности и команда компании Сарыарқа Инжиниринг — ведущего инженерного предприятия Казахстана.",
};

const values = [
  { icon: Award, title: "Качество", description: "Не допускаем компромиссов в вопросах качества на ни одном этапе работы.", color: "bg-blue-50 text-blue-600" },
  { icon: Target, title: "Результат", description: "Ориентированы на конкретный измеримый результат для каждого клиента.", color: "bg-purple-50 text-purple-600" },
  { icon: Heart, title: "Клиент", description: "Интересы клиента — наш главный приоритет в любой ситуации.", color: "bg-red-50 text-red-600" },
  { icon: Users, title: "Команда", description: "Профессиональная команда — наш главный актив и конкурентное преимущество.", color: "bg-green-50 text-green-600" },
];

const timeline = [
  { year: "2009", event: "Основание компании в Астане. Первые проекты по электромонтажу." },
  { year: "2011", event: "Расширение до 20 специалистов. Выход на рынок промышленной автоматизации." },
  { year: "2014", event: "Открытие проектного бюро. Получение первой международной сертификации." },
  { year: "2017", event: "100-й реализованный проект. Открытие представительства в Алматы." },
  { year: "2020", event: "Запуск сервисного центра и аварийной службы 24/7." },
  { year: "2023", event: "Более 200 проектов. Команда 50+ специалистов. Новые направления IoT." },
  { year: "2024", event: "Внедрение BIM-проектирования. Цифровая трансформация бизнес-процессов." },
];

const team = [
  { name: "Асылбек Жаксыбеков", role: "Генеральный директор", experience: "20 лет опыта", icon: "👨‍💼" },
  { name: "Гульнара Сейткали", role: "Главный инженер-проектировщик", experience: "15 лет опыта", icon: "👩‍🔧" },
  { name: "Нурлан Ахметов", role: "Руководитель монтажного отдела", experience: "18 лет опыта", icon: "👨‍🔧" },
  { name: "Айгерим Бекова", role: "Директор по автоматизации", experience: "12 лет опыта", icon: "👩‍💻" },
];

const certifications = [
  "ISO 9001:2015 — Система менеджмента качества",
  "ISO 14001:2015 — Экологический менеджмент",
  "OHSAS 18001 — Охрана труда и безопасность",
  "Лицензия Министерства энергетики РК",
  "Сертификат Siemens Automation Partner",
  "Партнёр ABB в Казахстане",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container-custom relative z-10 text-center">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
                О компании
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                15 лет инженерного <span className="text-gradient">мастерства</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Мы — команда профессионалов, которая создаёт надёжные инженерные системы
                для промышленных и гражданских объектов Казахстана.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimateIn direction="left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
                  Наша миссия
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Создаём инфраструктуру <span className="text-gradient">будущего</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Миссия ТОО «Сарыарқа Инжиниринг» — предоставлять высококачественные инженерные решения,
                  которые обеспечивают надёжность, безопасность и эффективность объектов наших клиентов.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Мы стремимся быть стратегическим партнёром для бизнеса, а не просто подрядчиком.
                  Это означает долгосрочные отношения, честность и готовность решать самые сложные задачи.
                </p>
                <div className="space-y-3">
                  {["Надёжность и профессионализм в каждом проекте", "Инновационные технологии и современное оборудование", "Соответствие международным стандартам качества"].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </AnimateIn>
              <AnimateIn direction="right" delay={200}>
                <div className="bg-gradient-to-br from-navy-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #060d20 0%, #1e40af 100%)" }}>
                  <div className="absolute inset-0 grid-pattern opacity-20" />
                  <div className="relative z-10">
                    <div className="text-6xl mb-6">🎯</div>
                    <h3 className="text-2xl font-bold mb-4">Видение компании</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Стать лидирующей инжиниринговой компанией Центральной Азии, задающей стандарты
                      качества и инноваций в области инженерных систем.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gradient">200+</div>
                        <div className="text-gray-400 text-sm mt-1">Проектов</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gradient">15+</div>
                        <div className="text-gray-400 text-sm mt-1">Лет опыта</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <AnimateIn className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Наши <span className="text-gradient">ценности</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Принципы, которыми мы руководствуемся в каждом проекте и в отношениях с клиентами.
              </p>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <AnimateIn key={value.title} direction="up" delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <AnimateIn className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                История <span className="text-gradient">компании</span>
              </h2>
            </AnimateIn>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-200" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <AnimateIn key={item.year} direction="left" delay={i * 80}>
                    <div className="flex gap-6 items-start">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                          <span className="text-white font-bold text-xs">{item.year}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-5 flex-1 border border-gray-100 hover:border-blue-200 transition-colors">
                        <p className="text-gray-700 leading-relaxed">{item.event}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <AnimateIn className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Наша <span className="text-gradient">команда</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Руководство компании — опытные специалисты с многолетней экспертизой.
              </p>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <AnimateIn key={member.name} direction="up" delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                      {member.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                    <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
                      <Star className="w-3.5 h-3.5 text-yellow-400" />
                      {member.experience}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <AnimateIn className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Сертификаты и <span className="text-gradient">лицензии</span>
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <AnimateIn key={cert} direction="up" delay={i * 80}>
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{cert}</span>
                  </div>
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
