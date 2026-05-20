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
        } catch (error) {
            console.error("Erreur hook:", error.message);
        } finally {
            setTimeout(() => { setIsRefreshing(false); setIsLoading(false); }, 400);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const deleteUser = async (id) => {
        if (!window.confirm("Supprimer ?")) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, { method: "DELETE" });
            if (response.ok) setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) { console.error(err); }
    };

    return { users, isLoading, isRefreshing, refresh: fetchUsers, deleteUser };
};

export default useUsers;