import { useState, useEffect, useCallback } from "react";

/**
 * useUsers : Centralise la logique des membres du site.
 * Gère le chargement, la suppression et la pagination.
 */
const useUsers = (itemsPerPage = 10) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Récupération des données depui l'API
    const fetchUsers = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Erreur useUsers hook:", error.message);
        } finally {
            setTimeout(() => {
                setIsRefreshing(false);
                setIsLoading(false);
            }, 400);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Suppression d'un membre
    const deleteUser = async (id) => {
        if (!window.confirm("Supprimer ce compte définitivement ?")) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, { 
                method: "DELETE" 
            });
            if (response.ok) {
                setUsers(prev => prev.filter(u => u.id !== id));
            }
        } catch (err) {
            console.error("Erreur suppression:", err);
        }
    };

    // --- Logique de Pagination ---
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return {
        users: currentUsers, // On ne donne que les utilisateurs de la page en cours
        totalCount: users.length,
        isLoading,
        isRefreshing,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        refresh: fetchUsers,
        deleteUser
    };
};

export default useUsers;