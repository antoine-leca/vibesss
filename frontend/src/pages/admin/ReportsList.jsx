import React from "react";
import useReports from "../../hooks/admin/useReports";
import { usePagination } from "../../hooks/usePagination";
import ReportTable from "../../components/admin/Reports/ReportTable";

const ReportsList = () => {
  const { reports, isLoading, updateStatus, deleteReport } = useReports();

  // On applique ta logique de pagination simplifiée
  const { currentItems, ...pagination } = usePagination(reports, 10);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end px-2">
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
          Signalements
        </h1>
        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest text-right">
          {reports.length} alertes
        </span>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 p-2 shadow-xl">
        <ReportTable 
          reports={currentItems} // On passe les signalements découpés
          isLoading={isLoading} 
          onStatusChange={updateStatus} 
          onDelete={deleteReport}
          pagination={pagination} // On passe l'objet pagination
        />
      </div>
    </div>
  );
};

export default ReportsList;