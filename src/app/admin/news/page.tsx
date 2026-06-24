import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";
import NewsClient from "@/components/admin/NewsClient";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminSidebar />
      <NewsClient initialNews={news.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))} />
    </>
  );
}
