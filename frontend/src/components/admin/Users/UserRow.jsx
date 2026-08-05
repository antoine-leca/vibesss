import React, { useState } from 'react';
import { Trash2, Shield } from 'lucide-react';
import { checkIsAdmin } from '../../../utils/adminUtils';

const UserRow = ({ user, onDelete, onRoleChange }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  
  // Utilisation de user.role_id (2 = Admin, 1 = User) ou fallback sur l'utilitaire
  const currentRoleId = user.role_id || (checkIsAdmin(user) ? 2 : 1);
  const isAdmin = currentRoleId === 2;

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

  const handleRoleSelect = async (e) => {
    const newRoleId = parseInt(e.target.value, 10);
    if (newRoleId === currentRoleId) return;

    if (window.confirm(`Changer le rôle de ${user.pseudo} ?`)) {
      setIsUpdatingRole(true);
      await onRoleChange(user.id, newRoleId);
      setIsUpdatingRole(false);
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

      {/* Colonne Rôle avec Selecteur dynamique */}
      <td className="py-2.5 px-4 text-center">
        <select
          value={currentRoleId}
          onChange={handleRoleSelect}
          disabled={isUpdatingRole}
          className={`text-[10px] font-bold px-2 py-1 rounded-md border outline-none cursor-pointer transition-all ${
            isAdmin 
              ? "bg-yellow-100 text-yellow-800 border-yellow-300" 
              : "bg-white/50 text-gray-700 border-gray-300"
          }`}
        >
          <option value={1}>Utilisateur</option>
          <option value={2}>Admin </option>
        </select>
      </td>

      <td className="py-2.5 px-4 text-center font-bold text-gray-700">{user.blogs_count || 0}</td>
      <td className="py-2.5 px-4 text-center text-[10px] font-medium text-gray-500">{formatDate(user.created_at)}</td>
      <td className="py-2.5 px-4 text-right">
        <button 
          onClick={handleDelete}
          disabled={isDeleting || isAdmin} // Protection contre la suppression d'un admin
          className="p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
          title={isAdmin ? "Impossible de supprimer un administrateur" : "Supprimer le membre"}
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;