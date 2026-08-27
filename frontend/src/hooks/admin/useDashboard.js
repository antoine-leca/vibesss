    import { useState, useEffect, useCallback } from "react";

    const useDashboard = () => {
    const [stats, setStats] = useState({ users: 0, blogs: 0, articles: 0, reports: 0 });
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        setIsRefreshing(true);
        try {
        const [statsRes, activitiesRes] = await Promise.all([
            fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/stats`, {
            credentials: "include", // NÉCESSAIRE pour transmettre le cookie JWT
            }),
            fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/activities`, {
            credentials: "include", // NÉCESSAIRE pour transmettre le cookie JWT
            }),
        ]);

        if (statsRes.ok) {
            const statsData = await statsRes.json();
            console.log("📊 Stats reçues :", statsData);
            setStats({
            users: statsData.users ?? 0,
            blogs: statsData.blogs ?? 0,
            articles: statsData.articles ?? 0,
            reports: statsData.reports ?? 0,
            });
        } else {
            console.error("Stats API rejetée (HTTP", statsRes.status, ")");
        }

        if (activitiesRes.ok) {
            const activitiesData = await activitiesRes.json();
            setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        } else {
            console.error("Activities API rejetée (HTTP", activitiesRes.status, ")");
        }
        } catch (error) {
        console.error("Erreur Dashboard hook:", error.message);
        } finally {
        setTimeout(() => {
            setIsRefreshing(false);
            setIsLoading(false);
        }, 500);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3600000); // Auto-refresh 1h
        return () => clearInterval(interval);
    }, [fetchData]);

    return { stats, activities, isLoading, isRefreshing, refresh: fetchData };
    };

    export default useDashboard;