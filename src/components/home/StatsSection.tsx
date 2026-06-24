import { AnimateIn } from "@/components/ui/AnimateIn";
import { CountUp } from "@/components/ui/CountUp";
import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("StatsSection");

  const stats = [
    { value: 15, suffix: "+", label: t("s1l"), description: t("s1d"), icon: "📅" },
    { value: 200, suffix: "+", label: t("s2l"), description: t("s2d"), icon: "🏆" },
    { value: 50, suffix: "+", label: t("s3l"), description: t("s3d"), icon: "👥" },
    { value: 98, suffix: "%", label: t("s4l"), description: t("s4d"), icon: "⭐" },
    { value: 30, suffix: "+", label: t("s5l"), description: t("s5d"), icon: "🌍" },
    { value: 24, suffix: "/7", label: t("s6l"), description: t("s6d"), icon: "🛠️" },
  ];

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
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t("title1")}{" "}
            <span className="text-gradient">{t("title2")}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("desc")}
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
