import { useEffect, useState } from "react";
import UserService from "../services/UserService";

export const useProfile = (pseudo, currentUserId) => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    const fetchProfileData = async () => {
        setLoading(true);
        setError(null);

        try {
            const userData = await UserService.getByPseudo(pseudo);

            if (userData) {
                const userBlogs = await UserService.getBlogsByUserId(userData.id);
                setUser(userData);
                setBlogs(userBlogs || []);
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

    useEffect(() => { // Appeler fetchProfileData dans l'useEffect
        if (pseudo) {
            fetchProfileData();
        }
    }, [pseudo, currentUserId]);

    return { user, blogs, loading, error, isOwner, refetchProfile: fetchProfileData };
};
