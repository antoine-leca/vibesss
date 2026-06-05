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
    pending: {
      backgroundColor: "#fef9c3",
      color: "#854d0e",
      borderColor: "#fef08a",
    },
  };

  const labelMap = {
    resolved: "Traité",
    rejected: "Rejeté",
    pending: "En attente",
  };

  const currentStatus = status || "pending";

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: styleMap[currentStatus]?.backgroundColor,
        color: styleMap[currentStatus]?.color,
        borderColor: styleMap[currentStatus]?.borderColor,
      }}
      className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border-2"
    >
      {labelMap[currentStatus]}
    </button>
  );
};

export default StatusBadge;