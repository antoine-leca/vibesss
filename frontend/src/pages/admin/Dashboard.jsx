import { useEffect, useState, useCallback } from "react";

const StatCard = ({ value, label }) => (
  <div className="bg-[#EBC3CF] p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm border border-black/5">
    <span className="text-xl font-bold text-gray-800 tracking-tight">{value}</span>
    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-tighter mt-0.5 leading-none">
      {label}
    </span>
  </div>
);

const formatTime = (dateString) => {
  if (!dateString) return "--:--";
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, blogs: 0, articles: 0, reports: 0 });
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false); 
  const itemsPerPage = 10;

  //  J'isole la fonction de chargement pour pouvoir l'appeler partout
  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        fetch("http://localhost:5000/admin/stats"),
        fetch("http://localhost:5000/admin/activities")
      ]);

      const statsData = await statsRes.json();
      const activitiesData = await activitiesRes.json();

      setStats(statsData);
      setActivities(activitiesData);
    } catch (error) {
      console.error("Erreur de récupération :", error.message);
    } finally {
      // On simule un petit délai pour que l'utilisateur voit que ça a chargé
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchData(); // 1er chargement

    //  Timer auto(1 heure = 3600000 ms)
    const interval = setInterval(() => {
      console.log("Actualisation automatique...");
      fetchData();
    }, 3600000);

    return () => clearInterval(interval); 
  }, [fetchData]);

  // Logique de pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <StatCard value={stats.users} label="utilisateurs" />
        <StatCard value={stats.blogs} label="blogs" />
        <StatCard value={stats.articles} label="articles" />
        <StatCard value={stats.reports} label="reports" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.2em] opacity-50">
            Dernières utilisations
          </h2>
          
          {/* Bouton d'actualisation manuelle */}
          <button 
            onClick={fetchData}
            disabled={isRefreshing}
            className={`text-[10px] font-bold uppercase tracking-widest transition-all ${isRefreshing ? 'opacity-30 cursor-wait' : 'hover:text-[#EBC3CF]'}`}
          >
            {isRefreshing ? 'Chargement...' : '↻ Actualiser'}
          </button>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-lg">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-white/20 text-gray-700 bg-white/10 uppercase text-[10px] tracking-wider">
                <th className="py-2 px-3 w-12 font-bold">ID</th>
                <th className="py-2 px-3 font-bold">Type</th>
                <th className="py-2 px-3 text-right font-bold">Heure</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 font-medium">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                    <td className="py-2 px-3 opacity-40">{item.id}</td>
                    <td className="py-2 px-3 tracking-tight">{item.type}</td>
                    <td className="py-2 px-3 text-right opacity-60 tabular-nums">
                      {formatTime(item.time)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-10 text-center opacity-30 italic">Aucune activité récente</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 disabled:opacity-30 hover:bg-black/5 rounded-full transition-colors font-bold"
            >
              ←
            </button>
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              Page {currentPage} / {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 disabled:opacity-30 hover:bg-black/5 rounded-full transition-colors font-bold"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}