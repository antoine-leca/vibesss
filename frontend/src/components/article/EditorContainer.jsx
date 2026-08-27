import React from 'react';
import { EditorContent } from '@tiptap/react';
import { useArticleForm } from '../../hooks/article/useArticleForm';
import EditorHeader from './EditorHeader';
import EditorToolbar from './EditorToolbar';

export default function EditorContainer({ onContentChange, blogId }) {
    const {
        editor,
        fileInputRef,
        toast,
        handleImageButtonClick,
        handleFileChange,
        handlePublish,
        handleSaveDraft,
        navigate
    } = useArticleForm(onContentChange, blogId);

    if (!editor) return null;

    return (
        <div className="w-full bg-[#FBF7EE] sm:rounded-3xl overflow-hidden flex flex-col sm:border sm:border-black/5 min-h-[calc(100vh-200px)] sm:min-h-0 relative">
            
            {/* Input de fichier caché */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
            />

            {/* Barre supérieure noire */}
            <EditorHeader 
                editor={editor} 
                onPublish={handlePublish} 
                onSaveDraft={handleSaveDraft} 
                onNavigate={navigate} 
            />

            {/* Zone de saisie principale + Outils */}
            <div className="flex flex-col sm:flex-row flex-1 p-4 sm:p-12 gap-6 sm:gap-10 w-full relative items-start">
                <EditorToolbar editor={editor} onImageClick={handleImageButtonClick} />

                <div className="flex-1 w-full pt-1 px-2 pb-24 sm:pb-0">
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* TOAST MAISON ADAPTÉ POUR MOBILE & DESKTOP */}
            {toast.show && (
                <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 sm:max-w-md z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl font-medium animate-in fade-in slide-in-from-top-4 duration-300 ${
                    toast.type === 'error' 
                        ? 'bg-[#FFF5F5] border-[#E76F85]/30 text-[#E76F85]' 
                        : 'bg-[#F2F9F3] border-emerald-500/20 text-emerald-700'
                }`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${toast.type === 'error' ? 'bg-[#E76F85]' : 'bg-emerald-500'}`} />
                    <span className="text-sm leading-tight">{toast.message}</span>
                </div>
            )}

            {/* Footer Statistiques */}
            <div className="bg-[#FBF7EE] px-4 sm:px-12 py-3 flex justify-between items-center text-[10px] text-black/40 font-medium border-t border-black/5 select-none sm:mb-0 mb-16">
                <div className="flex gap-4">
                    <span>Mots : {editor.storage.characterCount?.words?.() || 0}</span>
                    <span className="hidden sm:inline">Temps : {Math.ceil((editor.storage.characterCount?.words?.() || 0) / 200)} min</span>
                </div>
                <span>Sauvegarde auto activée</span>
            </div>
        </div>
    );
}