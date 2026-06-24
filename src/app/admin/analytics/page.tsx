import { prisma } from "@/lib/prisma";
import AnalyticsClient from "@/components/admin/AnalyticsClient";
import AdminSidebar from "@/components/layout/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const pageViews = await prisma.pageView.findMany({
    orderBy: { timestamp: 'asc' },
    where: {
      timestamp: {
        gte: thirtyDaysAgo
      }
    }
  });

  return (
    <>
      <AdminSidebar />
      <AnalyticsClient pageViews={pageViews} />
    </>
  );
}
