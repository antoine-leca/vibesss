import React from "react";
import useDashboard from "../../hooks/admin/useDashboard";
import { usePagination } from "../../hooks/usePagination";

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ value, label, icon, bg }) => (
  <div
    className="rounded-2xl p-4 flex flex-col items-center justify-center text-center border-2 border-white/50"
    style={{ background: bg }}
  >
    <span className="text-2xl mb-1 opacity-60">{icon}</span>
    <span className="text-2xl font-black text-gray-800 leading-none tracking-tight">{value}</span>
    <span className="text-[9px] font-black text-gray-500 uppercase tracking-[.12em] mt-1">{label}</span>
  </div>
);

// ── Activity Item ──────────────────────────────────────────────────────────
const getActivityColor = (type) => {
  if (!type) return "#E99FB4";
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes("utilisateur") || lowerType.includes("user")) return "#85ffae";
  if (lowerType.includes("blog")) return "#9d82ff";
  if (lowerType.includes("article")) return "#ffba7d";
  if (lowerType.includes("signalement") || lowerType.includes("report")) return "#ff7c7c";
  
  return "#E99FB4";
};

const formatTime = (dateString) => {
  if (!dateString) return "--:--";
  return new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ActivityItem = ({ item, index, currentPage }) => (
  <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/40 transition-colors border-b border-white/20 last:border-b-0">
    <span className="text-[9px] font-black text-gray-400 w-4 text-right">
      {(currentPage - 1) * 10 + index + 1}
    </span>
    <span
      className="w-3 h-3 rounded-full flex-shrink-0"
      style={{ background: getActivityColor(item.type) }}
    />
    <span className="flex-1 text-[12px] font-bold text-gray-800">
      {item.type || "Activité"}
    </span>
    <span className="text-[10px] font-semibold text-gray-400 tabular-nums">
      {formatTime(item.time)}
    </span>
  </div>
);

// ── Pagination ─────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, prevPage, nextPage }) =>
  totalPages > 1 ? (
    <div className="flex justify-center items-center gap-4 py-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="p-1 px-3 disabled:opacity-0 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black"
      >
        ←
      </button>
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="p-1 px-3 disabled:opacity-0 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black"
      >
        →
      </button>
    </div>
  ) : null;

// ── Dashboard ──────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { stats, activities, isRefreshing, refresh } = useDashboard();
  const { currentItems, ...pagination } = usePagination(activities, 10);

  return (
    <div className="max-w-3xl mx-auto space-y-4">

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-3 mx-auto">
        <StatCard value={stats.users}   label="Utilisateurs" bg="#d7f8e2" />
        <StatCard value={stats.blogs}   label="Blogs"        bg="#ddd6f7" />
        <StatCard value={stats.articles}label="Articles"     bg="#fde8d6" />
        <StatCard value={stats.reports} label="Signalements" bg="#f8d7e3" />
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

        <div className="bg-white/55 backdrop-blur-md rounded-2xl border-2 border-white/70 overflow-hidden max-h-96">
          {currentItems.length > 0 ? (
            <div className="py-2 max-h-90 overflow-hidden">
              {currentItems.map((item, index) => (
                <ActivityItem
                  key={index}
                  item={item}
                  index={index}
                  currentPage={pagination.currentPage}
                />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-[11px] italic text-gray-400 opacity-60">
              Aucune activité récente
            </p>
          )}
        </div>

        <Pagination {...pagination} />
      </div>
    </div>
  );
}