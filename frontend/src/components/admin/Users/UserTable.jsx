import React from 'react';
import UserRow from './UserRow';

const UserTable = ({ 
  users, 
  isLoading, 
  isRefreshing, 
  pagination, 
  onDelete 
}) => {
  
  // Skeleton de chargement
  if (isLoading) {
    return <div className="p-8 text-center text-white/20 animate-pulse uppercase font-black">Chargement des membres...</div>;
  }

  return (
    <div className="flex flex-col gap-2 relative">
      {/* Overlay de rafraîchissement (le fameux isRefreshing de ton hook) */}
      {isRefreshing && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Liste des lignes */}
      <div className="flex flex-col">
        {users.length > 0 ? (
          users.map(user => (
            <UserRow 
              key={user.id} 
              user={user} 
              onDelete={onDelete} 
            />
          ))
        ) : (
          <div className="p-10 text-center text-white/40 text-xs uppercase">Aucun membre trouvé</div>
        )}
      </div>

      {/* Barre de Pagination - Connectée au hook useUsers */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 p-2 bg-black/20 rounded-2xl border border-white/5">
          <button 
            onClick={pagination.prevPage}
            disabled={pagination.currentPage === 1}
            className="text-[10px] font-black uppercase text-white/40 hover:text-white disabled:opacity-0 p-2 px-4 transition-all"
          >
            Précédent
          </button>
          
          <span className="text-[10px] font-black text-white/20 uppercase">
            Page {pagination.currentPage} / {pagination.totalPages}
          </span>

          <button 
            onClick={pagination.nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="text-[10px] font-black uppercase text-white/40 hover:text-white disabled:opacity-0 p-2 px-4 transition-all"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;