const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const UserService = {
    getByPseudo: async (pseudo) => {
        try {
            const response = await fetch(`${API_URL}/users/${pseudo}`);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error("Erreur serveur");
            }
            return await response.json();
        } catch (error) {
            console.error("UserService.getByPseudo error:", error);
            throw error;
        }
    },

    getBlogsByUserId: async (id) => {
        try {
            const response = await fetch(`${API_URL}/blogs/user/${id}`);
            if (!response.ok) throw new Error("Blogs not found");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    update: async (id, userData) => {
        try {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            return response.ok;
        } catch (error) {
            console.error("UserService.update error:", error);
            return false;
        }
    }
};

export default UserService;
