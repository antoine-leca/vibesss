import { Eye, EyeClosed } from 'lucide-react';
import { useState } from "react";
import { Link, useLocation } from "react-router"; // Importez Link pour la navigation

const AuthForm = () => {
    const location = useLocation();
    const isRegister = location.pathname === "/auth/register";

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Contenu dynamique selon le mode
    const config = {
        title: isRegister ? "Inscription" : "Connexion",
        subtitle: isRegister ? "Ravi de pouvoir vous compter parmi nous" : "Bon retour parmi nous !",
        buttonText: isRegister ? "S'inscrire" : "Se connecter",
        switchText: isRegister ? "Déjà un compte ?" : "Pas encore de compte ?",
        switchLink: isRegister ? "/auth/login" : "/auth/register",
        switchAction: isRegister ? "Se connecter" : "S'inscrire"
    };

    return (
        <main className="min-h-screen w-full bg-gradient-to-b md:bg-gradient-to-r from-[var(--bg-secondary)] from-50% to-[var(--bg-tertiary)] to-50% font-custom-main text-black flex flex-col items-center">
            <section className="flex-1 flex flex-col justify-around items-center w-full px-4 md:px-0 md:flex-row">
                <div className="flex justify-center items-center md:w-1/2">
                    <img 
                        className="h-24 w-auto md:hidden" 
                        src="/Vibesss_logo.png" 
                        alt="Logo Vibesss" 
                    />

                    <img 
                        className="hidden md:block h-auto w-full md:max-w-[600px] rounded-lg shadow-lg" 
                        src="/img-auth.jpg" 
                        alt="Vibesss Illustration" 
                    />
                </div>
                
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="h-fit w-full md:max-w-[50%] bg-white rounded-3xl mb-4 pt-6">
                        <h2 align="center" className="font-custom-title font-black text-2xl uppercase">{config.title}</h2>
                        <p align="center" className="font-medium text-l pb-6">{config.subtitle}</p>
                        
                        <form method="POST" className="flex flex-col gap-4 px-6">
                            {/* Champ Pseudo - Affiché uniquement en Inscription */}
                            {isRegister && (
                                <div className="flex flex-col">
                                    <label className="font-medium" htmlFor="pseudo">Pseudo</label>
                                    <input 
                                        className="px-4 py-3 rounded-full input-bg-color border-neutral-400 focus:outline-brand-primary" 
                                        type="text" 
                                        id="pseudo"
                                        placeholder="Votre-pseudo"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col">
                                <label className="font-medium" htmlFor="email">E-mail</label>
                                <input 
                                    className="px-4 py-3 rounded-full input-bg-color border-neutral-400 focus:outline-brand-primary" 
                                    type="email" 
                                    id="email"
                                    placeholder="votreadresse@email.com"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-medium" htmlFor="password">Mot de passe</label>
                                <div className="relative flex items-center">
                                    <input 
                                        className="w-full px-4 py-3 rounded-full input-bg-color border-neutral-400 pr-12 focus:outline-brand-primary" 
                                        type={showPassword ? "text" : "password"} 
                                        id="password"
                                        placeholder="●●●●●●●●●●●●●"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 text-neutral-500 hover:text-black cursor-pointer"
                                    >
                                        {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Champ Confirmation - Affiché uniquement en Inscription */}
                            {isRegister && (
                                <div className="flex flex-col">
                                    <label className="font-medium" htmlFor="confirmPassword">Confirmation du mot de passe</label>
                                    <div className="relative flex items-center">
                                        <input 
                                            className="w-full px-4 py-3 rounded-full input-bg-color border-neutral-400 pr-12 focus:outline-brand-primary" 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            id="confirmPassword"
                                            placeholder="●●●●●●●●●●●●●"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 text-neutral-500 hover:text-black cursor-pointer"
                                        >
                                            {showConfirmPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Bouton de soumission stylisé */}
                            <button 
                                type="submit"
                                className="mt-4 bg-[var(--bg-cinquo)] text-white py-3 rounded-full font-bold uppercase hover:bg-[var(--bg-quatro)] hover:text-black transition-colors cursor-pointer"
                            >
                                {config.buttonText}
                            </button>

                            {/* Lien pour basculer entre Login et Register */}
                            <p className="text-center mt-4 text-sm pb-6">
                                {config.switchText}{" "}
                                <Link to={config.switchLink} className="font-bold underline">
                                    {config.switchAction}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AuthForm;