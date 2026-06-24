"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Shield, User, X, Check, Loader2 } from "lucide-react";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
};

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "USER" as "ADMIN" | "USER",
};

export default function UsersClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const openCreate = () => {
    setEditUser(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (user: AdminUser) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      if (editUser) {
        const body: Record<string, string> = { name: form.name, email: form.email, role: form.role };
        res = await fetch(`/api/admin/users/${editUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка");
        return;
      }

      if (editUser) {
        setUsers((prev) => prev.map((u) => (u.id === editUser.id ? data.data : u)));
        showSuccess("Пользователь обновлён");
      } else {
        setUsers((prev) => [data.data, ...prev]);
        showSuccess("Пользователь создан");
      }
      setShowModal(false);
      router.refresh();
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        setDeleteConfirm(null);
        showSuccess("Пользователь удалён");
        router.refresh();
      }
    } catch {
      console.error("Failed to delete");
    }
  };

  return (
    <>
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl">
          <Check className="w-5 h-5" />
          {success}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Пользователи</h1>
          <p className="text-gray-500 text-sm">Управление сотрудниками и доступом · {users.length} пользователей</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-5 h-5" /> Добавить пользователя
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-3xl font-bold text-gray-900 mb-1">{users.length}</div>
          <div className="text-sm text-gray-500">Всего</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-3xl font-bold text-purple-600 mb-1">{users.filter((u) => u.role === "ADMIN").length}</div>
          <div className="text-sm text-gray-500">Администраторов</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-1">{users.filter((u) => u.role === "USER").length}</div>
          <div className="text-sm text-gray-500">Менеджеров</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm bg-blue-50">
          <div className="text-3xl font-bold text-blue-700 mb-1">
            {users.filter((u) => {
              const d = new Date(u.createdAt);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </div>
          <div className="text-sm text-blue-600">В этом месяце</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="responsive-table">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Пользователь</th>
                <th className="px-6 py-4">Роль</th>
                <th className="px-6 py-4">Дата регистрации</th>
                <th className="px-6 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        user.role === "ADMIN" ? "bg-purple-100" : "bg-blue-50"
                      }`}>
                        {user.role === "ADMIN" ? (
                          <Shield className="w-5 h-5 text-purple-600" />
                        ) : (
                          <User className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-gray-400 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.role === "ADMIN"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {user.role === "ADMIN" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {user.role === "ADMIN" ? "Администратор" : "Менеджер"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                    {new Date(user.createdAt).toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(user)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(user.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Удалить пользователя?</h3>
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editUser ? "Редактировать пользователя" : "Новый пользователь"}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {editUser ? "Измените данные пользователя" : "Создайте новый аккаунт"}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="user@saryarka.kz"
                />
              </div>
              {!editUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль *</label>
                  <input
                    type="password"
                    required={!editUser}
                    value={form.password}
                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Минимум 8 символов"
                    minLength={8}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Роль</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["USER", "ADMIN"] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, role }))}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                        form.role === role
                          ? role === "ADMIN"
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {role === "ADMIN" ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      {role === "ADMIN" ? "Администратор" : "Менеджер"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm">
                  Отмена
                </button>
                <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm disabled:opacity-70">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editUser ? "Сохранить" : "Создать"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
