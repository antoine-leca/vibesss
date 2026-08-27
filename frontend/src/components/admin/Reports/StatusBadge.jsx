
const StatusBadge = ({ status, onClick }) => {
  const styleMap = {
    active: { // Traité
      backgroundColor: "var(--success-color)", color: "#1f2937", borderColor: "var(--success-color)"
    },
    inactive: { // Rejeté
      backgroundColor: "var(--primary-color)", color: "#1f2937", borderColor: "var(--primary-color)"
    },
    pending: { // En attente
      backgroundColor: "var(--secondary-color)", color: "#1f2937", borderColor: "var(--secondary-color)"
    }
  };

  const labelMap = {
    active: "Traité",
    inactive: "Rejeté",
    pending: "En attente"
  };

  const currentStatus = status || "pending";

  return (
    <button
      type="button"
      onClick={onClick}
      title="Changer le statut"
      aria-label={`Changer le statut: ${labelMap[currentStatus]}`}
      style={{
        backgroundColor: styleMap[currentStatus]?.backgroundColor,
        color: styleMap[currentStatus]?.color,
        borderColor: styleMap[currentStatus]?.borderColor,
      }}
      className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border-2 hover:brightness-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
    >
      {labelMap[currentStatus]}
    </button>
  );
};

export default StatusBadge;