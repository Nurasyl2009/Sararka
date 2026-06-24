"use client";

import { useTranslations } from "next-intl";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function AnalyticsDashboard() {
  const t = useTranslations("Analytics");

  const visitorData = [
    { name: t("jan"), visits: 4000 },
    { name: t("feb"), visits: 3000 },
    { name: t("mar"), visits: 5000 },
    { name: t("apr"), visits: 4500 },
    { name: t("may"), visits: 6000 },
    { name: t("jun"), visits: 5500 },
  ];

  const projectViewData = [
    { name: t("p1"), views: 2400 },
    { name: t("p2"), views: 1398 },
    { name: t("p3"), views: 9800 },
    { name: t("p4"), views: 3908 },
    { name: t("p5"), views: 4800 },
    { name: t("p6"), views: 3800 },
  ];

  return (
    <div className="space-y-12">
      {/* Visitors Chart */}
      <AnimateIn>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("visitors")}</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visitorData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  name={t("visits")} 
                  stroke="#2563EB" 
                  strokeWidth={3}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AnimateIn>

      {/* Project Views Chart */}
      <AnimateIn direction="up" delay={200}>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("projectViews")}</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectViewData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#F3F4F6' }}
                />
                <Legend />
                <Bar 
                  dataKey="views" 
                  name={t("views")} 
                  fill="#8B5CF6" 
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
