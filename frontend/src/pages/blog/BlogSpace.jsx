import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; 
import { Heart, ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { useBlogSpace } from '../../hooks/blog/useBlogSpace';
import { usePagination } from '../../hooks/usePagination';
import ArticleModal from '../../components/blog/ArticleModal';
import { useAuth } from '../../services/AuthContext';
import ReportModal from '../../components/layout/ReportModal';

const BlogSpace = ({ isOwner }) => {
    const navigate = useNavigate(); 
    const [isBlogReportOpen, setIsBlogReportOpen] = useState(false);
    const { user } = useAuth();

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

    const {
        currentItems,
        currentPage,
        totalPages,
        nextPage,
        prevPage
    } = usePagination(articles, 3);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        if (blogInfos?.title && blogInfos.title !== "Chargement...") {
            document.title = `${blogInfos.title} - Vibesss`;
        }
    }, [blogInfos]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg-color)]">
                <span className="loading loading-spinner loading-lg text-[#e99fb4]"></span>
            </div>
        );
    }

    const borderColors = [
        "border-[var(--primary-color)]",
        "border-[var(--secondary-color)]",
        "border-[var(--accent-color)]",
        "border-[var(--success-color)]",
        "border-[var(--category-color)]"
    ];

    return (
        <div className="w-full min-h-screen bg-[var(--bg-color)] px-4 sm:px-8 md:px-12 py-8 md:py-12 font-custom-main text-black flex flex-col justify-between">
            
            <div>
                {/* En-tête du blog */}
                <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4 pb-6 mt-12 md:mt-16">
                    
                    {/* BOUTON GAUCHE : Retour aux blogs */}
                    <div className="w-full md:w-48 flex justify-center md:justify-start order-2 md:order-1 max-w-xs mx-auto md:max-w-none md:mb-1">
                        <button 
                            onClick={() => navigate('/create/mes-blogs')} 
                            className="flex items-center gap-2 bg-[var(--secondary-color)] hover:bg-black text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all duration-300 ease-in-out cursor-pointer w-full md:w-auto justify-center"
                        >
                            <ArrowLeft size={16} />
                            <span>Mes blogs</span>
                        </button>
                    </div>

                    {/* TITRE AU MILIEU */}
                    <h1 className="font-custom-title font-black text-3xl sm:text-5xl md:text-7xl text-black text-center flex-1 order-1 md:order-2 tracking-tight mt-6 md:mt-0">
                        {blogInfos.title}
                    </h1>
                    
                    {/* BOUTON DROITE : Ajouter un article */}
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

                {/* Méta-données */}
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
                                        <button 
                                            onClick={() => setIsBlogReportOpen(true)}
                                            className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-red-500 transition-colors uppercase font-bold tracking-wider cursor-pointer bg-transparent border-none p-0 font-sans"
                                        >
                                            <Flag size={10} /> Signaler le blog
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <p className="text-neutral-500 font-medium text-sm sm:text-base leading-relaxed px-2">
                        {blogInfos.description}
                    </p>
                </div>

                {/* Grille Galerie */}
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
                                    <h3 className="font-custom-title font-bold text-lg text-black mt-1 mb-3 leading-tight">{article.title}</h3>
                                </div>

                                <div className="flex justify-between items-center text-xs text-neutral-400 pt-1">
                                    <span>{article.date}</span>
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <button onClick={(e) => handleLike(e, article.id)} className="cursor-pointer transition-transform active:scale-90 flex items-center bg-transparent border-none p-0">
                                                <Heart size={15} className={isCurrentlyLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400 hover:text-red-500'} />
                                            </button>
                                            <span className={isCurrentlyLiked ? 'text-black font-semibold' : ''}>{article.likes}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <MessageCircle size={15} className="text-neutral-400" />
                                            <span>{article.comments ? article.comments.length : 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bloc Pagination */}
            {totalPages > 1 && (
                <div className="max-w-6xl mx-auto w-full flex justify-center items-center gap-6 mt-16 text-sm text-neutral-400 font-medium">
                    <button 
                        onClick={prevPage} 
                        disabled={currentPage === 1}
                        className="p-2 bg-white rounded-full border border-neutral-100 shadow-sm text-black hover:bg-black hover:text-white transition disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black cursor-pointer"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    
                    <span className="select-none text-xs tracking-widest font-bold text-black">
                        PAGE {currentPage} SUR {totalPages}
                    </span>

                    <button 
                        onClick={nextPage} 
                        disabled={currentPage === totalPages}
                        className="p-2 bg-white rounded-full border border-neutral-100 shadow-sm text-black hover:bg-black hover:text-white transition disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black cursor-pointer"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            {/* Modals */}
            <ArticleModal article={selectedArticle} onClose={closeArticle} />

            <ReportModal 
                isOpen={isBlogReportOpen}
                onClose={() => setIsBlogReportOpen(false)}
                targetType="blog"
                targetId={blogInfos.id}
                userId={user?.id}
            />

        </div>
    );
};

export default BlogSpace;