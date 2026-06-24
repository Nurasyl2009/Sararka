"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("ContactSection");

  const contactInfo = [
    { icon: Phone, label: t("phone"), value: "+7 (717) 200-00-00", href: "tel:+77172000000" },
    { icon: Mail, label: "Email", value: "info@saryarka-eng.kz", href: "mailto:info@saryarka-eng.kz" },
    { icon: MapPin, label: t("address"), value: t("addressVal"), href: "#" },
    { icon: Clock, label: t("workingHours"), value: t("workingHoursVal"), href: "#" },
  ];

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
        setError(data.error || t("errorSend"));
      }
    } catch {
      setError(t("errorConn"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container-custom">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 border border-blue-100">
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("title1")} <span className="text-gradient">{t("title2")}</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t("desc")}
          </p>
        </AnimateIn>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <AnimateIn direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a key={item.label} href={item.href}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 group">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-gray-900 font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </AnimateIn>

          {/* Form */}
          <AnimateIn direction="right" delay={200} className="lg:col-span-3">
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("success")}</h3>
                <p className="text-gray-600 mb-6">{t("successDesc")}</p>
                <button onClick={() => setSuccess(false)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  {t("sendAgain")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("formName")}</label>
                    <input id="contact-name" type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t("formNamePl")}
                      className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("formPhone")}</label>
                    <input id="contact-phone" type="tel" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("formEmail")}</label>
                  <input id="contact-email" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    className="form-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("formMessage")}</label>
                  <textarea id="contact-message" required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t("formMessagePl")}
                    className="form-input resize-none" />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20">
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t("sending")}</>
                  ) : (
                    <><Send className="w-5 h-5" />{t("sendBtn")}</>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  {t("policy")}
                </p>
              </form>
            )}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
