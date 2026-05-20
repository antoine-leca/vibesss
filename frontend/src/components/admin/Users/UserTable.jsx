import React from 'react';
import UserRow from './UserRow';

const UserTable = ({ 
  users, 
  isLoading, 
  pagination, 
  onDelete 
}) => {
  
  // Skeleton de chargement
  if (isLoading) {
    return <div className="p-10 text-center opacity-30 italic text-[12px]">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Ton style de conteneur original */}
      <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-lg">
        {users.length > 0 ? (
          <div className="flex flex-col">
            {users.map(user => (
              <UserRow key={user.id} user={user} onDelete={onDelete} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center opacity-30 italic text-[12px]">Aucun membre</div>
        )}
      </div>

      {/* Pagination masquée si 1 seule page ou 0 items */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-2">
          <button 
            onClick={pagination.prevPage}
            disabled={pagination.currentPage === 1}
            className="p-2 disabled:opacity-30 hover:bg-black/5 rounded-full transition-colors font-bold text-gray-800"
          >
            ←
          </button>
          <span className="text-[10px] font-bold text-gray-500 uppercase">
            Page {pagination.currentPage} / {pagination.totalPages}
          </span>
          <button 
            onClick={pagination.nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-2 disabled:opacity-30 hover:bg-black/5 rounded-full transition-colors font-bold text-gray-800"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;