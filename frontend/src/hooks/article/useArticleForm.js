import { useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import { useNavigate } from 'react-router';

export function useArticleForm(onContentChange, blogId) {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState('draft');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success'});

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    // Configuration de l'éditeur Tiptap (sans l'extension Image pour le moment)
    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount
        ],
        content: `
        <h1>Titre de votre Vibe...</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod tempor incididunt ut labores et dolore magna aliqua.</p>
        `,
        editorProps: {
            attributes: {
                class: 'focus:outline-none text-black min-h-[calc(100vh-200px)] sm:min-h-[400px] w-full prose max-w-none prose-headings:font-serif [&_ol]:list-decimal [&_ul]:list-disc [&_blockquote]:border-l-4 [&_blockquote]:border-[#E76F85] [&_blockquote]:pl-4 [&_blockquote]:italic',
            }
        },
        onUpdate: ({ editor }) => onContentChange?.(editor.getHTML()),
    });

    // Fonctions d'images temporairement désactivées
    const handleImageButtonClick = () => {
        triggerToast("Le téléversement d'images est temporairement désactivé.", "error");
    };

    const handleFileChange = (event) => {
        event.target.value = '';
    };

    // FONCTION DE PUBLICATION CONNECTÉE AU BACKEND
    const handlePublish = async () => {
        if (!editor) return;
        const fullHtml = editor.getHTML();
        
        if (!fullHtml || fullHtml.trim() === '' || fullHtml === '<p></p>') {
            return triggerToast("Votre article est vide !", "error");
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(fullHtml, 'text/html');
        
        // Extraction du titre
        const h1Element = doc.querySelector('h1');
        const title = h1Element ? h1Element.textContent : "Sans titre";
        if (h1Element) h1Element.remove();
        const contentText = doc.body.innerHTML;

        const articleData = {
            title: title,
            content_text: contentText,
            content_image: "default_article.jpg", 
            status: "published",
            blog_id: parseInt(blogId, 10)
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/articles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", 
                body: JSON.stringify(articleData)
            });

            if (response.ok) {
                setStatus('published');
                triggerToast("Article publié avec succès !", "success");
                
                setTimeout(() => {
                    navigate(`/create/mon-blog/${blogId}`);
                }, 1500);
            } else {
                triggerToast("Erreur lors de la publication sur le serveur.", "error");
            }
        } catch (err) {
            console.error(err);
            triggerToast("Impossible de joindre le serveur.", "error");
        }
    };

    const handleSaveDraft = () => {
        setStatus('draft');
        triggerToast('Brouillon enregistré avec succès !', "success");
    };

    return {
        editor,
        fileInputRef,
        status,
        toast,
        handleImageButtonClick,
        handleFileChange,
        handlePublish,
        handleSaveDraft,
        navigate
    };
}