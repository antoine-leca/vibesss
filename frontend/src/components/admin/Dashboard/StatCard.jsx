const StatCard = ({ value, label }) => (
  <div 
    className="bg-white/10 backdrop-blur-md p-4 rounded-3xl flex flex-col items-center justify-center text-center border border-white/10 shadow-xl"
  >
    <span className="text-2xl font-black text-white tracking-tighter" style={{ fontFamily: "var(--main-font)" }}>
        {value}
    </span>
    <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
      {label}
    </span>
  </div>
);
export default StatCard;