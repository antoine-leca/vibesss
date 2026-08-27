import React from "react";

const getActivityColor = (type) => {
  if (!type) return "#E99FB4";
  const lowerType = type.toLowerCase();

  if (
    lowerType.includes("utilisateur") ||
    lowerType.includes("user")
  ) return "#85ffae";
  if (lowerType.includes("blog")) return "#9d82ff";
  if (lowerType.includes("article")) return "#ffba7d";
  if (
    lowerType.includes("signalement") ||
    lowerType.includes("report")
  ) return "#ff7c7c";

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

export default ActivityItem;