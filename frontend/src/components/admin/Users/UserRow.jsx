import React, { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';

const UserRow = ({ user, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Supprimer ${user.pseudo} ?`)) {
      setIsDeleting(true);
      await onDelete(user.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isAdmin = (
    Array.isArray(user?.roles)
      ? user.roles.some((role) => role?.toLowerCase?.() === "admin")
      : false
  ) ||
  user?.role?.toLowerCase?.() === "admin" ||
  user?.role_id === 2 ||
  user?.is_admin === true ||
  user?.is_admin === 1;

  return (
    <tr className="border-b border-white/20 hover:bg-white/10 transition-colors text-gray-800">
      {/* Avatar */}
      <td className="py-2.5 px-4">
        <div className="relative inline-flex">
          <div 
            className="w-8 h-8 rounded-full overflow-hidden border border-white/40 flex-shrink-0"
            style={{ borderColor: "var(--primary-color)" }}
          >
            <img 
              src={user.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
              alt={user.pseudo}
              className="w-full h-full object-cover"
            />
          </div>
          {isAdmin && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-300 border border-white text-[8px] text-yellow-800 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M12 2l2.5 5L21 7l-4 4 1 6-5-3-5 3 1-6-4-4 6.5-0.5L12 2z" />
              </svg>
            </span>
          )}
        </div>
      </td>

      {/* Pseudo */}
      <td className="py-2.5 px-4 font-bold text-[12px] uppercase tracking-tight">
        {user.pseudo}
      </td>

      {/* Email */}
      <td className="py-2.5 px-4 text-[10px] text-gray-600 opacity-75">
        {user.email}
      </td>

      {/* Blogs */}
      <td className="py-2.5 px-4 text-center font-bold text-[12px]">
        <span className="inline-block px-2 py-1 rounded-full bg-white/30 text-gray-700">
          {user.blogs_count || 0}
        </span>
      </td>

      {/* Inscription */}
      <td className="py-2.5 px-4 text-center text-[10px] text-gray-600 opacity-75">
        {formatDate(user.created_at)}
      </td>

      {/* Actions */}
      <td className="py-2.5 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            className="p-1.5 hover:bg-white/20 rounded-lg transition-all text-gray-700 opacity-70 hover:opacity-100"
            title="Voir le profil"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 hover:bg-red-500/20 rounded-lg transition-all text-red-600 opacity-70 hover:opacity-100 disabled:opacity-30"
            title="Supprimer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;