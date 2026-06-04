import React, { useState } from 'react';
import { X, MessageSquare, ChevronDown, ChevronUp, Flag } from 'lucide-react';
import CommentSection from '../comments/CommentSection'; // Chemin d'accès vers Pharell
import { useAuth } from '../../services/AuthContext';
import ReportModal from '../layout/ReportModal';

export default function ArticleModal({ article, onClose }) {
    const [showComments, setShowComments] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const { user } = useAuth();

    if (!article) return null;

    return (
        <>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn">
        <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            
            {/* Bouton Fermer */}
            <div className="absolute right-6 top-6 flex items-center gap-2">
                {user && (
                    <button 
                        onClick={() => setIsReportOpen(true)}
                        className="text-neutral-400 hover:text-red-500 bg-neutral-100 p-2 rounded-full cursor-pointer transition"
                        title="Signaler cet article"
                    >
                        <Flag size={18} />
                    </button>
                )}
                
                <button 
                    onClick={onClose} 
                    className="text-neutral-400 hover:text-black bg-neutral-100 p-2 rounded-full cursor-pointer transition"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Méta-données */}
            <div className="text-xs font-bold tracking-wider text-[var(--custom-btn-color)] uppercase mb-2">
            {article.category} • <span className="text-neutral-400 font-normal">{article.date}</span>
            </div>

            {/* Titre */}
            <h2 className="font-custom-title font-black text-3xl sm:text-4xl text-black mb-6 leading-tight">
            {article.title}
            </h2>

            {/* Image de Couverture */}
            <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-6 shadow-sm">
            <img src={article.cover_picture} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Contenu / Description */}
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-8 font-light whitespace-pre-line">
            {article.content}
            </p>

            <hr className="border-neutral-100 mb-6" />

            {/* Accordéon Commentaires */}
            <button 
            onClick={() => setShowComments(!showComments)} 
            className="w-full flex items-center justify-between py-3 px-5 bg-neutral-50 hover:bg-neutral-100 rounded-xl font-bold text-sm text-gray-700 cursor-pointer transition"
            >
            <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-neutral-500" />
                <span>Voir l'espace discussion ({article.comments ? article.comments.length : 0})</span>
            </div>
            {showComments ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Zone des Commentaires */}
            {/* On transmet le bon ID pour que le fetch et l'envoi de commentaire fonctionnent */}
            {showComments && <CommentSection articleId={article.id} />}

        </div>
        </div>
        <ReportModal 
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
            targetType="article"
            targetId={article.id}
            userId={user?.id}
            />
    </>
    );
}