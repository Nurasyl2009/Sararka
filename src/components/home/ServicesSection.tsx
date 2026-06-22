import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ArrowRight } from "lucide-react";
import { SERVICE_DATA } from "@/types";

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            Наши услуги
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Полный спектр{" "}
            <span className="text-gradient">инженерных услуг</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            От проектирования до обслуживания — мы предоставляем комплексные
            решения для любых инженерных задач.
          </p>
        </AnimateIn>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICE_DATA.map((service, index) => (
            <AnimateIn
              key={service.slug}
              direction="up"
              delay={index * 100}
            >
              <Link href={`/services/${service.slug}`} className="group block">
                <div className="h-full p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card-hover gradient-border">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateIn className="text-center mt-12" delay={400}>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-navy-800 text-navy-800 font-semibold rounded-xl hover:bg-navy-800 hover:text-white transition-all duration-300"
            style={{ borderColor: "#0f2057", color: "#0f2057" }}
          >
            Все услуги
            <ArrowRight className="w-5 h-5" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
