import { useState, useEffect, useCallback } from "react";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchUsers = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
            const data = await response.json();
            setUsers(data);
            console.log("[useUsers] fetched users:", data);
        } catch (error) {
            console.error("Erreur hook:", error.message);
        } finally {
            setTimeout(() => { setIsRefreshing(false); setIsLoading(false); }, 400);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    // Modification du rôle d'un utilisateur
    const updateRole = async (userId, newRoleId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/admin/users/${userId}/role`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // Permet d'envoyer le cookie JWT admin
                    body: JSON.stringify({ role_id: newRoleId }),
                }
            );

            if (response.ok) {
                // Mise à jour de l'état local pour refléter le changement immédiatement dans la UI
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, role_id: newRoleId } : user
                    )
                );
            } else {
                console.error("Erreur lors de la mise à jour du rôle HTTP:", response.status);
            }
        } catch (err) {
            console.error("Erreur réseau updateRole:", err);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, { 
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) { console.error(err); }
    };

    return { 
        users, 
        isLoading, 
        isRefreshing, 
        refresh: fetchUsers, 
        deleteUser, 
        updateRole // Exporté pour être consommé par UsersList
    };
};

export default useUsers;