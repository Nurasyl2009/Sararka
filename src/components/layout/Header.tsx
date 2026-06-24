"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  
  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    {
      href: "/services",
      label: t("services"),
      children: [
        { href: "/services/engineering-design", label: t("sDesign") },
        { href: "/services/electrical-installation", label: t("sElectric") },
        { href: "/services/automation", label: t("sAutomation") },
        { href: "/services/maintenance", label: t("sMaintenance") },
      ],
    },
    { href: "/projects", label: t("projects") },
    { href: "/news", label: t("news") },
    { href: "/analytics", label: t("analytics") },
    { href: "/contact", label: t("contact") },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-lg">С</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">
                Сарыарқа
              </div>
              <div className="text-blue-400 text-xs font-medium tracking-wider uppercase">
                Инжиниринг
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.children ? (
                  <div className="relative">
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive(link.href)
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {servicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 glass-dark rounded-xl shadow-xl border border-blue-500/20 py-2 z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setServicesOpen(false)}
                            className={`flex items-center px-4 py-2.5 text-sm transition-all duration-200 ${
                              isActive(child.href)
                                ? "text-blue-400 bg-blue-500/10"
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`inline-block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap animated-link ${
                      isActive(link.href)
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button & Language */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg text-sm transition-all duration-200 glow-blue shadow-lg whitespace-nowrap"
            >
              {t("request")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden glass-dark rounded-xl mb-4 py-4 border border-blue-500/20">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 border-l border-blue-500/20 ml-6">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-6 pt-4 border-t border-white/10 mt-2 space-y-4">
              <LanguageSwitcher />
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg text-sm"
              >
                {t("request")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
