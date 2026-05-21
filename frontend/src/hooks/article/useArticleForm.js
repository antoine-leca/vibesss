    import { useRef, useState, useEffect } from 'react';
    import { useEditor } from '@tiptap/react';
    import StarterKit from '@tiptap/starter-kit';
    import Image from '@tiptap/extension-image';
    import CharacterCount from '@tiptap/extension-character-count';
    import { useNavigate } from 'react-router';

    export function useArticleForm(onContentChange) {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState('draft');

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
        },
        onUpdate: ({ editor }) => onContentChange?.(editor.getHTML()),
    });

    const handleImageButtonClick = () => fileInputRef.current?.click();

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => editor?.chain().focus().setImage({ src: e.target?.result }).run();
        reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    const handlePublish = () => {
        if (!editor) return;
        const content = editor.getHTML();
        if (!content || content.trim() === '') return alert("Votre article est vide !");
        setStatus('published');
        alert("Article publié avec succès !");
        navigate('/');
    };

    const handleSaveDraft = () => {
        setStatus('draft');
        alert('Brouillon enregistré !');
    };

    return {
        editor,
        fileInputRef,
        status,
        handleImageButtonClick,
        handleFileChange,
        handlePublish,
        handleSaveDraft,
        navigate
    };
    }