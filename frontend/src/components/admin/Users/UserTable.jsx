import React from 'react';
import UserRow from './UserRow';

const UserTable = ({ 
  users, 
  isLoading, 
  pagination, 
  onDelete,
  onRoleChange
}) => {
  
  if (isLoading) {
    return <div className="p-8 text-center text-[11px] italic text-gray-400">Chargement...</div>;
  }

  return (
    <div className="space-y-2">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="border-b-2 border-white/40 bg-white/20 text-gray-700 uppercase font-black tracking-wider">
              <th className="py-2.5 px-4">Avatar</th>
              <th className="py-2.5 px-4">Pseudo</th>
              <th className="py-2.5 px-4">Email</th>
              <th className="py-2.5 px-4 text-center">Rôle</th>
              <th className="py-2.5 px-4 text-center">Blogs</th>
              <th className="py-2.5 px-4 text-center">Inscription</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onDelete={onDelete}
                  onRoleChange={onRoleChange}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-400 opacity-50 italic">
                  Aucun membre
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-2 border-t-2 border-white/40">
          <button
            onClick={pagination.prevPage}
            disabled={pagination.currentPage === 1}
            className="p-1 px-3 disabled:opacity-20 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black text-sm"
          >
            ←
          </button>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            Page {pagination.currentPage} / {pagination.totalPages}
          </span>
          <button
            onClick={pagination.nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="p-1 px-3 disabled:opacity-20 hover:bg-black/5 rounded-full transition-all text-gray-600 font-black text-sm"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;