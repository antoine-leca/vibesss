import React from "react";
import ReportRow from "./ReportsRow"; 

const ReportTable = ({ reports, onStatusChange, onDelete, isLoading, pagination }) => {
  if (isLoading) {
    return <div className="p-8 text-center text-[11px] italic text-gray-400">Chargement...</div>;
  }

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="border-b-2 border-white/40 bg-white/20 text-gray-700 uppercase font-black tracking-wider">
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4">Auteur</th>
              <th className="py-2.5 px-4">Contenu Visé</th>
              <th className="py-2.5 px-4">Motif</th>
              <th className="py-2.5 px-4 text-center">État</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportRow 
                  key={report.id} 
                  report={report} 
                  onStatusChange={onStatusChange} 
                  onDelete={onDelete} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-400 opacity-50 italic">Aucun signalement</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Style cohérent avec UserTable */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-2 border-t-2 border-white/40">
          <button
            onClick={pagination.prevPage}
            disabled={pagination.currentPage === 1}
            className="p-1 px-3 disabled:opacity-20 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black text-sm"
          >
            ←
          </button>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            Page {pagination.currentPage} / {pagination.totalPages}
          </span>
          <button
            onClick={pagination.nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-1 px-3 disabled:opacity-20 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black text-sm"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportTable;