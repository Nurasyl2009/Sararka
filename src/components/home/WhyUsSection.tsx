import { AnimateIn } from "@/components/ui/AnimateIn";
import { Shield, Clock, Award, Zap, Headphones, Leaf } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Надёжность и качество",
    description:
      "Все работы выполняются в соответствии с международными стандартами ISO 9001:2015. Гарантируем качество на каждом этапе.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "Соблюдение сроков",
    description:
      "Строго соблюдаем договорные сроки. За 15 лет работы ни один проект не был сдан с задержкой по нашей вине.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Award,
    title: "Опытная команда",
    description:
      "Более 50 сертифицированных специалистов с опытом работы в ведущих инженерных компаниях Казахстана и СНГ.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Zap,
    title: "Современные технологии",
    description:
      "Используем передовое оборудование и программное обеспечение ведущих мировых производителей.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description:
      "Аварийная служба работает круглосуточно. Время выезда на объект — не более 2 часов в Астане.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Leaf,
    title: "Экологичные решения",
    description:
      "Проектируем энергоэффективные и экологичные системы, снижающие операционные расходы клиента.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            Почему выбирают нас
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Наши{" "}
            <span className="text-gradient">конкурентные преимущества</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы отличаемся от конкурентов комплексным подходом, высоким
            профессионализмом и ориентацией на долгосрочные отношения.
          </p>
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <AnimateIn key={reason.title} direction="up" delay={index * 100}>
              <div className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`w-12 h-12 ${reason.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <reason.icon className={`w-6 h-6 ${reason.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
