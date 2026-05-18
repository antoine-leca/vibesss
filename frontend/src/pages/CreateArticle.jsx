    import React, { useState } from 'react';
    import { useNavigate } from 'react-router';
    import { Link } from 'react-router';
    import EditorContainer from '../components/article/EditorContainer';

    const CreateArticle = () => {
    const navigate = useNavigate();
    const [articleContent, setArticleContent] = useState('');

    const handlePublish = async () => {
        if (!articleContent || articleContent.trim() === '') {
        alert("Votre article est vide, écrivez un peu de texte avant de publier !");
        return;
        }
        alert("Félicitations, votre Vibe a été publiée !");
        navigate('/'); 
    };

    return (
        // Sur mobile : bg crème pur et pas de padding. Sur PC : dégradé rose/bleu et centré.
        <div className="w-full min-h-screen bg-[#FBF7EE] sm:bg-gradient-to-r sm:from-[#FBC3D1] sm:from-50% sm:to-[#8CD6DC] sm:to-50% flex flex-col items-center font-sans sm:pt-12 pb-4 sm:pb-12">
        
        <div className="w-full max-w-5xl flex flex-col gap-4 sm:gap-6 h-full sm:h-auto px-0 sm:px-4">
            
            {/* L'ÉDITEUR STUDIO VIBESSS */}
            <EditorContainer onContentChange={setArticleContent} />

            {/* LES ACTIONS TOUT EN BAS */}
            <div className="flex w-full justify-between items-center text-xs sm:text-sm font-semibold text-black select-none px-4 sm:px-2 pb-20 sm:pb-0">
            <Link to="/" className="text-black/60 hover:text-black transition-colors flex items-center gap-1">
                <span className="text-base">←</span> Quitter l'éditeur
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
                <button type="button" className="hover:opacity-75 transition-opacity cursor-pointer font-medium text-black">
                Enregistrer le brouillon
                </button>
                
                <button 
                type="button"
                onClick={handlePublish}
                className="bg-[#E76F85] text-white px-4 sm:px-5 py-2 rounded-xl shadow-md hover:bg-[#d45d73] transition-colors cursor-pointer tracking-wide font-bold"
                >
                Publier
                </button>
            </div>
            </div>

        </div>
        </div>
    );
    };

    export default CreateArticle;