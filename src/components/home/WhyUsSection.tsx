import { AnimateIn } from "@/components/ui/AnimateIn";
import { Shield, Clock, Award, Zap, Headphones, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";

const reasonsIcons = [
  { icon: Shield, color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Award, color: "text-yellow-600", bg: "bg-yellow-50" },
  { icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Headphones, color: "text-green-600", bg: "bg-green-50" },
  { icon: Leaf, color: "text-teal-600", bg: "bg-teal-50" },
];

export default function WhyUsSection() {
  const t = useTranslations("WhyUsSection");
  
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("title1")}{" "}
            <span className="text-gradient">{t("title2")}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("desc")}
          </p>
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasonsIcons.map((reason, index) => (
            <AnimateIn key={index} direction="up" delay={index * 100}>
              <div className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`w-12 h-12 ${reason.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <reason.icon className={`w-6 h-6 ${reason.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {t(`r${index + 1}t`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`r${index + 1}d`)}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
