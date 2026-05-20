import { useState, useEffect, useCallback } from "react";

/**
 * Hook personnalisé pour gérer la logique des signalements (Reports)
 * Centralise le fetch, l'update de statut et la suppression.
 */
const useReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer la liste depuis le backend
    const fetchReports = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`);
            if (!response.ok) throw new Error("Erreur lors de la récupération");
            const data = await response.json();
            setReports(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Charger les données au montage du hook
    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    // Fonction pour changer le statut (En attente / Traité)
    const updateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "pending" ? "resolved" : "pending";
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                // On met à jour l'état localement pour une interface réactive
                setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
            }
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    // Fonction pour supprimer un signalement
    const deleteReport = async (id) => {
        if (!window.confirm("Supprimer ce signalement ?")) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setReports(prev => prev.filter(r => r.id !== id));
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return {
        reports,
        isLoading,
        error,
        refresh: fetchReports,
        updateStatus,
        deleteReport
    };
};

export default useReports;