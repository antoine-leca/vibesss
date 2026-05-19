import { useEffect, useState } from "react";

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`);
      const data = await response.json();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "resolved" : "pending";
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) fetchReports();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteReport = async (id) => {
    if (!window.confirm("Supprimer ce signalement ?")) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${id}`, {
        method: "DELETE"
      });
      if (response.ok) fetchReports();
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 text-white bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
          <span className="text-white drop-shadow-md">🚩</span> GESTION DES SIGNALEMENTS
        </h1>
        <div className="text-[10px] font-black uppercase text-white/90 bg-black/20 px-3 py-1.5 rounded-full border border-white/10 tracking-widest">
          {reports.length} ALERTE(S)
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-white/40 text-[10px] uppercase tracking-[0.2em]">
              <th className="px-4 py-2 font-black">Date</th>
              <th className="px-4 py-2 font-black">Auteur</th>
              <th className="px-4 py-2 font-black">Contenu Visé</th>
              <th className="px-4 py-2 font-black">Motif</th>
              <th className="px-4 py-2 font-black text-center">État</th>
              <th className="px-4 py-2 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-10 opacity-50 font-bold uppercase tracking-widest">Chargement...</td></tr>
            ) : reports.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-10 opacity-50 text-sm italic">Aucun signalement. Le site est safe ! ✨</td></tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group rounded-xl shadow-sm">
                  <td className="px-4 py-5 text-[10px] font-black text-white/70">
                    {new Date(report.report_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-5 font-black text-[13px] uppercase tracking-tight text-white drop-shadow-sm">
                    {report.reporter_name}
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-white font-black tracking-widest bg-black/10 w-fit px-2 py-0.5 rounded shadow-sm">
                        {report.article_id ? "Article" : report.blog_id ? "Blog" : "Commentaire"}
                      </span>
                      <span className="text-[11px] truncate max-w-[150px] italic opacity-90 font-bold text-white mt-1">
                        "{report.article_title || report.blog_title || report.comment_text}"
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 font-bold">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white drop-shadow-sm">{report.report_reason}</span>
                      <span className="text-[10px] text-white/80 italic truncate max-w-[200px] leading-tight mt-1 font-bold">
                        {report.description || "Pas de précisions"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <button 
                      onClick={() => handleStatusChange(report.id, report.status)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 border-2 ${
                        report.status === "pending" 
                          ? "bg-rose-50 text-rose-900 border-rose-300" // Rose très clair, texte très sombre
                          : "bg-emerald-50 text-emerald-900 border-emerald-300" // Menthe très clair, texte très sombre
                      }`}
                    >
                      {report.status === "pending" ? "En attente" : "Traité"}
                    </button>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button 
                      onClick={() => handleDeleteReport(report.id)}
                      className="p-2.5 text-white/40 hover:text-white hover:bg-black/20 rounded-xl transition-all inline-flex items-center justify-center bg-white/5 border border-white/10 shadow-sm"
                      title="Supprimer définitivement"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsList;