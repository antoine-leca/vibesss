import { Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import StatusBadge from "./StatusBadge";

const ReportRow = ({ report, onStatusChange, onDelete }) => {
  const navigate = useNavigate();
  
  
  const handleViewContent = () => {
   
    if (report.article_id && report.blog_id) {
      navigate(`/blogs/${report.blog_id}`); 
    } 
    // Si c'est un blog
    else if (report.blog_id) {
      navigate(`/blogs/${report.blog_id}`);
    } 
    // Cas de secours pour éviter le "null"
    else {
      alert("Détails du contenu non disponibles pour ce type de signalement.");
    }
  };

  return (
    <tr className="border-b border-white/20 hover:bg-white/10 transition-colors">
       {/* Date du signalement */}
      <td className="py-2.5 px-4 text-[10px] font-black text-gray-600" style={{ fontFamily: "var(--main-font)" }}>
        {/* CORRECTION 1 : Ajout de l'accolade fermante } */}
        {new Date(report.report_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
      </td>

      {/* Qui a fait le signalement */}
      <td className="py-2.5 px-4 font-bold text-[12px] uppercase tracking-tight text-gray-800" style={{ fontFamily: "var(--main-font)" }}>
        {report.reporter_name}
      </td>

      {/* Le contenu visé (ex: Article "Titre...") */}
      <td className="py-2.5 px-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col flex-1">
            <span className="text-[10px] uppercase text-gray-700 font-black tracking-widest w-fit px-2 py-0.5 rounded shadow-sm"
              style={{ backgroundColor: "var(--secondary-color)" }}
            >
              {report.article_id ? "Article" : report.blog_id ? "Blog" : "Commentaire"}
            </span>
            <span className="text-[11px] truncate max-w-[120px] italic opacity-90 font-bold text-gray-800 mt-1" style={{ fontFamily: "var(--main-font-italic)" }}>
              "{report.article_title || report.blog_title || report.comment_text}"
            </span>
          </div>
          
          {/* Bouton pour aller voir le contenu */}
          <button 
            onClick={handleViewContent}
            className="p-1 hover:bg-white/20 rounded text-blue-500"
            title="Voir le contenu"
          >
            <ExternalLink size={14} />
          </button>
        </div> 
      </td>

      {/* Le motif du signalement */}
      <td className="py-2.5 px-4 font-bold">
        <div className="flex flex-col">
          <span className="text-xs font-black text-gray-800 uppercase" style={{ fontFamily: "var(--main-font)" }}>
            {report.report_reason?.toUpperCase?.() || "AUTRE"}
          </span>
          <span className="text-[10px] text-gray-600 italic truncate max-w-[200px] leading-tight mt-1 font-bold">
            {report.description || "Pas de précisions"}
          </span>
        </div>
      </td>

      {/* Interface de changement de statut */}
      <td className="py-2.5 px-4 text-center">
        <StatusBadge 
          status={report.status} 
          onClick={() => onStatusChange(report.id, report.status)} 
        />
      </td>

      {/* Bouton de suppression de l'alerte */}
      <td className="py-2.5 px-7 text-right">
         {/* Suppression du signalement */}
         <button onClick={() => onDelete(report.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition-all text-red-600 opacity-70 hover:opacity-100 disabled:opacity-30"
          title="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
};

export default ReportRow;