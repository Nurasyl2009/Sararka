"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Телефон", value: "+7 (717) 200-00-00", href: "tel:+77172000000", desc: "Пн-Пт, 9:00-18:00" },
  { icon: Mail, label: "Email", value: "info@saryarka-eng.kz", href: "mailto:info@saryarka-eng.kz", desc: "Ответим в течение часа" },
  { icon: MapPin, label: "Адрес", value: "г. Астана, ул. Кабанбай батыра, 53", href: "#", desc: "Бизнес-центр «Нурсая»" },
  { icon: Clock, label: "Режим работы", value: "Пн-Пт: 9:00 — 18:00", href: "#", desc: "Аварийная служба 24/7" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        setError(data.error || "Ошибка при отправке");
      }
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container-custom relative z-10 text-center">
            <AnimateIn>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Свяжитесь с <span className="text-gradient">нами</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-xl mx-auto">
                Расскажите о вашем проекте, и мы предложим оптимальное решение
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {contactInfo.map((item, i) => (
                <AnimateIn key={item.label} direction="up" delay={i * 80}>
                  <a href={item.href}
                    className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{item.label}</span>
                    <span className="font-semibold text-gray-900 mb-1">{item.value}</span>
                    <span className="text-xs text-gray-400">{item.desc}</span>
                  </a>
                </AnimateIn>
              ))}
            </div>

            {/* Map + Form */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Map Placeholder */}
              <AnimateIn direction="left">
                <div className="h-full min-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-navy-900 to-blue-900 relative border border-gray-100"
                  style={{ background: "linear-gradient(135deg, #0a1535, #1e40af)" }}>
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                    <div className="text-6xl mb-4">📍</div>
                    <h3 className="text-white text-xl font-bold mb-2">г. Астана</h3>
                    <p className="text-blue-300 text-sm mb-4">ул. Кабанбай батыра, 53<br/>Бизнес-центр «Нурсая»</p>
                    <a href="https://maps.google.com/?q=Астана,+Казахстан" target="_blank" rel="noopener noreferrer"
                      className="px-5 py-2.5 glass border border-blue-400/40 text-white text-sm rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                      Открыть в Google Maps
                    </a>
                  </div>
                  {/* Decorative grid dots */}
                  <div className="absolute inset-0 tech-dots opacity-40" />
                </div>
              </AnimateIn>

              {/* Form */}
              <AnimateIn direction="right" delay={200}>
                {success ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <CheckCircle className="w-20 h-20 text-green-500 mb-5" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Заявка отправлена!</h3>
                    <p className="text-gray-600 mb-8">Наш менеджер свяжется с вами в течение 30 минут в рабочее время.</p>
                    <button onClick={() => setSuccess(false)}
                      className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                      Отправить ещё одну заявку
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Оставить заявку</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                          <input id="page-contact-name" type="text" required value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Иван Иванов" className="form-input" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                          <input id="page-contact-phone" type="tel" value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+7 (717) 000-00-00" className="form-input" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input id="page-contact-email" type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="example@email.com" className="form-input" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ваше сообщение *</label>
                        <textarea id="page-contact-message" required rows={6} value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Опишите ваш проект или вопрос..." className="form-input resize-none" />
                      </div>
                      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
                      <button type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-70 shadow-lg shadow-blue-600/20">
                        {loading ? (
                          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Отправка...</>
                        ) : (
                          <><Send className="w-5 h-5" />Отправить заявку</>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </AnimateIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
