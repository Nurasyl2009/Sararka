import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { MessageSquare, CheckCircle, Mail, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRequestsPage() {
  const requests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminSidebar />
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Заявки от клиентов</h1>
          <p className="text-gray-500">Управление входящими обращениями с сайта</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requests List */}
          <div className="lg:col-span-2 space-y-4">
            {requests.map((request) => (
              <div key={request.id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all ${
                request.status === "NEW" ? "border-blue-200 shadow-blue-100" : "border-gray-100"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      request.status === "NEW" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{request.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleString("ru-RU")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                      request.status === "NEW" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      request.status === "READ" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                      "bg-green-50 text-green-700 border-green-200"
                    }`}>
                      {request.status === "NEW" ? "Новая" : request.status === "READ" ? "Прочитана" : "Отвечено"}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${request.email}`} className="hover:text-blue-600">{request.email}</a>
                  </div>
                  {request.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${request.phone}`} className="hover:text-blue-600">{request.phone}</a>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
                  {request.message}
                </div>

                <div className="mt-4 flex gap-2">
                  {request.status === "NEW" && (
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded-lg hover:bg-blue-100 transition-colors">
                      Отметить как прочитанную
                    </button>
                  )}
                  {request.status !== "REPLIED" && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 font-medium text-sm rounded-lg hover:bg-green-100 transition-colors">
                      <CheckCircle className="w-4 h-4" /> Отвечено
                    </button>
                  )}
                  <a href={`mailto:${request.email}`} className="px-4 py-2 border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors ml-auto">
                    Написать email
                  </a>
                </div>
              </div>
            ))}
            
            {requests.length === 0 && (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Нет заявок</h3>
                <p className="text-gray-500">Здесь будут отображаться заявки с сайта</p>
              </div>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Статистика заявок</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Всего заявок</span>
                  <span className="font-bold text-gray-900">{requests.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600">Новых</span>
                  <span className="font-bold text-blue-600">
                    {requests.filter((r) => r.status === "NEW").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600">В обработке (прочитаны)</span>
                  <span className="font-bold text-yellow-600">
                    {requests.filter((r) => r.status === "READ").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Отвечено</span>
                  <span className="font-bold text-green-600">
                    {requests.filter((r) => r.status === "REPLIED").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
