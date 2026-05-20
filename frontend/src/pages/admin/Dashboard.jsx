import React from "react";
import useDashboard from "../../hooks/admin/useDashboard";
import StatCard from "../../components/admin/Dashboard/StatCard";

export default function Dashboard() {
  const { stats, activities, isLoading, isRefreshing, refresh } = useDashboard();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* 1. Les Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={stats.users} label="membres" />
        <StatCard value={stats.blogs} label="blogs" />
        <StatCard value={stats.articles} label="articles" />
        <StatCard value={stats.reports} label="reports" />
      </div>

      {/* 2. Les Activités */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
            <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]" style={{ fontFamily: "var(--main-font)" }}>
              Dernières Activités
            </h2>
            <button 
                onClick={refresh}
                className="text-[9px] font-black uppercase text-white/20 hover:text-white transition-all tracking-widest"
            >
                {isRefreshing ? '...' : 'Actualiser'}
            </button>
        </div>
        
        {/* Ici on pourra insérer un <ActivityTable /> comme on a fait pour les Users */}
      </div>
    </div>
  );
}