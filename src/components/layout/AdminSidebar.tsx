"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  X,
  Settings,
  ChevronRight,
  ExternalLink,
  BarChart3,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Дашборд", icon: LayoutDashboard, exact: true },
  { href: "/admin/analytics", label: "Аналитика", icon: BarChart3, exact: false },
  { href: "/admin/projects", label: "Проекты", icon: FolderKanban, exact: false },
  { href: "/admin/news", label: "Новости", icon: FileText, exact: false },
  { href: "/admin/requests", label: "Заявки", icon: MessageSquare, exact: false },
  { href: "/admin/users", label: "Пользователи", icon: Users, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/auth/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (link: { href: string; exact: boolean }) => {
    if (link.exact) return pathname === link.href;
    return pathname.startsWith(link.href);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <span className="text-white font-bold text-base">С</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">Сарыарқа</div>
            <div className="text-blue-400 text-[10px] font-semibold tracking-widest uppercase">Инжиниринг</div>
          </div>
        </Link>
        <div className="ml-auto">
          <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-medium">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1 custom-scrollbar">
        <div className="px-3 mb-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Навигация</span>
        </div>
        {sidebarLinks.map((link) => {
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/70 rounded-r-full" />
              )}
              <link.icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  active ? "text-white" : "text-gray-500 group-hover:text-white"
                }`}
              />
              <span className="flex-1">{link.label}</span>
              {active && <ChevronRight className="w-4 h-4 text-white/60" />}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <ExternalLink className="w-5 h-5" />
          Открыть сайт
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Выйти
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-4"
        style={{ background: "linear-gradient(180deg, #060d20 0%, #0f2057 100%)" }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">С</span>
          </div>
          <span className="text-white font-bold text-sm">Сарыарқа Admin</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 admin-sidebar flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
