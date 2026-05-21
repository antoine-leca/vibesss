const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const AuthService = {
    register: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            return response;
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
                credentials: "include",
            });
            return response;
        } catch (error) {
            console.error("Erreur login:", error);
            throw error;
        }
    },

    logout: async () => {
        return await fetch(`${API_URL}/auth/logout`, { credentials: "include" });
}
};

export default AuthService;