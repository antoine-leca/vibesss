import { useEffect, useState } from "react";
import UserService from "../services/UserService";

export const useProfile = (pseudo, currentUserId) => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Récupération des données réelles depuis l'API
                const userData = await UserService.getByPseudo(pseudo);
                const userBlogs = await UserService.getBlogsByUserId(userData.id);

                if (userData) {
                    setUser(userData);
                    setBlogs(userBlogs || []);

                    // Vérifier si c'est le propriétaire
                    setIsOwner(String(userData.id) === String(currentUserId));
                } else {
                    setError("Utilisateur non trouvé");
                }
            } catch (error) {
                console.error("Erreur lors du chargement du profil:", error);
                setError("Une erreur est survenue lors du chargement du profil");
            } finally {
                setLoading(false);
            }
        };

        if (pseudo) {
            fetchProfileData();
        }
    }, [pseudo, currentUserId]);

    return { user, blogs, loading, error, isOwner };
};
