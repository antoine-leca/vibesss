import { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext';
import BlogService from '../../services/BlogService';

export const useUserBlogs = () => {
    const { user } = useAuth();
    const [myBlogs, setMyBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserBlogs = async () => {
            if (user?.id) {
                setLoading(true);
                try {
                    const blogs = await BlogService.getByUserId(user.id);
                    
                    // Fetch all articles to compute article counts
                    const artResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"}/articles`);
                    let allArticles = [];
                    if (artResponse.ok) {
                        allArticles = await artResponse.json();
                    }

                    const blogsWithCounts = (blogs || []).map(blog => {
                        const count = allArticles.filter(art => art.blog_id === blog.id).length;
                        return {
                            ...blog,
                            articlesCount: count
                        };
                    });

                    setMyBlogs(blogsWithCounts);
                } catch (err) {
                    console.error("Error loading user blogs:", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadUserBlogs();
    }, [user?.id]);

    const deleteBlog = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce blog ? Cette action est irréversible.")) return;
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5001"}/blogs/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setMyBlogs(myBlogs.filter(blog => blog.id !== id));
            } else {
                console.error("Failed to delete blog:", response.statusText);
            }
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    };

    return {
        myBlogs,
        loading,
        deleteBlog
    };
};