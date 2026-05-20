    import React from 'react';
    import EditorContainer from '../components/article/EditorContainer';

    const CreateArticle = () => {
    return (
        <div className="w-full min-h-screen bg-[#FBF7EE] sm:bg-gradient-to-r sm:from-[#FBC3D1] sm:from-50% sm:to-[#8CD6DC] sm:to-50% flex flex-col items-center font-sans sm:pt-12">
        <div className="w-full max-w-5xl flex flex-col h-full sm:h-auto px-0 sm:px-4">
            {/* L'éditeur s'occupe maintenant de tout (actions, menu, texte) */}
            <EditorContainer onContentChange={(html) => console.log("Content updated")} />
        </div>
        </div>
    );
    };

    export default CreateArticle;