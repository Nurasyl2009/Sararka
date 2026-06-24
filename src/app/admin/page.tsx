import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { FolderKanban, FileText, MessageSquare, Users, TrendingUp, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projectsCount, newsCount, requestsCount, usersCount, newRequestsCount] = await Promise.all([
    prisma.project.count(),
    prisma.news.count(),
    prisma.contactRequest.count(),
    prisma.user.count(),
    prisma.contactRequest.count({ where: { status: "NEW" } }),
  ]);

  const recentRequests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const statsCards = [
    {
      title: "Проекты",
      value: projectsCount,
      icon: FolderKanban,
      color: "text-blue-600",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      href: "/admin/projects",
      change: "+2 за месяц",
    },
    {
      title: "Новости",
      value: newsCount,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      href: "/admin/news",
      change: "Последняя сегодня",
    },
    {
      title: "Все заявки",
      value: requestsCount,
      icon: MessageSquare,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      href: "/admin/requests",
      change: `${newRequestsCount} новых`,
    },
    {
      title: "Пользователи",
      value: usersCount,
      icon: Users,
      color: "text-teal-600",
      bg: "bg-teal-50",
      iconBg: "bg-teal-100",
      href: "/admin/users",
      change: "Активных",
    },
    {
      title: "Новые заявки",
      value: newRequestsCount,
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      href: "/admin/requests",
      change: "Требуют ответа",
    },
  ];

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-50 text-blue-700 border-blue-200",
    READ: "bg-yellow-50 text-yellow-700 border-yellow-200",
    REPLIED: "bg-green-50 text-green-700 border-green-200",
  };
  const statusLabels: Record<string, string> = { NEW: "Новая", READ: "Прочитана", REPLIED: "Отвечено" };
  const statusIcons: Record<string, typeof AlertCircle> = {
    NEW: AlertCircle,
    READ: Clock,
    REPLIED: CheckCircle,
  };

  return (
    <>
      <AdminSidebar />
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Дашборд</h1>
          <p className="text-gray-500 text-sm">
            Обзорная статистика · {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statsCards.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs font-semibold text-gray-500 mb-1">{stat.title}</div>
              <div className={`text-xs font-medium ${stat.color}`}>{stat.change}</div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Requests */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Последние заявки</h2>
                <p className="text-xs text-gray-400 mt-0.5">Входящие обращения с сайта</p>
              </div>
              <Link href="/admin/requests" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                Смотреть все <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentRequests.map((req) => {
                const StatusIcon = statusIcons[req.status];
                return (
                  <div key={req.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      req.status === "NEW" ? "bg-blue-100" : req.status === "READ" ? "bg-yellow-100" : "bg-green-100"
                    }`}>
                      <StatusIcon className={`w-4 h-4 ${
                        req.status === "NEW" ? "text-blue-600" : req.status === "READ" ? "text-yellow-600" : "text-green-600"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{req.name}</div>
                      <div className="text-xs text-gray-400 truncate">{req.email}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[req.status]}`}>
                        {statusLabels[req.status]}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(req.createdAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" })}
                      </span>
                    </div>
                  </div>
                );
              })}
              {recentRequests.length === 0 && (
                <div className="px-6 py-10 text-center text-gray-400 text-sm">
                  Нет заявок
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats + Recent Projects */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Быстрые действия</h3>
              <div className="space-y-2">
                {[
                  { href: "/admin/projects", icon: FolderKanban, label: "Добавить проект", color: "text-blue-600 bg-blue-50" },
                  { href: "/admin/news", icon: FileText, label: "Написать новость", color: "text-purple-600 bg-purple-50" },
                  { href: "/admin/requests", icon: MessageSquare, label: "Просмотр заявок", color: "text-emerald-600 bg-emerald-50" },
                  { href: "/admin/users", icon: Users, label: "Управление доступом", color: "text-teal-600 bg-teal-50" },
                ].map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-blue-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm">Последние проекты</h3>
                <Link href="/admin/projects" className="text-xs text-blue-600 hover:underline">Все</Link>
              </div>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <FolderKanban className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{project.title}</div>
                      <div className="text-xs text-gray-400">{project.category}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                      project.published ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}>
                      {project.published ? "✓" : "◌"}
                    </span>
                  </div>
                ))}
                {recentProjects.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">Нет проектов</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
