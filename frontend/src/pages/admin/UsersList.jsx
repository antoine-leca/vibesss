import React, { useMemo } from "react";
import useUsers from "../../hooks/admin/useUsers";
import { usePagination } from "../../hooks/usePagination";
import UserTable from "../../components/admin/Users/UserTable";

const normalizeAdminValue = (value) => {
    if (value == null) return "";
    if (typeof value === "string") return value.toLowerCase();
    if (typeof value === "number") return String(value);
    if (typeof value === "boolean") return value ? "true" : "false";
    return "";
};

const isAdminValue = (value) => {
    const normalized = normalizeAdminValue(value);
    return normalized === "admin" || normalized === "2" || normalized === "true" || normalized === "1";
};

const extractRoleValue = (item) => {
    if (item == null) return null;
    if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
        return item;
    }
    if (typeof item === "object") {
        return item.label ?? item.name ?? item.role ?? item.role_id ?? item.id ?? item.value;
    }
    return null;
};

const isAdminUser = (user) => {
    if (!user) return false;

    if (Array.isArray(user.roles)) {
        if (user.roles.some((role) => isAdminValue(extractRoleValue(role)))) {
            return true;
        }
    }

    if (typeof user.roles === "object" && user.roles !== null) {
        if (isAdminValue(extractRoleValue(user.roles))) return true;
    }

    if (user.role != null && isAdminValue(extractRoleValue(user.role))) return true;
    if (user.role_id != null && isAdminValue(user.role_id)) return true;
    if (user.is_admin != null && isAdminValue(user.is_admin)) return true;

    return false;
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