import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router"; 

const useBlogSpace = () => {
    const { blogId } = useParams();
    
    const [blogInfos, setBlogInfos] = useState({ title: "", description: "", creationDate: "", mainCategory: "", author: "" });
    const [articles, setArticles] = useState([]);
    const [likedArticles, setLikedArticles] = useState({});
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Récupération des infos du blog et de ses articles
    const fetchBlogData = useCallback(async () => {
        if (!blogId) return;
        
        try {
            // On lance le chargement du blog ET de ses articles en même temps !
            const [blogRes, articlesRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}`),
                fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}/articles`)
            ]);

            const blogData = await blogRes.json();
            const articlesData = await articlesRes.json();

            setBlogInfos(blogData);
            setArticles(articlesData);
        } catch (error) {
            console.error("Erreur BlogSpace hook:", error.message);
        } finally {
            setIsLoading(false);
        }
    }, [blogId]);

    // Déclencheur automatique au chargement ou si le blogId change
    useEffect(() => {
        fetchBlogData();
    }, [fetchBlogData]);

    // Gestion des likes asynchrones et sécurisés (UI Optimiste)
    const handleLike = useCallback(async (e, articleId) => {
        e.stopPropagation(); // Évite d'ouvrir la modal en cliquant sur le cœur

        const isCurrentlyLiked = likedArticles[articleId];
        
        // 1. UI Optimiste : On bascule l'affichage immédiatement pour une sensation de fluidité
        setLikedArticles(prev => ({
            ...prev,
            [articleId]: !isCurrentlyLiked
        }));

        // 2. Configuration de la requête vers ton contrôleur de likes
        const url = `${import.meta.env.VITE_BACKEND_URL}/users_articles`;
        const method = isCurrentlyLiked ? "DELETE" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({ articleId }) 
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du like côté serveur");
            }


        } catch (error) {
            console.error("Erreur Like:", error.message);
            
            // En cas d'erreur (serveur déconnecté, etc.), on annule le changement visuel
            setLikedArticles(prev => ({
                ...prev,
                [articleId]: isCurrentlyLiked
            }));
        }
    }, [likedArticles]);

    // Gestion de la Modal
    const openArticle = useCallback((article) => setSelectedArticle(article), []);
    const closeArticle = useCallback(() => setSelectedArticle(null), []);

    return {
        blogInfos,
        articles,
        likedArticles,
        selectedArticle,
        isLoading,
        handleLike,
        openArticle,
        closeArticle,
        refresh: fetchBlogData 
    };
};

export default useBlogSpace;