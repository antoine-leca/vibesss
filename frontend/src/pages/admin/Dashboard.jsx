const StatCard = ({ value, label }) => (
  // Padding réduit (p-3) et texte miniaturisé
  <div className="bg-[#EBC3CF] p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm border border-black/5">
    <span className="text-xl font-bold text-gray-800 tracking-tight">{value}</span>
    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-tighter mt-0.5 leading-none">
      {label}
    </span>
  </div>
);

export default function Dashboard() {
  const activities = [
    { id: 1, type: "Honore elegit", time: "17:00" },
    { id: 2, type: "Honore elegit", time: "17:00" },
    { id: 3, type: "Honore elegit", time: "17:00" },
    { id: 4, type: "Honore elegit", time: "17:00" },
    { id: 5, type: "Honore elegit", time: "17:00" },
  ];

  return (
    // On force une largeur maximale contenue (max-w-3xl)
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Grille de stats très compacte (gap-2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <StatCard value="50" label="utilisateurs" />
        <StatCard value="50" label="blogs" />
        <StatCard value="83" label="articles" />
        <StatCard value="10" label="reports" />
      </div>

      {/* Tableau Glassmorphism désaturé et plus fin */}
      <div className="space-y-2">
        <h2 className="text-[11px] font-bold px-1 text-gray-800 uppercase tracking-[0.2em] opacity-50">
          Dernières utilisations
        </h2>
        
        <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-lg">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-white/20 text-gray-700 bg-white/10 uppercase text-[10px] tracking-wider">
                <th className="py-2 px-3 w-12 font-bold">N°</th>
                <th className="py-2 px-3 font-bold">Type</th>
                <th className="py-2 px-3 text-right font-bold">Heure</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 font-medium">
              {activities.map((item) => (
                <tr key={item.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                  <td className="py-2 px-3 opacity-40">{item.id}</td>
                  <td className="py-2 px-3 tracking-tight">{item.type}</td>
                  <td className="py-2 px-3 text-right opacity-60 tabular-nums">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}