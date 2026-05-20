/**
 * Composant atomique : StatusBadge
 * Gère uniquement l'affichage coloré du statut d'un signalement.
 */
const StatusBadge = ({ status, onClick }) => {
  const styles = {
    pending: "bg-[var(--primary-color)] text-white border-white/20",
    resolved: "bg-[var(--success-color)] text-white border-white/20",
  };

  const label = status === "pending" ? "En attente" : "Traité";

  return (
    <button
      onClick={onClick}
      style={{ fontFamily: "var(--main-font)" }} // Utilisation de ta police
      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 border-2 ${styles[status]}`}
    >
      {label}
    </button>
  );
};

export default StatusBadge;