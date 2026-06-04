const StatCard = ({ value, label }) => (
  <div className="bg-[#FBF7D2] p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm border border-black/5">
    <span className="text-xl font-bold text-gray-800 tracking-tight">{value}</span>
    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-tighter mt-0.5 leading-none">
      {label}
    </span>
  </div>
);

export default StatCard;