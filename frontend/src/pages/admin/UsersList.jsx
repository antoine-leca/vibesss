import React, { useMemo } from "react";
import useUsers from "../../hooks/admin/useUsers";
import { usePagination } from "../../hooks/usePagination";
import UserTable from "../../components/admin/Users/UserTable";
import { checkIsAdmin } from "../../utils/adminUtils";

const sortUsers = (a, b) => {
    const isAdminA = checkIsAdmin(a);
    const isAdminB = checkIsAdmin(b);
    if (isAdminA !== isAdminB) return isAdminA ? -1 : 1;
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
};

const UsersList = () => {
    // 1. Extraire la fonction de mise à jour du rôle depuis useUsers (ex: updateRole ou changeRole)
    const { users, isLoading, isRefreshing, deleteUser, updateRole, refresh } = useUsers();
    
    const sortedUsers = useMemo(() => [...users].sort(sortUsers), [users]);
    const { currentItems, ...pagination } = usePagination(sortedUsers, 10);

    return (
        <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex justify-between items-end px-1">
                <div>
                    <h2 className="text-[10px] font-black text-gray-700/40 uppercase tracking-[0.3em]">Administration</h2>
                    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Membres</h1>
                </div>
                <button 
                    onClick={refresh}
                    className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-700 tracking-widest"
                >
                    {isRefreshing ? "..." : "Actualiser"}
                </button>
            </div>

            <div className="bg-white/55 backdrop-blur-md rounded-2xl border-2 border-white/70 overflow-hidden shadow-lg">
                <UserTable 
                    users={currentItems}
                    isLoading={isLoading}
                    onDelete={deleteUser}
                    onRoleChange={updateRole} // <-- 2. LA PROP MANQUANTE EST AJOUTÉE ICI
                    pagination={pagination}
                />
            </div>
        </div>
    );
};

export default UsersList;