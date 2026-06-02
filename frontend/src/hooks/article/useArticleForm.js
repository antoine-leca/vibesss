import { useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';
import { useNavigate } from 'react-router';

export function useArticleForm(onContentChange) {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState('draft');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success'});

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        // Le message disparaît automatiquement après 3 secondes
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    // Configuration de l'éditeur Tiptap
    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl max-w-full h-auto my-4 border border-black/10 shadow-sm max-h-[300px] object-cover'
                }
            })
        ],
        content: `
        <h1 style="font-size: 2.5rem; font-family: serif; font-weight: bold; color: #000; margin-bottom: 1.5rem; outline: none;">Titre de votre Vibe...</h1>
        <p style="font-size: 1.1rem; font-family: sans-serif; color: #333; line-height: 1.6; margin-bottom: 1rem;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod tempor incididunt ut labores et dolore magna aliqua.</p>
        `,
        editorProps: {
            attributes: {
                class: 'focus:outline-none text-black min-h-[calc(100vh-200px)] sm:min-h-[400px] w-full prose max-w-none prose-headings:font-serif [&_ol]:list-decimal [&_ul]:list-disc [&_blockquote]:border-l-4 [&_blockquote]:border-[#E76F85] [&_blockquote]:pl-4 [&_blockquote]:italic',
            },
            // SÉCURITÉ : Interceptage du glisser-déposer (Drag & Drop)
            handleDrop(view, event, slice, moved) {
                if (!moved && event.dataTransfer?.files?.length) {
                    const file = event.dataTransfer.files[0];
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                    if (!allowedTypes.includes(file.type)) {
                        // Toast Tailwind à la place de l'alert
                        triggerToast("Format non supporté ! Seuls les fichiers JPEG, PNG et WEBP sont acceptés.", "error");
                        return true; // Bloque strictement l'insertion du fichier dans Tiptap
                    }
                }
                return false; // Laisse faire le comportement normal si le format est correct
            }
        },
        onUpdate: ({ editor }) => onContentChange?.(editor.getHTML()),
    });

    const handleImageButtonClick = () => fileInputRef.current?.click();

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        
        if (file) {
            // Validation du type pour le bouton d'upload classique
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

            if (!allowedTypes.includes(file.type)) {
                // Toast Tailwind à la place de l'alert
                triggerToast("Format non supporté ! Seuls les fichiers JPEG, PNG et WEBP sont acceptés.", "error");
                event.target.value = ''; // Réinitialise l'input
                return; // Stoppe l'exécution, l'image n'est pas lue
            }

            const reader = new FileReader();
            reader.onload = (e) => editor?.chain().focus().setImage({ src: e.target?.result }).run();
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    const handlePublish = () => {
        if (!editor) return;
        const content = editor.getHTML();
        if (!content || content.trim() === '') {
            //Toast Tailwind pour l'article vide
            return triggerToast("Votre article est vide !", "error");
        }
        
        setStatus('published');
        // Toast Tailwind pour le succès
        triggerToast("Article publié avec succès !", "success");
        
        // On attend 1,5 seconde que l'utilisateur voie le beau toast avant de changer de page
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    const handleSaveDraft = () => {
        setStatus('draft');
        // Toast Tailwind pour le brouillon
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