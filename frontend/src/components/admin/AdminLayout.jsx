import { useState } from "react";
import { Outlet, Link } from "react-router";
import { Menu, Home, Users, AlertTriangle, X, ArrowLeft } from "lucide-react";

const StatCard = ({ value, label }) => (
  <div className="bg-[#EBC3CF] p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
    <span className="text-2xl font-bold text-gray-800 leading-tight">{value}</span>
    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide mt-1">{label}</span>
  </div>
);

export default function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCEB92] flex flex-col md:flex-row overflow-x-hidden">
      {/* Header Mobile - Burger à droite */}
      <nav className="md:hidden bg-[#FBF7D2] p-2 px-4 flex justify-between items-center shadow-sm z-50">
        <h1 className="font-bold text-xs">Vibesss Admin</h1>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1">
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Sidebar Desktop + menu mobile */}
      <aside
        className={`
        bg-[#FBF7D2] md:w-48 md:min-h-screen transition-all duration-300
        ${isMenuOpen ? "block" : "hidden md:block"}
      `}
      >
        <div className="p-4">
          <h1 className="font-bold text-sm hidden md:block mb-8 opacity-70 uppercase tracking-tighter text-center">
            Vibesss Admin
          </h1>

          <div className="flex flex-col gap-0.5 w-full text-[13px]">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 font-medium hover:bg-black/5 p-1.5 px-3 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} /> <span>Retour au site</span>
            </Link>

            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 font-medium hover:bg-black/5 p-1.5 px-3 rounded-lg transition-colors"
            >
              <Home size={16} /> <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/users-list"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 font-medium hover:bg-black/5 p-1.5 px-3 rounded-lg transition-colors"
            >
              <Users size={16} /> <span>Users</span>
            </Link>

            <Link
              to="/admin/reports"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 font-medium hover:bg-black/5 p-1.5 px-3 rounded-lg transition-colors"
            >
              <AlertTriangle size={16} /> <span>Reports</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Zone de contenu */}
      <main className="flex-1 p-3 md:p-6 w-full max-w-full overflow-x-hidden pt-6 md:pt-10">
        <Outlet />
      </main>
    </div>
  );
}