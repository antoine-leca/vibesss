import { useEffect, useState, useCallback } from "react";

// ActionButton plus petit et compact
const ActionButton = ({ onClick, label, color }) => (
  <button
    onClick={onClick}
    className={`p-1.5 px-2.5 rounded-lg transition-all hover:brightness-90 ${color} shadow-sm border border-black/5 text-[9px] font-bold uppercase tracking-tighter`}
  >
    {label}
  </button>
);

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 10; // Augmenté à 10 comme les éléments sont plus petits

  const fetchUsers = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur :", error.message);
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce compte ?")) {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
        if (response.ok) setUsers(users.filter((u) => u.id !== id));
      } catch (err) { console.error(err); }
    }
  };

  const handleEdit = (id) => console.log("Modif :", id);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = users.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    // max-w-xl au lieu de 2xl pour resserrer la liste
    <div className="max-w-xl mx-auto space-y-4">
      
      <div className="flex justify-between items-center px-1">
        <h2 className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.2em] opacity-40">
          Base Utilisateurs
        </h2>
        <button 
          onClick={fetchUsers}
          className={`text-[9px] font-bold uppercase tracking-widest transition-opacity ${isRefreshing ? 'opacity-20' : 'hover:opacity-60'}`}
        >
          {isRefreshing ? '...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-md">
        <div className="p-2 space-y-1"> {/* Padding réduit */}
          {currentItems.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors border-b border-white/5 last:border-none"
            >
              <div className="flex items-center gap-3">
                {/* Avatar réduit (w-9 h-9) */}
                <div className="w-9 h-9 rounded-full border border-[#EBC3CF]/50 overflow-hidden bg-white/50 flex-shrink-0">
                  <img 
                    src={user.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                    alt=""
                    className="w-full h-full object-cover grayscale-[0.2]"
                  />
                </div>
                <div className="truncate">
                  <h3 className="text-[12px] font-bold text-gray-800 uppercase tracking-tight truncate leading-none">
                    {user.pseudo}
                  </h3>
                  <p className="text-[8px] text-gray-500 font-medium truncate mt-0.5 opacity-70">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Barre d'actions plus discrète */}
              <div className="flex items-center gap-1.5 bg-black/5 p-1 rounded-lg px-2">
                <ActionButton 
                  label="Delete" 
                  color="text-red-900/40" 
                  onClick={() => handleDelete(user.id)} 
                />
                <ActionButton 
                  label="Edit" 
                  color="text-gray-600" 
                  onClick={() => handleEdit(user.id)} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination ultra-compacte */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 pt-1">
          <button 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="text-[9px] font-black disabled:opacity-10 hover:opacity-50 tracking-tighter"
          >PREV</button>
          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            {currentPage} / {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-[9px] font-black disabled:opacity-10 hover:opacity-50 tracking-tighter"
          >NEXT</button>
        </div>
      )}
    </div>
  );
}