import { Bell, Heart, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../services/AuthContext";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNotifs, setShowNotifs] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [hasBlog, setHasBlog] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Récupérer le nombre de non lus et vérifier si l'utilisateur possède un blog
    useEffect(() => {
        if (user) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/notifications/unread/${user.id}`)
                .then(res => res.json())
                .then(data => setUnreadCount(data.length))
                .catch(err => console.error(err));

            fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/user/${user.id}`)
                .then(res => res.json())
                .then(data => setHasBlog(data && data.length > 0))
                .catch(err => console.error(err));
        } else {
            setHasBlog(false);
        }
    }, [user]);

    // Fermer le dropdown si on clique ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNotifs(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleNotifs = () => {
        if (!showNotifs && user) {
            // Charger les détails quand on ouvre
            fetch(`${import.meta.env.VITE_BACKEND_URL}/notifications/user/${user.id}`)
                .then(res => res.json())
                .then(data => setNotifications(data))
                .catch(err => console.error(err));
        }
        setShowNotifs(!showNotifs);
    };

    const handleMarkAsRead = (id) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/notifications/${id}`, { method: "PUT" })
            .then(() => {
                setUnreadCount(prev => Math.max(0, prev - 1));
                setNotifications(notifications.map(n => n.id === id ? { ...n, read_date: new Date() } : n));
            });
    };

    const handleLogout = async () => {
        setIsOpen(false);
        await logout();
        navigate("/");
    };

    return (
        <header className="w-full bg-[var(--bg-quatro)] text-black font-sans fixed top-0 left-0 z-50 shadow-xs">
            <div className="w-full h-[61px] flex items-center justify-between px-6 box-border">
                {/* Logo... */}
                <div className="w-1/4 flex justify-start items-center">
                    <Link to="/" className="flex items-center h-[50px]"> 
                        <img src="/Vibesss_logo.png" alt="Vibesss Logo" className="h-full w-auto object-contain" />
                    </Link>
                </div>

                {/* NAVIGATION PC */}
                <nav className="hidden lg:flex items-center justify-center gap-10 flex-1">
                    <Link to="/explorer" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Explorer</Link>
                    <Link to="/a-propos" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">À propos</Link>
                    {user && (
                        <Link to={`/profile/${user.id}`} className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity text-[#E99FB4]">Mon Profil</Link>
                    )}
                    {!user ? (
                        <>
                            <Link to="/create/blog" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer un Blog</Link>
                            <Link to="/create/article" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer un Article</Link>
                        </>
                    ) : hasBlog ? (
                        <>
                            <Link to="/create/mes-blogs" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Mon Blog</Link>
                            <Link to="/create/article" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer un Article</Link>
                        </>
                    ) : (
                        <Link to="/create/blog" className="text-xs font-semibold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">Créer un Blog</Link>
                    )}
                </nav>

                <div className="w-1/4 flex justify-end items-center gap-6">
                    {/* CLOCHE + DROPDOWN */}
                    {user && (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={toggleNotifs} className="relative cursor-pointer hover:opacity-70 transition-opacity pt-1">
                                <Bell size={20} strokeWidth={2} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-[var(--bg-quatro)]">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* LE DROPDOWN */}
                            {showNotifs && (
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                                    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                        <h3 className="font-bold text-sm">Notifications</h3>
                                    </div>
                                    <div className="max-h-[400px] overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <p className="p-8 text-center text-gray-400 text-sm">Aucune notification</p>
                                        ) : (
                                            notifications.map(notif => (
                                                <div 
                                                    key={notif.id} 
                                                    onClick={() => !notif.read_date && handleMarkAsRead(notif.id)}
                                                    className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 ${!notif.read_date ? 'bg-blue-50/30' : ''}`}
                                                >
                                                    <div className={`mt-1 p-1.5 rounded-full ${notif.notif_type === 'like' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                                        {notif.notif_type === 'like' ? <Heart size={14} fill={!notif.read_date ? "currentColor" : "none"} /> : <MessageSquare size={14} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[13px] leading-tight text-gray-800">
                                                            <span className="font-bold">{notif.sender_pseudo}</span> {notif.notif_type === 'like' ? 'a aimé' : 'a commenté'} ton article <span className="italic font-medium text-gray-600">"{notif.article_title}"</span>
                                                        </p>
                                                        {!notif.read_date && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* BOUTONS CONNEXION... */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to={`/profile/${user.pseudo}`} className="text-xs font-bold uppercase hover:opacity-70 transition-opacity">
                                    Hello, {user.pseudo}
                                </Link>
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
                        {user && (
                            <Link onClick={() => setIsOpen(false)} to={`/profile/${user.id}`} className="text-lg font-serif tracking-wide text-[var(--primary-color)] hover:opacity-60 transition-opacity">Mon Profil</Link>
                        )}
                        {!user ? (
                            <>
                                <Link onClick={() => setIsOpen(false)} to="/create/blog" className="text-lg font-serif tracking-wide text-gray-950 hover:opacity-60 transition-opacity">Créer un Blog</Link>
                                <Link onClick={() => setIsOpen(false)} to="/create/article" className="text-lg font-serif tracking-wide text-gray-950 hover:opacity-60 transition-opacity">Créer un Article</Link>
                            </>
                        ) : hasBlog ? (
                            <>
                                <Link onClick={() => setIsOpen(false)} to="/create/mes-blogs" className="text-lg font-serif tracking-wide text-gray-950 hover:opacity-60 transition-opacity">Mon Blog</Link>
                                <Link onClick={() => setIsOpen(false)} to="/create/article" className="text-lg font-serif tracking-wide text-gray-950 hover:opacity-60 transition-opacity">Créer un Article</Link>
                            </>
                        ) : (
                            <Link onClick={() => setIsOpen(false)} to="/create/blog" className="text-lg font-serif tracking-wide text-gray-950 hover:opacity-60 transition-opacity">Créer un Blog</Link>
                        )}
                        
                        <div className="w-12 h-[1px] bg-gray-200 my-2"></div>

                        {user ? (
                            <>
                                <Link 
                                    onClick={() => setIsOpen(false)} 
                                    to={`/profile/${user.pseudo}`} 
                                    className="text-sm font-sans font-bold uppercase tracking-widest text-black hover:opacity-70 transition-opacity"
                                >
                                    {user.pseudo}
                                </Link>
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