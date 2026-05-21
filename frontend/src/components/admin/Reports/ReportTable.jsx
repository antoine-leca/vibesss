import ReportRow from "./ReportsRow"; 

/**
 * ReportTable : Structure globale du tableau des rapports.
 */
const ReportTable = ({ reports, onStatusChange, onDelete, isLoading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr 
            className="text-white/40 text-[10px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--title-font)" }}
          >
            <th className="px-4 py-2 font-black">Date</th>
            <th className="px-4 py-2 font-black">Auteur</th>
            <th className="px-4 py-2 font-black">Contenu Visé</th>
            <th className="px-4 py-2 font-black">Motif</th>
            <th className="px-4 py-2 font-black text-center">État</th>
            <th className="px-4 py-2 font-black text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center py-10 opacity-50 font-bold uppercase tracking-widest">
                Chargement...
              </td>
            </tr>
          ) : reports.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-10 opacity-50 text-sm italic">
                Aucun signalement. Tout est en ordre ! ✨
              </td>
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