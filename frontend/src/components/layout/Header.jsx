import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../services/AuthContext";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsOpen(false);
        await logout();
        navigate("/");
    };

    return (
        <header className="w-full bg-[var(--bg-quatro)] text-black font-sans fixed top-0 left-0 z-50 shadow-xs">
            <div className="w-full h-[61px] flex items-center justify-between px-6 box-border">
                {/* Logo */}
                <div className="w-1/4 flex justify-start items-center">
                    <Link to="/" className="flex items-center h-[50px]"> 
                        <img src="/Vibesss_logo.png" alt="Vibesss Logo" className="h-full w-auto object-contain" />
                    </Link>
                </div>

                {/* NAVIGATION PC */}
                <nav className="hidden lg:flex items-center justify-center gap-10 flex-1">
                    <Link to="/explorer" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Explorer</Link>
                    <Link to="/a-propos" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">À propos</Link>
                    <Link to="/create/blog" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer</Link>
                    <Link to="/create/article" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer un Article</Link>
                </nav>

                <div className="w-1/4 flex justify-end items-center">
                    {/* BOUTONS PC */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-xs font-bold uppercase">Hello, {user.pseudo}</span>
                                <button onClick={handleLogout} className="px-5 py-2 text-xs font-medium bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all cursor-pointer">
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth/login" className="px-5 py-2 text-xs font-medium bg-white rounded-full hover:bg-gray-50 transition-all border border-transparent">
                                    Se connecter
                                </Link>
                                <Link to="/auth/register" className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-black text-white rounded-full hover:bg-gray-900 transition-all">
                                    S'inscrire
                                </Link>
                            </>
                        )}
                    </div>

                    {/* BURGER MOBILE */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* MENU MOBILE FILTRÉ */}
            {isOpen && (
                <div className="lg:hidden w-full bg-white border-t border-gray-100 shadow-xl flex flex-col items-center justify-center py-10 px-6 box-border animate-fadeIn">
                    <nav className="flex flex-col items-center gap-6 w-full">
                        <Link onClick={() => setIsOpen(false)} to="/explorer" className="text-lg font-serif tracking-wide text-gray-950 hover:opacity-60 transition-opacity">Explorer</Link>
                        <Link onClick={() => setIsOpen(false)} to="/a-propos" className="text-lg font-serif tracking-wide text-gray-950 hover:opacity-60 transition-opacity">À propos</Link>
                        <Link to="/create/blog" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer</Link>
                        <Link to="/create/article" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer un Article</Link>
                        
                        <div className="w-12 h-[1px] bg-gray-200 my-2"></div>

                        {user ? (
                            <>
                                <span className="text-sm font-sans font-bold uppercase tracking-widest text-black">
                                    {user.pseudo}
                                </span>
                                <button 
                                    onClick={handleLogout} 
                                    className="text-sm font-sans font-medium uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                >
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link onClick={() => setIsOpen(false)} to="/auth/login" className="text-sm font-sans font-medium uppercase tracking-widest text-gray-700 hover:text-black transition-colors">
                                    Se connecter
                                </Link>
                                <Link onClick={() => setIsOpen(false)} to="/auth/register" className="text-sm font-sans font-bold uppercase tracking-widest text-black hover:opacity-70 transition-opacity">
                                    S'inscrire
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;