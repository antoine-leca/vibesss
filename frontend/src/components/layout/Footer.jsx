    import React from "react";
    import { Link } from "react-router";

    const Footer = () => {
    return (
        <footer className="w-full">
        
        {/* 1. LA VAGUE BLEU PASTEL */}
        <div className="w-full bg-[#A2D2EC] text-white pt-8 pb-12 px-12 font-sans">
            
            <div className="max-w-6xl mx-auto w-full">
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
                <div className="lg:w-1/3 flex flex-col gap-8">
                    <Link to="/" className="inline-flex items-center h-[50px]">
                        <img src="/Vibesss_logo.png" alt="Vibesss Logo" className="h-full w-auto object-contain" />
                    </Link>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-black mb-6">
                            Réseaux
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6.406-11.845a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.032 2.61-.01 3.91-.01.08 1.53.63 3.02 1.59 4.23.95 1.14 2.27 1.89 3.71 2.19v3.91c-1.39-.14-2.73-.71-3.83-1.59-.51-.42-.96-.91-1.33-1.46v7.35c.09 1.94-.49 3.89-1.66 5.42-1.49 1.93-3.87 3.03-6.31 2.92-2.31-.03-4.54-1.09-5.91-2.94-1.57-2.04-1.99-4.78-1.12-7.18A7.47 7.47 0 0 1 8.355 11c.04 1.34.02 2.68.02 4.02-1.33.2-2.52.97-3.23 2.13-.77 1.2-.87 2.74-.27 4.03.62 1.37 2.02 2.29 3.53 2.33 1.35.07 2.69-.53 3.48-1.63.56-.75.83-1.68.81-2.62l.02-19.23h.01z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Pinterest" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.639 0 12.017 0z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30 transition-colors">
                                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:w-2/3">
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-black mb-6">
                            Navigation
                        </h3>
                        <ul className="flex flex-col gap-3 text-center sm:text-left font-normal text-white">
                            <li><Link to="/explorer" className="hover:text-black transition-colors">Explorer</Link></li>
                            <li><Link to="create/blog" className="hover:text-black transition-colors">Créer un Blog</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-black mb-6">
                            Compte
                        </h3>
                        <ul className="flex flex-col gap-3 text-center sm:text-left font-normal text-white">
                            <li><Link to="auth/register" className="hover:text-black transition-colors">Inscription</Link></li>
                            <li><Link to="auth/login" className="hover:text-black transition-colors">Connexion</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 4. TEXTE DU BAS */}
            <div className="mt-20 text-right text-xs text-black/70 font-serif italic tracking-wide">
                Fait avec amour par l'Équipe Vibesss
            </div>

            </div>

        </div>
        </footer>
    );
    };

    export default Footer;