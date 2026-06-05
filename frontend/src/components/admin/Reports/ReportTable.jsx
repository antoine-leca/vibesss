import ReportRow from "./ReportsRow"; 

/**
 * ReportTable : Structure globale du tableau des rapports.
 */
const ReportTable = ({ reports, onStatusChange, onDelete, isLoading }) => {
  return (
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
          {isLoading ? (
            <tr>
              <td colSpan="6" className="py-8 text-center text-[11px] italic text-gray-400">Chargement...</td>
            </tr>
          ) : reports.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-8 text-center text-gray-400 opacity-50 italic">Aucun signalement</td>
            </tr>
          ) : (
            reports.map((report) => (
              <ReportRow 
                key={report.id} 
                report={report} 
                onStatusChange={onStatusChange} 
                onDelete={onDelete} 
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;