    import { useState } from 'react';

    export const useBlogSpace = () => {
    // Informations globales du blog
    const blogInfos = {
        title: "[Décoration d'intérieur]",
        author: "Lisa",
        creationDate: "21 Mai 2026",
        mainCategory: "LIFESTYLE",
        description: "Une curation d'espaces minimalistes, d'architectures calmes et de palettes graphiques douces."
    };

    // Vos articles avec du texte et des commentaires en français
    const initialArticles = [
        { 
        id: 1, 
        title: "L'art de la Vie Minimaliste", 
        cover_picture: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop", 
        date: "21 Mai 2026", 
        category: "LIFESTYLE", 
        likes: 14,
        content: "Le minimalisme n'est pas seulement un style visuel, c'est une philosophie de vie. En épurant notre espace, nous libérons du temps et de l'énergie pour ce qui compte vraiment. Trouver l'équilibre parfait entre esthétique, fonctionnalité et sérénité intérieure permet d'apprécier la beauté texturée des objets simples.",
        comments: [
            {
            id: 1,
            author: "David L.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            time: "Il y a 2 heures",
            text: "Absolument magnifique cette refonte ! Cette esthétique minimale est tellement fraîche. J'adore la typographie !",
            likes: 18,
            bgColor: "bg-[#E6EEFA]",
            replies: [
                {
                id: 2,
                author: "Sophie T.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                time: "Il y a 1 heure",
                text: "Totalement d'accord, David ! C'est incroyablement fluide et agréable à lire.",
                likes: 7,
                bgColor: "bg-[#FCEAEB]",
                }
            ]
            }
        ]
        },
        { 
        id: 2, 
        title: "Architecture of Calm", 
        cover_picture: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop", 
        date: "20 Mai 2026", 
        category: "DESIGN", 
        likes: 4,
        content: "Une exploration des structures modernes qui s'intègrent doucement avec la nature environnante. Les lignes droites rencontrent les arbres, les grandes baies vitrées invitent la lumière du jour sans agresser.",
        comments: [] // Vide pour tester l'absence de commentaire
        },
        { 
        id: 3, 
        title: "Textures of Nature", 
        cover_picture: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", 
        date: "19 Mai 2026", 
        category: "ART", 
        likes: 7, 
        content: "L'océan, le sable, le vent laissent des traces graphiques uniques. Focus sur les motifs bruts.", 
        comments: [] 
        },
        { 
        id: 4, 
        title: "The Curation of Space", 
        cover_picture: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop", 
        date: "18 Mai 2026", 
        category: "MINIMALISM", 
        likes: 0, 
        content: "Comment arranger une pièce pour maximiser le flux d'énergie positive et garder un esprit clair.", 
        comments: [] 
        },
        { 
        id: 5, 
        title: "Sustainable Solitude", 
        cover_picture: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop", 
        date: "17 Mai 2026", 
        category: "ECO", 
        likes: 3, 
        content: "Vivre à l'écart du bruit pour mieux se reconnecter à l'essentiel environnemental.", 
        comments: [] 
        },
    ];

    const [articles, setArticles] = useState(initialArticles);
    const [likedArticles, setLikedArticles] = useState({});
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showComments, setShowComments] = useState(false);

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
        handleLike,
        openArticle,
        closeArticle,
        toggleComments
    };
    };