import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";
import RequestsClient from "@/components/admin/RequestsClient";

export const dynamic = "force-dynamic";

export default async function AdminRequestsPage() {
  const requests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminSidebar />
      <RequestsClient
        initialRequests={requests.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        }))}
      />
    </>
  );
}
