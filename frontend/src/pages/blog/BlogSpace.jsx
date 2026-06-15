// [frontend/src/pages/blog/BlogSpace.jsx](frontend/src/pages/blog/BlogSpace.jsx)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; 
import { Heart, ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Flag, Trash2 } from 'lucide-react';
import { useBlogSpace } from '../../hooks/blog/useBlogSpace';
import { usePagination } from '../../hooks/usePagination';
import ArticleModal from '../../components/blog/ArticleModal';
import { useAuth } from '../../services/AuthContext';
import ReportModal from '../../components/layout/ReportModal';
import { checkIsAdmin } from '../../utils/adminUtils'; // Import de l'utilitaire

const BlogSpace = ({ isOwner }) => {
    const navigate = useNavigate(); 
    const [isBlogReportOpen, setIsBlogReportOpen] = useState(false);
    const { user } = useAuth();
    const isSystemAdministrator = checkIsAdmin(user); // Vérification Admin

    const {
        blogInfos,
        articles,
        likedArticles,
        selectedArticle,
        handleLike,
        openArticle,
        closeArticle,
        isLoading 
    } = useBlogSpace();

    const { currentItems, currentPage, totalPages, nextPage, prevPage } = usePagination(articles, 3);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        if (blogInfos?.title && blogInfos.title !== "Chargement...") {
            document.title = `${blogInfos.title} - Vibesss`;
        }
    }, [blogInfos]);

    const handlePermanentBlogDeletion = async () => {
        const doubleCheck = window.confirm("ATTENTION : Vous allez supprimer ce BLOG ainsi que TOUS LES ARTICLES associés. Cette action est irréversible. Confirmer ?");
        
        if (doubleCheck) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogInfos.id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });

                if (response.ok) {
                    alert("Le blog a été supprimé definitivement.");
                    navigate('/explorer');
                }
            } catch (error) {
                console.error("Erreur suppression blog:", error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color)]">
                <span className="loading loading-spinner loading-lg text-[#e99fb4]"></span>
            </div>
        );
    }

    const borderColors = ["border-[var(--primary-color)]", "border-[var(--secondary-color)]", "border-[var(--accent-color)]", "border-[var(--success-color)]", "border-[var(--category-color)]"];

    return (
        <div className="w-full min-h-screen bg-[var(--bg-color)] px-4 sm:px-8 md:px-12 py-8 md:py-12 font-custom-main text-black flex flex-col justify-between">
            <div>
                <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4 pb-6 mt-12 md:mt-16">
                    <div className="w-full md:w-48 flex justify-center md:justify-start order-2 md:order-1 max-w-xs mx-auto md:max-w-none md:mb-1">
                        <button 
                            onClick={() => {
                                if (isOwner && user) navigate(`/profile/${user.pseudo}`);
                                else navigate('/explorer');
                            }} 
                            className="flex items-center gap-2 bg-[var(--secondary-color)] hover:bg-black text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all duration-300 ease-in-out cursor-pointer w-full md:w-auto justify-center"
                        >
                            <ArrowLeft size={16} />
                            <span>{isOwner ? "Mon Profil" : "Explorer"}</span>
                        </button>
                    </div>

                    <h1 className="font-custom-title font-black text-3xl sm:text-5xl md:text-7xl text-black text-center flex-1 order-1 md:order-2 tracking-tight mt-6 md:mt-0">
                        {blogInfos.title}
                    </h1>
                    
                    <div className="w-full md:w-48 flex justify-center md:justify-end order-3 max-w-xs mx-auto md:max-w-none md:mb-1">
                        {isOwner && (
                            <button 
                                onClick={() => navigate(`/create/blogs/${blogInfos.id}/article`)}
                                className="flex items-center gap-2 bg-black hover:bg-[var(--custom-btn-color)] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all duration-300 ease-in-out cursor-pointer w-full md:w-auto justify-center"
                            >
                                <span className="text-lg font-light leading-none">+</span>
                                <span>Ajouter un article</span>
                            </button>
                        )}
                    </div>
                </header>

                <div className="max-w-xl mx-auto text-center mb-12">
                    <div className="flex justify-center items-center gap-2 text-xs text-neutral-400 mb-4 font-medium">
                        <span>{blogInfos.creationDate}</span>
                        <span className="text-neutral-300">•</span>
                        <span className="bg-[var(--hover-color)] text-[var(--custom-btn-color)] px-3 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
                            {blogInfos.mainCategory}
                        </span>
                        {!isOwner && (
                            <>
                                <span className="text-neutral-300">•</span>
                                <span className="italic font-custom-main-italic">Par {blogInfos.author}</span>
                                {user && (
                                    <>
                                        <span className="text-neutral-300">•</span>
                                        <div className="inline-flex items-center gap-4">
                                            <button 
                                                onClick={() => setIsBlogReportOpen(true)}
                                                className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-red-500 transition-colors uppercase font-bold tracking-wider cursor-pointer bg-transparent border-none p-0 font-sans"
                                            >
                                                <Flag size={10} /> Signaler le blog
                                            </button>

                                            {isSystemAdministrator && (
                                                <button 
                                                    onClick={handlePermanentBlogDeletion}
                                                    className="flex items-center gap-1 text-[10px] text-red-600 hover:text-red-800 transition-colors uppercase font-bold tracking-wider cursor-pointer bg-transparent border-none p-0 font-sans"
                                                >
                                                    <Trash2 size={10} /> Supprimer le blog (Admin)
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <p className="text-neutral-500 font-medium text-sm sm:text-base leading-relaxed px-2">
                        {blogInfos.description}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                    {currentItems.map((article, index) => {
                        const currentBorder = borderColors[index % borderColors.length];
                        const isCurrentlyLiked = likedArticles[article.id];
                        return (
                            <div 
                                key={article.id} 
                                onClick={() => openArticle(article)} 
                                className={`break-inside-avoid bg-white rounded-2xl border-2 ${currentBorder} shadow-sm overflow-hidden p-4 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] cursor-pointer`}
                            >
                                <div>
                                    <div className="w-full h-auto rounded-xl overflow-hidden mb-3">
                                        <img src={article.cover_picture} alt={article.title} className="w-full h-full object-cover max-h-64" loading="lazy" />
                                    </div>
                                    <span className="text-[10px] font-bold tracking-wider text-[var(--custom-btn-color)] uppercase">{article.category}</span>
                                    <h3 className="font-custom-title font-black text-xl text-black mt-1 mb-2 leading-tight">{article.title}</h3>
                                    <p className="text-neutral-500 text-xs line-clamp-3 mb-4">{article.content}</p>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-neutral-50">
                                    <span className="text-[10px] text-neutral-400 font-medium italic">{article.date}</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={(e) => { e.stopPropagation(); handleLike(article.id); }} className={`flex items-center gap-1 transition-colors ${isCurrentlyLiked ? 'text-red-500' : 'text-neutral-300 hover:text-red-400'}`}>
                                            <Heart size={14} fill={isCurrentlyLiked ? "currentColor" : "none"} />
                                            <span className="text-[10px] font-bold">{article.likes + (isCurrentlyLiked ? 1 : 0)}</span>
                                        </button>
                                        <div className="flex items-center gap-1 text-neutral-300">
                                            <MessageCircle size={14} />
                                            <span className="text-[10px] font-bold">{article.comments?.length || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12 pb-8">
                        <button onClick={prevPage} disabled={currentPage === 1} className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-400 disabled:opacity-30 hover:bg-neutral-50 transition-colors"><ChevronLeft size={20} /></button>
                        <span className="text-sm font-bold text-neutral-500">Page {currentPage} sur {totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages} className="p-2 rounded-full bg-white border border-neutral-200 text-neutral-400 disabled:opacity-30 hover:bg-neutral-50 transition-colors"><ChevronRight size={20} /></button>
                    </div>
                )}
            </div>

            <ArticleModal article={selectedArticle} onClose={closeArticle} />
            <ReportModal isOpen={isBlogReportOpen} onClose={() => setIsBlogReportOpen(false)} targetType="blog" targetId={blogInfos.id} userId={user?.id} />
        </div>
    );
};

export default BlogSpace;