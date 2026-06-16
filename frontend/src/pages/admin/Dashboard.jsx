import React from "react";
import useDashboard from "../../hooks/admin/useDashboard";
import { usePagination } from "../../hooks/usePagination";
import StatCard from "../../components/admin/Dashboard/StatCard";
import ActivityTable from "../../components/admin/Dashboard/ActivityTable";

export default function Dashboard() {
  const { stats, activities, isRefreshing, refresh } = useDashboard();
  const { currentItems, ...pagination } = usePagination(activities, 10);

  return (
    <div className="max-w-3xl mx-auto space-y-4">

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mx-auto">
        <StatCard value={stats.users}    label="Utilisateurs" bg="#d7f8e2" />
        <StatCard value={stats.blogs}    label="Blogs"        bg="#ddd6f7" />
        <StatCard value={stats.articles} label="Articles"     bg="#fde8d6" />
        <StatCard value={stats.reports}  label="Signalements" bg="#f8d7e3" />
      </div>

      {/* Activity panel */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[10px] font-black text-gray-700 uppercase tracking-[.14em] opacity-70">
            Dernières activités
          </h2>
          <button
            onClick={refresh}
            className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors"
          >
            {isRefreshing ? "..." : "Refresh"}
          </button>
        </div>

        <ActivityTable currentItems={currentItems} pagination={pagination} />
      </div>
    </div>
  );
}