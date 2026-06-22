import { AnimateIn } from "@/components/ui/AnimateIn";
import { CheckCircle, Award, Users, Globe } from "lucide-react";

const highlights = [
  { icon: Award, text: "ISO 9001:2015 сертифицирована" },
  { icon: Users, text: "Более 50 опытных специалистов" },
  { icon: Globe, text: "Проекты по всему Казахстану" },
  { icon: CheckCircle, text: "Гарантия качества на все работы" },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image placeholder */}
          <AnimateIn direction="left">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 relative">
                {/* Engineering blueprint aesthetic */}
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🏗️</div>
                    <div className="text-white/60 text-lg font-medium">
                      Сарыарқа Инжиниринг
                    </div>
                    <div className="text-blue-400 text-sm mt-1">
                      Основана в 2009 году
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-[100px]" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-tr-[80px]" />
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-blue-500/30 text-white">
                <span className="text-3xl font-bold">15+</span>
                <span className="text-xs text-blue-200 text-center">лет на рынке</span>
              </div>
            </div>
          </AnimateIn>

          {/* Right - Content */}
          <AnimateIn direction="right" delay={200}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
                О компании
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Надёжный партнёр в{" "}
                <span className="text-gradient">инженерных решениях</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                ТОО «Сарыарқа Инжиниринг» — ведущая казахстанская компания,
                специализирующаяся на проектировании, монтаже и обслуживании
                инженерных систем с 2009 года.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Наша команда высококвалифицированных специалистов реализует
                проекты любой сложности в строгом соответствии с международными
                стандартами качества и требованиями заказчика.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {highlights.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <item.icon className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white font-semibold rounded-xl hover:bg-navy-800 transition-colors"
                style={{ background: "linear-gradient(135deg, #0f2057, #1e40af)" }}
              >
                Узнать больше о компании
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
