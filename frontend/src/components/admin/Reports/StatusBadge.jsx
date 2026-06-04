/**
 * Composant atomique : StatusBadge
 * Gère uniquement l'affichage coloré du statut d'un signalement.
 */
const StatusBadge = ({ status, onClick }) => {
  const styleMap = {
    resolved: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      borderColor: "#86efac",
    },
    rejected: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      borderColor: "#fecaca",
    },
  };

  const labelMap = {
    resolved: "Traité",
    rejected: "Rejeté",
  };

  const label = labelMap[status] || "En attente";

  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--main-font)",
        backgroundColor: styleMap[status]?.backgroundColor,
        color: styleMap[status]?.color,
        borderColor: styleMap[status]?.borderColor,
      }}
      className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border-2"
    >
      {label}
    </button>
  );
};

export default StatusBadge;