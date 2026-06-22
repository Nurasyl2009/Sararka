import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { FolderKanban, FileText, MessageSquare, Users, TrendingUp } from "lucide-react";

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

  const statsCards = [
    { title: "Проекты", value: projectsCount, icon: FolderKanban, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Новости", value: newsCount, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Все заявки", value: requestsCount, icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
    { title: "Новые заявки", value: newRequestsCount, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Пользователи", value: usersCount, icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
  ];

  return (
    <>
      <AdminSidebar />
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Дашборд</h1>
          <p className="text-gray-500">Обзорная статистика и последние события</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {statsCards.map((stat) => (
            <div key={stat.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Последние заявки</h2>
            <a href="/admin/requests" className="text-sm text-blue-600 font-medium hover:text-blue-700">
              Смотреть все
            </a>
          </div>
          <div className="responsive-table">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Дата</th>
                  <th className="px-6 py-4">Имя</th>
                  <th className="px-6 py-4">Контакты</th>
                  <th className="px-6 py-4">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {recentRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(req.createdAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-6 py-4 font-medium">{req.name}</td>
                    <td className="px-6 py-4">
                      <div>{req.email}</div>
                      <div className="text-gray-500 text-xs">{req.phone || "—"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                        req.status === "NEW" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        req.status === "READ" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                        "bg-green-50 text-green-700 border-green-200"
                      }`}>
                        {req.status === "NEW" ? "Новая" : req.status === "READ" ? "Прочитана" : "Отвечено"}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentRequests.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Нет заявок
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
