"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 3,
}));

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("HeroSection");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center hero-gradient overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-blue-400/20"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Glow orbs removed for performance */}

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-8"
              style={{ animation: "fadeUp 0.6s ease-out 0.1s both" }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              {t("badge")}
            </div>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ animation: "fadeUp 0.6s ease-out 0.2s both" }}
            >
              {t("heading1")}{" "}
              <span className="text-gradient">{t("heading2")}</span>{" "}
              <br />{t("heading3")}
            </h1>

            {/* Description */}
            <p
              className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl"
              style={{ animation: "fadeUp 0.6s ease-out 0.3s both" }}
            >
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 mb-12"
              style={{ animation: "fadeUp 0.6s ease-out 0.4s both" }}
            >
              <Link
                href="/projects"
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
              >
                {t("ctaProjects")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-7 py-3.5 glass border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10"
              >
                {t("ctaConsult")}
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6"
              style={{ animation: "fadeUp 0.6s ease-out 0.5s both" }}
            >
              {[
                { value: "15+", label: t("statYears") },
                { value: "200+", label: t("statProjects") },
                { value: "50+", label: t("statSpecialists") },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Engineering illustration */}
          <div
            className="relative hidden lg:flex items-center justify-center"
            style={{ animation: "fadeUp 0.6s ease-out 0.3s both" }}
          >
            {/* Main card */}
            <div className="relative w-full max-w-md">
              <div className="glass-dark rounded-2xl p-8 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-gray-400 text-sm font-mono">engineering.dashboard</span>
                </div>

                {/* Diagram elements */}
                <div className="space-y-4">
                  {[
                    { label: t("diagramDesign"), value: 92, color: "bg-blue-500" },
                    { label: t("diagramInstall"), value: 87, color: "bg-cyan-500" },
                    { label: t("diagramAutomation"), value: 79, color: "bg-indigo-500" },
                    { label: t("diagramMaintenance"), value: 95, color: "bg-blue-400" },
                  ].map((item, i) => (
                    <div key={item.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-sm">{item.label}</span>
                        <span className="text-blue-400 text-sm font-mono">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                          style={{
                            width: `${item.value}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Icon grid */}
                <div className="grid grid-cols-4 gap-3 mt-6">
                  {["⚡", "🏗️", "🤖", "🔧", "📐", "🔌", "💻", "🏭"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-lg"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-dark rounded-xl px-4 py-3 border border-blue-500/20 shadow-xl">
                <div className="text-xs text-gray-400">{t("badgeClients")}</div>
                <div className="text-lg font-bold text-gradient">98.5%</div>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-dark rounded-xl px-4 py-3 border border-blue-500/20 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-gray-300">{t("badgeWorking")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-widest">{t("scrollDown")}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
