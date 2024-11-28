'use client';

import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { RecentOrders } from '@/components/dashboard/recent-orders';
import { TopProducts } from '@/components/dashboard/top-products';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <QuickActions />
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart />
        <TopProducts />
      </div>

      <RecentOrders />
    </div>
  );
}
