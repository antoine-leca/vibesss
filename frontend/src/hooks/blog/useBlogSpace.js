import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../services/AuthContext";
import BlogService from "../../services/BlogService";

export const useBlogSpace = () => {
    const { id, blogId } = useParams(); // Gère les deux variantes de nommage d'ID de ton routeur
    const { user } = useAuth();

    const currentBlogId = id || blogId;

    const [blogInfos, setBlogInfos] = useState({
        id: "",
        title: "Chargement...",
        author: "",
        creationDate: "",
        mainCategory: "",
        description: ""
    });
    const [articles, setArticles] = useState([]);
    const [likedArticles, setLikedArticles] = useState({});
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Récupération des infos du blog, de ses articles et des commentaires associés
    const fetchBlogData = useCallback(async () => {
        setIsLoading(true);
        try {
            let blog = null;

            // Détection : soit par ID de l'URL, soit via l'utilisateur connecté
            if (currentBlogId) {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${currentBlogId}`);
                if (response.ok) {
                    blog = await response.json();
                }
            } else if (user?.id) {
                const userBlogs = await BlogService.getByUserId(user.id);
                if (userBlogs && userBlogs.length > 0) {
                    blog = userBlogs[0];
                }
            }

            if (blog) {
                setBlogInfos({
                    id: blog.id,
                    title: blog.title,
                    author: blog.pseudo || "Auteur",
                    creationDate: new Date(blog.creation_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                    mainCategory: blog.theme_label || "Général",
                    description: blog.description
                });

                // Récupération des articles liés à ce blog précis
                const artResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blog.id}/articles`);
                if (artResponse.ok) {
                    const blogArticles = await artResponse.json();

                    // Récupération en parallèle des commentaires pour chaque article récupéré
                    const articlesWithComments = await Promise.all(blogArticles.map(async (art) => {
                        let comments = [];
                        try {
                            const commRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/articles/${art.id}/comments`);
                            if (commRes.ok) {
                                comments = await commRes.json();
                            }
                        } catch (cErr) {
                            console.error("Erreur chargement commentaires de l'article :", cErr);
                        }

                        return {
                            id: art.id,
                            title: art.title,
                            cover_picture: art.content_image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
                            date: new Date(art.creation_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                            category: blog.theme_label || "Général",
                            likes: art.likes || 0,
                            content: art.content_text,
                            comments: comments
                        };
                    }));

                    setArticles(articlesWithComments);
                }
            }
        } catch (err) {
            console.error("Erreur globale récupération données Espace Blog :", err);
        } finally {
            setIsLoading(false);
        }
    }, [currentBlogId, user?.id]);

    // Déclencheur au chargement initial
    useEffect(() => {
        fetchBlogData();
    }, [fetchBlogData]);

    //  2. Gestion des likes asynchrones et sécurisés (UI Optimiste conservée !)
    const handleLike = useCallback(async (e, articleId) => {
        e.stopPropagation(); // Évite d'ouvrir la modal en cliquant sur le cœur

        const isCurrentlyLiked = likedArticles[articleId];
        
        // UI Optimiste : On bascule l'état visuel immédiatement pour une sensation de fluidité instantanée
        setLikedArticles(prev => ({
            ...prev,
            [articleId]: !isCurrentlyLiked
        }));

        // Ajustement dynamique du compteur sur l'écran
        setArticles(prevArticles => prevArticles.map(art => 
            art.id === articleId ? { ...art, likes: isCurrentlyLiked ? art.likes - 1 : art.likes + 1 } : art
        ));

        const url = `${import.meta.env.VITE_BACKEND_URL}/users_articles`;
        const method = isCurrentlyLiked ? "DELETE" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Indispensable pour tes tokens et la sécurité
                body: JSON.stringify({ articleId }) 
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du like côté serveur");
            }
        } catch (error) {
            console.error("Erreur Like:", error.message);
            
            // En cas d'échec réseau, on effectue un Rollback (on remet l'état d'origine)
            setLikedArticles(prev => ({
                ...prev,
                [articleId]: isCurrentlyLiked
            }));
            setArticles(prevArticles => prevArticles.map(art => 
                art.id === articleId ? { ...art, likes: isCurrentlyLiked ? art.likes : art.likes } : art
            ));
        }
    }, [likedArticles]);

    // Gestion des ouvertures/fermetures de la Modal d'un article
    const openArticle = useCallback((article) => setSelectedArticle(article), []);
    const closeArticle = useCallback(() => setSelectedArticle(null), []);

    return {
        blogInfos,
        articles,
        likedArticles,
        selectedArticle,
        showComments,
        setShowComments,
        isLoading,
        handleLike,
        openArticle,
        closeArticle,
        refresh: fetchBlogData 
    };
};

export default useBlogSpace;