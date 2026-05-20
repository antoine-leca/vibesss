import StatusBadge from "./StatusBadge";

/**
 * ReportRow : Gère l'affichage d'une seule ligne du tableau.
 * On utilise les variables du root.css pour le style.
 */
const ReportRow = ({ report, onStatusChange, onDelete }) => {
  const dateStr = new Date(report.report_date).toLocaleDateString();

  return (
    <tr className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group rounded-xl shadow-sm">
      {/* Date du signalement */}
      <td className="px-4 py-5 text-[10px] font-black text-white/70" style={{ fontFamily: "var(--main-font)" }}>
        {dateStr}
      </td>

      {/* Qui a fait le signalement */}
      <td className="px-4 py-5 font-black text-[13px] uppercase tracking-tight text-white drop-shadow-sm" style={{ fontFamily: "var(--main-font)" }}>
        {report.reporter_name}
      </td>

      {/* Le contenu visé (ex: Article "Titre...") */}
      <td className="px-4 py-5">
        <div className="flex flex-col">
          <span 
            className="text-[10px] uppercase text-white font-black tracking-widest w-fit px-2 py-0.5 rounded shadow-sm"
            style={{ backgroundColor: "var(--secondary-color)" }}
          >
            {report.article_id ? "Article" : report.blog_id ? "Blog" : "Commentaire"}
          </span>
          <span className="text-[11px] truncate max-w-[150px] italic opacity-90 font-bold text-white mt-1" style={{ fontFamily: "var(--main-font-italic)" }}>
            "{report.article_title || report.blog_title || report.comment_text}"
          </span>
        </div>
      </td>

      {/* Le motif du signalement */}
      <td className="px-4 py-5 font-bold">
        <div className="flex flex-col">
          <span className="text-xs font-black text-white drop-shadow-sm" style={{ fontFamily: "var(--main-font)" }}>
            {report.report_reason}
          </span>
          <span className="text-[10px] text-white/80 italic truncate max-w-[200px] leading-tight mt-1 font-bold">
            {report.description || "Pas de précisions"}
          </span>
        </div>
      </td>

      {/* Interface de changement de statut */}
      <td className="px-4 py-5 text-center">
        <StatusBadge 
          status={report.status} 
          onClick={() => onStatusChange(report.id, report.status)} 
        />
      </td>

      {/* Bouton de suppression de l'alerte */}
      <td className="px-4 py-5 text-right">
        <button 
          onClick={() => onDelete(report.id)}
          className="p-2.5 text-white/40 hover:text-white hover:bg-black/20 rounded-xl transition-all inline-flex items-center justify-center bg-white/5 border border-white/10 shadow-sm"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default ReportRow;