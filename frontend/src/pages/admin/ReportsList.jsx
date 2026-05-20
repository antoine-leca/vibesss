import useReports from "../../hooks/admin/useReports";
import ReportTable from "../../components/admin/Reports/ReportTable";

const ReportsList = () => {
  // On récupère tout ce dont on a besoin depuis notre Hook personnalisé
  const { reports, isLoading, updateStatus, deleteReport } = useReports();

  return (
    <div className="p-4 sm:p-6 text-white bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
      {/* En-tête de la page */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h1 
          className="text-2xl font-black flex items-center gap-3 tracking-tighter" 
          style={{ fontFamily: "var(--title-font)" }}
        >
          <span className="text-white drop-shadow-md">🚩</span> GESTION DES SIGNALEMENTS
        </h1>
        
        <div className="text-[10px] font-black uppercase text-white/90 bg-black/20 px-3 py-1.5 rounded-full border border-white/10 tracking-widest">
          {reports.length} ALERTE(S)
        </div>
      </div>

      {/* On passe les données et les fonctions au tableau spécialisé */}
      <ReportTable 
        reports={reports} 
        isLoading={isLoading} 
        onStatusChange={updateStatus} 
        onDelete={deleteReport} 
      />
    </div>
  );
};

export default ReportsList;