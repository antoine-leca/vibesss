import { useEffect, useState } from "react";
import { MOCK_BLOGS } from "../data/mockBlogs";
import { MOCK_USERS } from "../data/mockUsers";
// import { useAuth } from "../services/AuthContext"; // Je vais supposer qu'on utilisera ça plus tard

export const useProfile = (userId, currentUserId) => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        // Simulation de récupération de données
        const fetchProfileData = async () => {
            setLoading(true);

            try {
                // En mode réel, on ferait ça :
                // const userData = await UserService.getById(userId);
                // const userBlogs = await UserService.getBlogsByUserId(userId);

                // Pour l'instant, données simulées :
                const targetUser = MOCK_USERS.find((u) => u.id === parseInt(userId)) || MOCK_USERS[0];
                const filteredBlogs = MOCK_BLOGS.filter((b) => b.user_id === targetUser.id);

                setUser(targetUser);
                setBlogs(filteredBlogs);

                // Vérifier si c'est le propriétaire
                setIsOwner(String(targetUser.id) === String(currentUserId));
            } catch (error) {
                console.error("Erreur lors du chargement du profil:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userId, currentUserId]);

    return { user, blogs, loading, isOwner };
};
