import React from 'react';

const formatTime = (dateString) => {
  if (!dateString) return "--:--";
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const ActivityRow = ({ item, index, currentPage }) => (
  <tr className="border-b border-white/10 hover:bg-white/10 transition-colors">
    <td className="py-2 px-3 text-center opacity-40 text-[11px]">
      {(currentPage - 1) * 10 + index + 1}
    </td>
    <td className="py-2 px-3 text-center tracking-tight text-gray-800">
      {item.type || "Activité"}
    </td>
    <td className="py-2 px-3 text-right opacity-60 tabular-nums text-gray-700">
      {formatTime(item.time)}
    </td>
  </tr>
);

export default ActivityRow;