    import React from 'react';
    import { EditorContent } from '@tiptap/react';
    import { useArticleForm } from '../../hooks/article/useArticleForm';
    import EditorHeader from './EditorHeader';
    import EditorToolbar from './EditorToolbar';

    export default function EditorContainer({ onContentChange }) {
    const {
        editor,
        fileInputRef,
        handleImageButtonClick,
        handleFileChange,
        handlePublish,
        handleSaveDraft,
        navigate
    } = useArticleForm(onContentChange);

    if (!editor) return null;

    return (
        <div className="w-full bg-[#FBF7EE] sm:rounded-3xl overflow-hidden flex flex-col sm:border sm:border-black/5 min-h-[calc(100vh-20px)] sm:min-h-0 relative">
        
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