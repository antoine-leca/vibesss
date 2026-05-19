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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-red-400">🚩</span> Gestion des Signalements
        </h1>
        <div className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">
          {reports.length} signalement(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-white/40 text-xs uppercase tracking-wider">
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Par</th>
              <th className="px-4 py-2 font-medium">Cible</th>
              <th className="px-4 py-2 font-medium">Raison/Détails</th>
              <th className="px-4 py-2 font-medium text-center">Statut</th>
              <th className="px-4 py-2 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-10 opacity-50">Chargement...</td></tr>
            ) : reports.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-10 opacity-50 text-sm italic">Aucun signalement en cours. Tout est propre ! ✨</td></tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="bg-white/5 hover:bg-white/10 transition-colors group">
                  <td className="px-4 py-3 text-xs opacity-70">
                    {new Date(report.report_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-sm">
                    {report.reporter_name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase text-purple-400 font-bold tracking-tighter">
                        {report.article_id ? "Article" : report.blog_id ? "Blog" : "Comment"}
                      </span>
                      <span className="text-sm truncate max-w-[150px] italic opacity-80">
                        {report.article_title || report.blog_title || report.comment_text}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{report.report_reason}</span>
                      <span className="text-xs opacity-60 italic truncate max-w-[200px]">
                        {report.description || "Pas de description"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => handleStatusChange(report.id, report.status)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                        report.status === "pending" 
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {report.status === "pending" ? "En attente" : "Traité"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => handleDeleteReport(report.id)}
                      className="p-2 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      title="Supprimer l'alerte"
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