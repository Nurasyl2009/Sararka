import { AnimateIn } from "@/components/ui/AnimateIn";
import { CountUp } from "@/components/ui/CountUp";

const stats = [
  {
    value: 15,
    suffix: "+",
    label: "Лет на рынке",
    description: "Профессионального опыта",
    icon: "📅",
  },
  {
    value: 200,
    suffix: "+",
    label: "Реализованных проектов",
    description: "По всему Казахстану",
    icon: "🏆",
  },
  {
    value: 50,
    suffix: "+",
    label: "Специалистов",
    description: "В нашей команде",
    icon: "👥",
  },
  {
    value: 98,
    suffix: "%",
    label: "Довольных клиентов",
    description: "Возвращаются снова",
    icon: "⭐",
  },
  {
    value: 30,
    suffix: "+",
    label: "Городов охвата",
    description: "По Казахстану",
    icon: "🌍",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Техподдержка",
    description: "Аварийный выезд",
    icon: "🛠️",
  },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060d20 0%, #0f2057 60%, #1e3a8a 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
            Наши достижения
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Цифры говорят{" "}
            <span className="text-gradient">сами за себя</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            За годы работы мы завоевали доверие сотен клиентов
            и реализовали сотни успешных проектов.
          </p>
        </AnimateIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <AnimateIn key={stat.label} direction="up" delay={index * 80}>
              <div className="glass-dark rounded-2xl p-6 border border-blue-500/20 text-center group hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-blue-300 font-semibold text-sm mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-500 text-xs">{stat.description}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
