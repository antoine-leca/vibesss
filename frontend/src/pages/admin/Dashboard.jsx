import React from "react";
import useDashboard from "../../hooks/admin/useDashboard";
import StatCard from "../../components/admin/Dashboard/StatCard";
import ActivityTable from "../../components/admin/Dashboard/ActivityTable";
import { usePagination } from "../../hooks/usePagination";

export default function Dashboard() {
  const { stats, activities, isRefreshing, refresh } = useDashboard();
  
  // On découpe la grosse liste reçue ici
  const { currentItems, ...pagination } = usePagination(activities, 10);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <StatCard value={stats.users} label="utilisateurs" />
        <StatCard value={stats.blogs} label="blogs" />
        <StatCard value={stats.articles} label="articles" />
        <StatCard value={stats.reports} label="signalements" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[11px] font-bold text-gray-800 uppercase tracking-tight opacity-70">
            Dernières utilisations
          </h2>
          <button onClick={refresh} className="text-[10px] font-bold uppercase text-gray-400 hover:text-gray-800 transition-colors">
            {isRefreshing ? '...' : 'Refresh'}
          </button>
        </div>
        
        {/* On appelle juste le composant maintenant */}
        <ActivityTable activities={currentItems} pagination={pagination} />
      </div>
    </div>
  );
}