"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, CheckCircle, Mail, Phone, Trash2, X, Clock, Check } from "lucide-react";

type ContactRequest = {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  message: string;
  status: "NEW" | "READ" | "REPLIED";
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = { NEW: "Новая", READ: "Прочитана", REPLIED: "Отвечено" };
const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  READ: "bg-yellow-50 text-yellow-700 border-yellow-200",
  REPLIED: "bg-green-50 text-green-700 border-green-200",
};

export default function RequestsClient({ initialRequests }: { initialRequests: ContactRequest[] }) {
  const router = useRouter();
  const [requests, setRequests] = useState<ContactRequest[]>(initialRequests);
  const [selected, setSelected] = useState<ContactRequest | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState<"ALL" | "NEW" | "READ" | "REPLIED">("ALL");

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: data.data.status } : r)));
        if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status: data.data.status } : null);
        showSuccess("Статус обновлён");
        router.refresh();
      }
    } catch {
      console.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        setDeleteConfirm(null);
        if (selected?.id === id) setSelected(null);
        showSuccess("Заявка удалена");
        router.refresh();
      }
    } catch {
      console.error("Failed to delete");
    }
  };

  const filtered = filter === "ALL" ? requests : requests.filter((r) => r.status === filter);
  const counts = {
    ALL: requests.length,
    NEW: requests.filter((r) => r.status === "NEW").length,
    READ: requests.filter((r) => r.status === "READ").length,
    REPLIED: requests.filter((r) => r.status === "REPLIED").length,
  };

  return (
    <>
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl">
          <Check className="w-5 h-5" />
          {success}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Заявки от клиентов</h1>
        <p className="text-gray-500 text-sm">Управление входящими обращениями с сайта</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["ALL", "NEW", "READ", "REPLIED"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === tab
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {tab === "ALL" ? "Все" : STATUS_LABELS[tab]}
            <span className={`ml-2 text-xs font-bold ${filter === tab ? "text-blue-200" : "text-gray-400"}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((request) => (
            <div
              key={request.id}
              onClick={() => setSelected(request)}
              className={`bg-white p-5 rounded-2xl shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                selected?.id === request.id
                  ? "border-blue-400 shadow-blue-100"
                  : request.status === "NEW"
                  ? "border-blue-200 shadow-blue-50"
                  : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    request.status === "NEW" ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    <MessageSquare className={`w-5 h-5 ${request.status === "NEW" ? "text-blue-600" : "text-gray-500"}`} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{request.name}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(request.createdAt).toLocaleString("ru-RU", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${STATUS_COLORS[request.status]}`}>
                  {STATUS_LABELS[request.status]}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{request.email}</span>
                {request.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{request.phone}</span>}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{request.message}</p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Нет заявок</h3>
              <p className="text-gray-400 text-sm">
                {filter !== "ALL" ? `Нет заявок со статусом "${STATUS_LABELS[filter]}"` : "Заявок пока нет"}
              </p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Детали заявки</h3>
                <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Клиент</div>
                  <div className="font-bold text-gray-900">{selected.name}</div>
                </div>

                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Контакты</div>
                  <div className="space-y-1">
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      <Mail className="w-4 h-4" />{selected.email}
                    </a>
                    {selected.phone && (
                      <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                        <Phone className="w-4 h-4" />{selected.phone}
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Дата</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {new Date(selected.createdAt).toLocaleString("ru-RU")}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Статус</div>
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium border ${STATUS_COLORS[selected.status]}`}>
                    {STATUS_LABELS[selected.status]}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Сообщение</div>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
                    {selected.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  {selected.status === "NEW" && (
                    <button
                      onClick={() => updateStatus(selected.id, "READ")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-50 text-yellow-700 font-medium text-sm rounded-xl hover:bg-yellow-100 transition-colors border border-yellow-200"
                    >
                      <MessageSquare className="w-4 h-4" /> Отметить прочитанной
                    </button>
                  )}
                  {selected.status !== "REPLIED" && (
                    <button
                      onClick={() => updateStatus(selected.id, "REPLIED")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 font-medium text-sm rounded-xl hover:bg-green-100 transition-colors border border-green-200"
                    >
                      <CheckCircle className="w-4 h-4" /> Отметить как отвечено
                    </button>
                  )}
                  <a
                    href={`mailto:${selected.email}?subject=Ответ на ваш запрос`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Написать email
                  </a>
                  <button
                    onClick={() => setDeleteConfirm(selected.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 font-medium text-sm rounded-xl hover:bg-red-50 transition-colors border border-red-100"
                  >
                    <Trash2 className="w-4 h-4" /> Удалить заявку
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">Выберите заявку для просмотра деталей</p>
            </div>
          )}

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mt-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Статистика</h3>
            <div className="space-y-3">
              {[
                { label: "Всего заявок", value: counts.ALL, color: "text-gray-900" },
                { label: "Новых", value: counts.NEW, color: "text-blue-600" },
                { label: "Прочитано", value: counts.READ, color: "text-yellow-600" },
                { label: "Отвечено", value: counts.REPLIED, color: "text-green-600" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Удалить заявку?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
                Отмена
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium">
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
