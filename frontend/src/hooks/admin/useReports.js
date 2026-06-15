import { useState, useEffect, useCallback } from "react";

const useReports = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReports = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`);
            const data = await response.json();
            setReports(data || []);
        } catch (err) {
            console.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchReports(); }, [fetchReports]);

    const updateStatus = async (id, currentStatus) => {
        const statusCycle = { 
            pending: "active",   
            active: "inactive",  
            inactive: "pending" 
        };
        const newStatus = statusCycle[currentStatus] || "pending";
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
            }
        } catch (err) { console.error(err); }
    };

    const deleteReport = async (id) => {
        if (!window.confirm("Supprimer ?")) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${id}`, { method: "DELETE" });
            if (response.ok) setReports(prev => prev.filter(r => r.id !== id));
        } catch (err) { console.error(err); }
    };

    return { reports, isLoading, refresh: fetchReports, updateStatus, deleteReport };
};

export default useReports;