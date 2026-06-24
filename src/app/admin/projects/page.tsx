import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";
import ProjectsClient from "@/components/admin/ProjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminSidebar />
      <ProjectsClient initialProjects={projects.map((p) => ({ ...p, createdAt: p.createdAt.toISOString() }))} />
    </>
  );
}
