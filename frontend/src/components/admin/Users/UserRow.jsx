import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { checkIsAdmin } from '../../../utils/adminUtils';

const UserRow = ({ user, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const isAdmin = checkIsAdmin(user);

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Supprimer ${user.pseudo} ?`)) {
      setIsDeleting(true);
      await onDelete(user.id);
      setIsDeleting(false);
    }
  };

  return (
    <tr className="border-b border-white/20 hover:bg-white/10 transition-colors text-gray-800">
      <td className="py-2.5 px-4">
        <div className="relative inline-flex">
          <img 
            src={user.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
            alt={user.pseudo}
            className="w-8 h-8 rounded-full border border-white/40 object-cover"
          />
          {isAdmin && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-300 border border-white text-yellow-800 flex items-center justify-center shadow-sm">
              <span className="text-[8px]">⭐</span>
            </span>
          )}
        </div>
      </td>
      <td className="py-2.5 px-4 font-bold text-[12px] uppercase tracking-tight">{user.pseudo}</td>
      <td className="py-2.5 px-4 text-[10px] text-gray-600 opacity-75">{user.email}</td>
      <td className="py-2.5 px-4 text-center font-bold text-gray-700">{user.blogs_count || 0}</td>
      <td className="py-2.5 px-4 text-center text-[10px] font-medium text-gray-500">{formatDate(user.created_at)}</td>
      <td className="py-2.5 px-4 text-right">
        <button 
          onClick={handleDelete}
          disabled={isDeleting || isAdmin} // Protection contre suppression admin
          className="p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;