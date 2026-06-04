import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../services/AuthContext';
import BlogService from '../../services/BlogService';

export const useBlogSpace = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [blogInfos, setBlogInfos] = useState({
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogData = async () => {
            setLoading(true);
            try {
                let blog = null;
                if (id) {
                    // Fetch blog by blog ID
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"}/blogs/${id}`);
                    if (response.ok) {
                        blog = await response.json();
                    }
                } else if (user?.id) {
                    // Fetch owner's blog by user ID
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

                    // Fetch all articles
                    const artResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"}/articles`);
                    if (artResponse.ok) {
                        const allArticles = await artResponse.json();
                        // Filter articles for this blog
                        const blogArticles = allArticles.filter(art => art.blog_id === blog.id);

                        // Fetch comments for each article
                        const articlesWithComments = await Promise.all(blogArticles.map(async (art) => {
                            let comments = [];
                            try {
                                const commRes = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"}/articles/${art.id}/comments`);
                                if (commRes.ok) {
                                    comments = await commRes.json();
                                }
                            } catch (cErr) {
                                console.error("Error loading comments:", cErr);
                            }

                            return {
                                id: art.id,
                                title: art.title,
                                cover_picture: art.content_image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600",
                                date: new Date(art.creation_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                                category: blog.theme_label || "Général",
                                likes: 0,
                                content: art.content_text,
                                comments: comments
                            };
                        }));

                        setArticles(articlesWithComments);
                    }
                }
            } catch (err) {
                console.error("Error loading blog space data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBlogData();
    }, [id, user?.id]);

    // Gestion du like (Incrémente / Décrémente)
    const handleLike = (e, id) => {
        e.stopPropagation(); // Évite que le pop-up s'ouvre au clic sur le bouton cœur
        const isLiked = likedArticles[id];
        setLikedArticles({ ...likedArticles, [id]: !isLiked });
        setArticles(articles.map(art => 
            art.id === id ? { ...art, likes: isLiked ? art.likes - 1 : art.likes + 1 } : art
        ));
    };

    // Ouverture de la fenêtre pop-up de l'article
    const openArticle = (article) => {
        setSelectedArticle(article);
        setShowComments(false); // Réinitialise l'accordéon à la fermeture
    };

    // Fermeture du pop-up
    const closeArticle = () => {
        setSelectedArticle(null);
    };

    // Gestion du bouton déroulant
    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return {
        blogInfos,
        articles,
        likedArticles,
        selectedArticle,
        showComments,
        loading,
        handleLike,
        openArticle,
        closeArticle,
        toggleComments
    };
};