import React from "react";

const StatCard = ({ value, label, icon, bg }) => (
  <div
    className="rounded-2xl p-4 flex flex-col items-center justify-center text-center border-2 border-white/50"
    style={{ background: bg }}
  >
    {icon && <span className="text-2xl mb-1 opacity-60">{icon}</span>}
    <span className="text-2xl font-black text-gray-800 leading-none tracking-tight">{value}</span>
    <span className="text-[9px] font-black text-gray-500 uppercase tracking-[.12em] mt-1">{label}</span>
  </div>
);

export default StatCard;