import { createContext, useContext, useMemo, useState } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext();

// 1. Exportez le Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        const minimalUser = {
            id: userData.id,
            pseudo: userData.pseudo,
            role: userData.role
        };

        setUser(minimalUser);
        localStorage.setItem("user", JSON.stringify(minimalUser));
    };

    const logout = async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error("Erreur lors de la déconnexion backend", error);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
        }
    };

    // Utilisez useMemo pour stabiliser l'objet context
    const value = useMemo(() => ({ user, login, logout }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 2. Exportez le Hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
}