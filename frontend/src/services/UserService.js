const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const UserService = {
    getByPseudo: async (pseudo) => {
        try {
            const response = await fetch(`${API_URL}/users/${pseudo}`);
            if (!response.ok) throw new Error("User not found");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
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
    }
};

export default UserService;
