import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { useTranslations } from "next-intl";

export default function AnalyticsPage() {
  const t = useTranslations("Analytics");

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container-custom relative z-10 text-center">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
                {t("title")}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {t("title")}
              </h1>
              <p className="text-gray-300 text-lg max-w-xl mx-auto">
                {t("desc")}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <AnalyticsDashboard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
