    import { useState } from 'react';

    export const useUserBlogs = () => {
    // Fausse base de données de tes blogs
    const initialBlogs = [
        {
        id: 1,
        title: "Décoration d'intérieur",
        category: "LIFESTYLE",
        creationDate: "21 Mai 2026",
        articlesCount: 5,
        cover: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
        status: "Publié"
        },
        {
        id: 2,
        title: "Code.Aesthetics",
        category: "DEV WEB",
        creationDate: "15 Mai 2026",
        articlesCount: 12,
        cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
        status: "Publié"
        },
        {
        id: 3,
        title: "WIT.Voices",
        category: "TECH & DIVERSITÉ",
        creationDate: "10 Mai 2026",
        articlesCount: 3,
        cover: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
        status: "Brouillon"
        }
    ];

    const [myBlogs, setMyBlogs] = useState(initialBlogs);

    // Fonctions de base (à connecter à ton back-end plus tard)
    const deleteBlog = (id) => {
        setMyBlogs(myBlogs.filter(blog => blog.id !== id));
    };

    return {
        myBlogs,
        deleteBlog
    };
    };