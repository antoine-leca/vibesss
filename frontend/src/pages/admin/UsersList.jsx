import React, { useMemo } from "react";
import useUsers from "../../hooks/admin/useUsers";
import { usePagination } from "../../hooks/usePagination";
import UserTable from "../../components/admin/Users/UserTable";

const isAdminUser = (user) => {
    return (
        Array.isArray(user?.roles)
            ? user.roles.some((role) => role?.toLowerCase?.() === "admin")
            : false
    ) ||
    user?.role?.toLowerCase?.() === "admin" ||
    user?.role_id === 2 ||
    user?.is_admin === true ||
    user?.is_admin === 1;
};

const sortUsers = (a, b) => {
    const isAdminA = isAdminUser(a);
    const isAdminB = isAdminUser(b);

    if (isAdminA !== isAdminB) {
        return isAdminA ? -1 : 1;
    }

    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

    return dateB - dateA;
};

const UsersList = () => {
    const { users, isLoading, isRefreshing, deleteUser, refresh } = useUsers();
    const sortedUsers = useMemo(() => [...users].sort(sortUsers), [users]);
    const { currentItems, ...pagination } = usePagination(sortedUsers, 10);

    return (
        <div className="max-w-4xl mx-auto space-y-3">
            {/* Header */}
            <div className="flex justify-between items-end px-1">
                <div>
                    <h2 
                        className="text-[10px] font-black text-gray-700/40 uppercase tracking-[0.3em]"
                        style={{ fontFamily: "var(--main-font)" }}
                    >
                        Administration
                    </h2>
                    <h1 
                        className="text-2xl font-black text-gray-800 uppercase tracking-tighter"
                        style={{ fontFamily: "var(--main-font)" }}
                    >
                        Membres
                    </h1>
                </div>

                <button 
                    onClick={refresh}
                    disabled={isRefreshing}
                    className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-700 transition-colors tracking-widest"
                    style={{ fontFamily: "var(--main-font)" }}
                >
                    {isRefreshing ? "..." : "Actualiser"}
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white/55 backdrop-blur-md rounded-2xl border-2 border-white/70 overflow-hidden shadow-lg">
                <UserTable 
                    users={currentItems}
                    isLoading={isLoading}
                    onDelete={deleteUser}
                    pagination={pagination}
                />
            </div>
        </div>
    );
};

export default UsersList;