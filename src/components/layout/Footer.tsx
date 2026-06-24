import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, Share2, AtSign, Briefcase, Play } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  const services = [
    { label: t("s1"), href: "/services/engineering-design" },
    { label: t("s2"), href: "/services/electrical-installation" },
    { label: t("s3"), href: "/services/automation" },
    { label: t("s4"), href: "/services/maintenance" },
  ];

  const quickLinks = [
    { label: t("l1"), href: "/about" },
    { label: t("l2"), href: "/projects" },
    { label: t("l3"), href: "/news" },
    { label: t("l4"), href: "/contact" },
    { label: t("l5"), href: "/admin" },
  ];

  const contacts = [
    { icon: Phone, text: "+7 (717) 200-00-00", href: "tel:+77172000000" },
    { icon: Mail, text: "info@saryarka-eng.kz", href: "mailto:info@saryarka-eng.kz" },
    { icon: MapPin, text: t("address"), href: "#" },
    { icon: Clock, text: t("hours"), href: "#" },
  ];

  const socials = [
    { icon: Share2, href: "#", label: "Facebook" },
    { icon: AtSign, href: "#", label: "Instagram" },
    { icon: Briefcase, href: "#", label: "LinkedIn" },
    { icon: Play, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-navy-900 to-navy-950 text-white"
      style={{ background: "linear-gradient(to bottom, #0a1535, #060d20)" }}>
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">С</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">Сарыарқа</div>
                <div className="text-blue-400 text-xs font-medium tracking-wider uppercase">Инжиниринг</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t("description")}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t("servicesTitle")}</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t("links")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t("contacts")}</h3>
            <ul className="space-y-4">
              {contacts.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="flex items-start gap-3 text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 group"
                  >
                    <contact.icon className="w-4 h-4 mt-0.5 shrink-0 text-blue-500 group-hover:text-blue-400" />
                    <span>{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Сарыарқа Инжиниринг. {t("rights")}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">{t("privacy")}</a>
            <a href="#" className="hover:text-gray-300 transition-colors">{t("terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
