"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, FolderKanban, X, Check, Eye, EyeOff, Star, Loader2 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image: string | null;
  category: string;
  technologies: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
};

const CATEGORIES = ["general", "construction", "engineering", "infrastructure", "industrial", "residential"];

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  content: "",
  image: "",
  category: "general",
  technologies: "",
  featured: false,
  published: true,
};

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
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
    setEditProject(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (project: Project) => {
    setEditProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      content: project.content || "",
      image: project.image || "",
      category: project.category,
      technologies: project.technologies.join(", "),
      featured: project.featured,
      published: project.published,
    });
    setError("");
    setShowModal(true);
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-а-яё]/gi, "")
      .replace(/--+/g, "-");
    setForm((prev) => ({ ...prev, title, ...(!editProject ? { slug } : {}) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      content: form.content || null,
      image: form.image || null,
      category: form.category,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      featured: form.featured,
      published: form.published,
    };

    try {
      let res;
      if (editProject) {
        res = await fetch(`/api/admin/projects/${editProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка");
        return;
      }

      if (editProject) {
        setProjects((prev) => prev.map((p) => (p.id === editProject.id ? data.data : p)));
        showSuccess("Проект обновлён");
      } else {
        setProjects((prev) => [data.data, ...prev]);
        showSuccess("Проект создан");
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
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirm(null);
        showSuccess("Проект удалён");
        router.refresh();
      }
    } catch {
      setError("Ошибка при удалении");
    }
  };

  const togglePublish = async (project: Project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published }),
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === project.id ? data.data : p)));
        router.refresh();
      }
    } catch {
      console.error("Toggle publish failed");
    }
  };

  return (
    <>
      {/* Success Toast */}
      {success && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl animate-slide-in">
          <Check className="w-5 h-5" />
          {success}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Проекты</h1>
          <p className="text-gray-500 text-sm">Управление портфолио проектов компании · {projects.length} проектов</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-5 h-5" /> Добавить проект
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="responsive-table">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Проект</th>
                <th className="px-6 py-4">Категория</th>
                <th className="px-6 py-4">Технологии</th>
                <th className="px-6 py-4">Статус</th>
                <th className="px-6 py-4">Дата</th>
                <th className="px-6 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <FolderKanban className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {project.title}
                          {project.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                        </div>
                        <div className="text-gray-400 text-xs mt-0.5">{project.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-50 text-gray-500">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => togglePublish(project)} className="group/btn">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                        project.published
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}>
                        {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {project.published ? "Опубликован" : "Черновик"}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-xs">
                    {new Date(project.createdAt).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(project)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(project.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <FolderKanban className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-gray-400">Проекты пока не добавлены</p>
                      <button onClick={openCreate} className="text-blue-600 text-sm font-medium hover:underline">
                        Добавить первый проект
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Удалить проект?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Это действие нельзя отменить. Проект будет удалён навсегда.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Отмена
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editProject ? "Редактировать проект" : "Новый проект"}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {editProject ? "Измените данные проекта" : "Заполните информацию о новом проекте"}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Название проекта *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Строительство объекта..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug (URL) *</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                    placeholder="my-project"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Категория</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Описание *</label>
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    placeholder="Краткое описание проекта..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Полный контент</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    placeholder="Подробное описание проекта..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ссылка на изображение</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Технологии (через запятую)</label>
                  <input
                    type="text"
                    value={form.technologies}
                    onChange={(e) => setForm((p) => ({ ...p, technologies: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Steel, Concrete, AutoCAD"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <div
                      onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
                      className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? "bg-amber-400" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-1"}`} />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Избранный</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <div
                      onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
                      className={`w-10 h-6 rounded-full transition-colors relative ${form.published ? "bg-green-500" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-1"}`} />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Опубликован</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-70"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editProject ? "Сохранить" : "Создать проект"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
