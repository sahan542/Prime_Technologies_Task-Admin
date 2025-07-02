'use client';

import OrderDispatchChart from "@/components/dash-charts/OrderDispatchChart";
import PendingOrdersCard from "@/components/dash-charts/PendingOrdersCard";
import RevenueOverviewChart from "@/components/dash-charts/RevenueOverviewChart";
import SalesOverviewChart from "@/components/dash-charts/SalesOverviewChart";
import StockLevelsChart from "@/components/dash-charts/StockLevelsChart";
import TopSellingProductsChart from "@/components/dash-charts/TopSellingProductsChart";

export default function Home() {
  return (
    <div className="dashboard-container overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">Admin Dashboard</h2>
      <div className="dashboard-grid hide-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[80vh]">
        {/* Sales Overview Chart */}
        <div className="dashboard-card">
          <SalesOverviewChart />
        </div>

        {/* Order Dispatch Status */}
        <div className="dashboard-card">
          <OrderDispatchChart />
        </div>

        {/* Revenue Overview */}
        <div className="dashboard-card">
          <RevenueOverviewChart />
        </div>

        {/* Top Selling Products */}
        <div className="dashboard-card">
          <TopSellingProductsChart />
        </div>

        {/* Pending Orders */}
        <div className="dashboard-card">
          <PendingOrdersCard />
        </div>

        {/* Stock Levels */}
        <div className="dashboard-card">
          <StockLevelsChart />
        </div>
      </div>
    </div>
  );
}
