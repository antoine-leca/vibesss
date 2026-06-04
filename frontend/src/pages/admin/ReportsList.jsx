import React, { useMemo } from "react";
import useReports from "../../hooks/admin/useReports";
import { usePagination } from "../../hooks/usePagination";
import ReportTable from "../../components/admin/Reports/ReportTable";

const sortReportsByDate = (a, b) => {
  const timeA = a.report_date ? new Date(a.report_date).getTime() : 0;
  const timeB = b.report_date ? new Date(b.report_date).getTime() : 0;
  return timeB - timeA;
};

const ReportsList = () => {
  const { reports, isLoading, updateStatus, deleteReport, refresh } = useReports();
  const sortedReports = useMemo(() => [...reports].sort(sortReportsByDate), [reports]);

  // On applique la même logique de pagination que pour les membres
  const { currentItems, ...pagination } = usePagination(sortedReports, 10);

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <div className="flex justify-between items-end px-1">
        <div>
          <h2 
            className="text-[10px] font-black text-gray-700/40 uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--main-font)" }}
          >
            Administration
          </h2>
          <h1 
            className="text-2xl font-black text-gray-800 uppercase tracking-tighter"
            style={{ fontFamily: "var(--main-font)" }}
          >
            Signalements
          </h1>
        </div>

        <div className="text-right">
          <button 
            onClick={refresh}
            disabled={isLoading}
            className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-700 transition-colors tracking-widest"
            style={{ fontFamily: "var(--main-font)" }}
          >
            {isLoading ? "..." : "Actualiser"}
          </button>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-1">
            {reports.length} alertes
          </div>
        </div>
      </div>

      {/* Table Container - style cohérent avec UsersList */}
      <div className="bg-white/55 backdrop-blur-md rounded-2xl border-2 border-white/70 overflow-hidden shadow-lg">
        <ReportTable 
          reports={currentItems}
          isLoading={isLoading} 
          onStatusChange={updateStatus} 
          onDelete={deleteReport}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default ReportsList;