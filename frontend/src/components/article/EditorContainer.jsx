    import React, { useRef } from 'react';
    import { useEditor, EditorContent } from '@tiptap/react';
    import CharacterCount from '@tiptap/extension-character-count';
    import StarterKit from '@tiptap/starter-kit';
    import Image from '@tiptap/extension-image';
    import { Undo2, Redo2, Home, User, Menu, Image as ImageIcon, Code } from 'lucide-react';
    import { Link } from 'react-router';

    const EditorContainer = ({ onContentChange }) => {
    const fileInputRef = useRef(null);

    const editor = useEditor({
        extensions: [
        StarterKit,
        CharacterCount,
        Image.configure({
            HTMLAttributes: {
            class: 'rounded-xl max-w-full h-auto my-4 border border-black/10 shadow-sm max-h-[300px] object-cover',
            },
        }),
        ],
        content: `
        <h1 style="font-size: 2rem; font-family: serif; font-weight: bold; color: #000; margin-bottom: 1rem; outline: none;">Titre de votre Vibe...</h1>
        <p style="font-size: 1.1rem; font-family: sans-serif; color: #333; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam euismod tempor incididunt ut labores et dolore magna aliqua.</p>
        `,
        editorProps: {
        attributes: {
            class: 'focus:outline-none text-black min-h-[calc(100vh-250px)] sm:min-h-[400px] w-full prose max-w-none prose-headings:font-serif [&_ol]:list-decimal [&_ul]:list-disc [&_blockquote]:border-l-4 [&_blockquote]:border-[#E76F85] [&_blockquote]:pl-4 [&_blockquote]:italic',
        },
        },
        onUpdate: ({ editor }) => {
        if (onContentChange) {
            onContentChange(editor.getHTML());
        }
        },
    });

    if (!editor) return null;

    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Url = e.target?.result;
            if (typeof base64Url === 'string') {
            editor.chain().focus().setImage({ src: base64Url }).run();
            }
        };
        reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    return (
        // Suppression des arrondis sur mobile pour l'immersion
        <div className="w-full bg-[#FBF7EE] sm:rounded-3xl shadow-none sm:shadow-2xl overflow-hidden flex flex-col sm:border sm:border-black/5 min-h-[calc(100vh-60px)] sm:min-h-0">
        
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        {/* BARRE DE NAVIGATION NOIRE */}
        <div className="flex bg-[#0D0D0D] text-white h-14 px-4 sm:px-6 items-center justify-between select-none">
            <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="text-white cursor-pointer hover:text-[#E76F85] transition-colors">
                <Home size={18} />
            </Link>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wide">Vibesss</span>
            
            <div className="flex items-center gap-3 sm:gap-4 ml-1 sm:ml-4 border-l border-white/20 pl-3 sm:pl-4">
                <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="text-white disabled:opacity-20 cursor-pointer hover:text-[#E76F85] transition-colors"><Undo2 size={16} strokeWidth={2.5} /></button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="text-white disabled:opacity-20 cursor-pointer hover:text-[#E76F85] transition-colors"><Redo2 size={16} strokeWidth={2.5} /></button>
            </div>
            </div>

            <div className="flex items-center gap-4">
            <button type="button" className="text-white cursor-pointer hover:text-[#E76F85] transition-colors"><User size={18} /></button>
            <button type="button" className="text-white cursor-pointer hover:text-[#E76F85] transition-colors"><Menu size={20} /></button>
            </div>
        </div>

        {/* DISPOSITION RESPONSIVE */}
        <div className="flex flex-col sm:flex-row flex-1 p-4 sm:p-12 gap-6 sm:gap-10 w-full relative items-start">
            
            {/* CAPSULE FLOTTANTE : Fixe en bas sur mobile, Sticky sur PC, avec curseur et hover */}
            <div className="fixed bottom-0 left-0 w-full bg-white p-3 sm:p-2 border-t sm:border border-black/10 sm:border-black/5 flex flex-row justify-around sm:flex-col gap-3 sm:rounded-2xl sm:shadow-xl select-none sm:sticky sm:top-4 sm:w-12 items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] sm:shadow-xl">
            <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-[#FEF3C7] text-[#D97706] cursor-pointer hover:brightness-95 hover:shadow-sm transition-all ${editor.isActive('heading', { level: 1 }) ? 'ring-2 ring-amber-500' : ''}`}>H1</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-[#D1FAE5] text-[#10B981] cursor-pointer hover:brightness-95 hover:shadow-sm transition-all ${editor.isActive('bold') ? 'ring-2 ring-emerald-400' : ''}`}>B</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif italic text-xs bg-[#F3E8FF] text-[#A855F7] cursor-pointer hover:brightness-95 hover:shadow-sm transition-all ${editor.isActive('italic') ? 'ring-2 ring-purple-400' : ''}`}>I</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center bg-[#FFEDD5] text-[#EA580C] text-sm font-bold cursor-pointer hover:brightness-95 hover:shadow-sm transition-all ${editor.isActive('bulletList') ? 'ring-2 ring-orange-500' : ''}`}>•=</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold cursor-pointer hover:brightness-95 hover:shadow-sm transition-all ${editor.isActive('orderedList') ? 'ring-2 ring-sky-500' : ''}`}>123</button>
            <button type="button" onClick={handleImageButtonClick} className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E0F2FE] text-[#0284C7] cursor-pointer hover:brightness-95 hover:shadow-sm transition-all"><ImageIcon size={14} /></button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base bg-[#FEE2E2] text-[#EF4444] cursor-pointer hover:brightness-95 hover:shadow-sm transition-all ${editor.isActive('blockquote') ? 'ring-2 ring-red-400' : ''}`}>“</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#CCFBF1] text-[#0D9488] cursor-pointer hover:brightness-95 hover:shadow-sm transition-all ${editor.isActive('codeBlock') ? 'ring-2 ring-teal-500' : ''}`}><Code size={14} /></button>
            </div>

            {/* ZONE DE TEXTE FLUIDE */}
            <div className="flex-1 w-full pt-1 px-2 pb-16 sm:pb-0">
            <EditorContent editor={editor} />
            </div>

        </div>

        {/* LIGNE DES STATISTIQUES */}
        <div className="bg-[#FBF7EE] px-4 sm:px-12 py-3 flex justify-between items-center text-[10px] sm:text-[11px] text-black/40 font-medium border-t border-black/5 select-none mb-14 sm:mb-0">
            <div className="flex gap-4 sm:gap-6">
            <span>Mots : {editor.storage.characterCount?.words?.() || 0}</span>
            <span className="hidden sm:inline">Temps de lecture : {Math.ceil((editor.storage.characterCount?.words?.() || 0) / 200)} min</span>
            </div>
            <div>
            <span>Sauvegardé</span>
            </div>
        </div>

        </div>
    );
    };

    export default EditorContainer;