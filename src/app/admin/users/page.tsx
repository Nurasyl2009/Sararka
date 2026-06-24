import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";
import UsersClient from "@/components/admin/UsersClient";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <>
      <AdminSidebar />
      <UsersClient
        initialUsers={users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }))}
      />
    </>
  );
}
