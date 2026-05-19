    import React, { useRef, useEffect, useState } from 'react';
    import { useEditor, EditorContent } from '@tiptap/react';
    import StarterKit from '@tiptap/starter-kit';
    import Image from '@tiptap/extension-image';
    import CharacterCount from '@tiptap/extension-character-count';
    import { Undo2, Redo2, Home, User, Menu, Image as ImageIcon, Code, X, LogOut, Save, Send } from 'lucide-react';
    import { Link, useNavigate } from 'react-router';

    const EditorContainer = ({ onContentChange }) => {
    const fileInputRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Gestion du clavier mobile
    useEffect(() => {
        if (!window.visualViewport) return;
        const handleResize = () => {
        const heightOffset = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(heightOffset > 60 ? heightOffset : 0);
        };
        window.visualViewport.addEventListener('resize', handleResize);
        return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }, []);

    const editor = useEditor({
        extensions: [StarterKit, CharacterCount, Image.configure({ HTMLAttributes: { class: 'rounded-xl max-w-full h-auto my-4 border border-black/10 shadow-sm max-h-[300px] object-cover' } })],
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

    if (!editor) return null;

    const handleImageButtonClick = () => fileInputRef.current?.click();

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => editor.chain().focus().setImage({ src: e.target?.result }).run();
        reader.readAsDataURL(file);
        }
        event.target.value = '';
    };

    const handlePublish = () => {
        const content = editor.getHTML();
        if (!content || content.trim() === '') return alert("Votre article est vide !");
        alert("Article publié avec succès !");
        navigate('/');
    };

    return (
        <div className="w-full bg-[#FBF7EE] sm:rounded-3xl overflow-hidden flex flex-col sm:border sm:border-black/5 min-h-[calc(100vh-20px)] sm:min-h-0 relative">
        
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        {/* BARRE NOIRE AVEC MENU DROPDOWN DAISYUI */}
        <div className="flex bg-[#0D0D0D] text-white h-14 px-4 sm:px-6 items-center justify-between select-none relative z-[100]">
            <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="text-white cursor-pointer hover:text-[#E76F85] transition-colors"><Home size={18} /></Link>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wide">Vibesss</span>
            <div className="flex items-center gap-3 sm:gap-4 ml-1 sm:ml-4 border-l border-white/20 pl-3 sm:pl-4">
                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="text-white disabled:opacity-20 cursor-pointer"><Undo2 size={16} strokeWidth={2.5} /></button>
                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="text-white disabled:opacity-20 cursor-pointer"><Redo2 size={16} strokeWidth={2.5} /></button>
            </div>
            </div>

            <div className="flex items-center gap-4 relative">
            <button className="text-white cursor-pointer hover:text-[#E76F85]"><User size={18} /></button>
            
            {/* DECLENCHEUR DU MENU */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`cursor-pointer transition-colors ${isMenuOpen ? 'text-[#E76F85]' : 'text-white'}`}
            >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* INTEGRATION COMPOSANT MENU DAISYUI */}
            {isMenuOpen && (
                <div ref={menuRef} className="absolute top-10 right-0 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                <ul className="menu bg-white text-black rounded-box w-60 p-2 border border-black/5">
                    <li className="menu-title text-[10px] uppercase tracking-widest text-black/40 font-bold px-4 py-1 select-none">Actions Studio</li>
                    
                    
                    <li className="cursor-pointer">
                    <button onClick={() => { setIsMenuOpen(false); alert('Brouillon enregistré !'); }} className="flex items-center gap-3 py-3 font-semibold text-sm active:bg-black/10 cursor-pointer">
                        <Save size={18} className="text-blue-500" />
                        Enregistrer brouillon
                    </button>
                    </li>
                    
                    <li className="cursor-pointer">
                    <button onClick={handlePublish} className="flex items-center gap-3 py-3 font-semibold text-sm active:bg-black/10 cursor-pointer">
                        <Send size={18} className="text-[#E76F85]" />
                        Publier l'article
                    </button>
                    </li>
                    
                    <div className="h-px bg-black/5 my-1" />
                    
                    <li className="cursor-pointer">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 py-3 font-semibold text-sm text-red-500 hover:bg-red-50 active:bg-red-100 cursor-pointer">
                        <LogOut size={18} />
                        Quitter l'éditeur
                    </button>
                    </li>
                </ul>
                </div>
            )}
            </div>
        </div>

        {/* ÉDITEUR ET CAPSULE OUTILS */}
        <div className="flex flex-col sm:flex-row flex-1 p-4 sm:p-12 gap-6 sm:gap-10 w-full relative items-start">
            <div 
            style={{ bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px' }}
            className="fixed left-0 w-full bg-white p-3 sm:p-2 border-t sm:border border-black/10 sm:border-black/5 flex flex-row justify-around sm:flex-col gap-3 sm:rounded-2xl select-none sm:sticky sm:top-4 sm:w-12 items-center z-50 shadow-xl transition-all"
            >
            <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-[#FEF3C7] text-[#D97706] cursor-pointer hover:brightness-95 ${editor.isActive('heading', { level: 1 }) ? 'ring-2 ring-amber-500' : ''}`}>H1</button>
            <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-[#D1FAE5] text-[#10B981] cursor-pointer hover:brightness-95 ${editor.isActive('bold') ? 'ring-2 ring-emerald-400' : ''}`}>B</button>
            <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif italic text-xs bg-[#F3E8FF] text-[#A855F7] cursor-pointer hover:brightness-95 ${editor.isActive('italic') ? 'ring-2 ring-purple-400' : ''}`}>I</button>
            <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center bg-[#FFEDD5] text-[#EA580C] text-sm font-bold cursor-pointer hover:brightness-95 ${editor.isActive('bulletList') ? 'ring-2 ring-orange-500' : ''}`}>•=</button>
            <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold cursor-pointer hover:brightness-95 ${editor.isActive('orderedList') ? 'ring-2 ring-sky-500' : ''}`}>123</button>
            <button onClick={handleImageButtonClick} className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E0F2FE] text-[#0284C7] cursor-pointer hover:brightness-95"><ImageIcon size={14} /></button>
            <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base bg-[#FEE2E2] text-[#EF4444] cursor-pointer hover:brightness-95 ${editor.isActive('blockquote') ? 'ring-2 ring-red-400' : ''}`}>“</button>
            <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#CCFBF1] text-[#0D9488] cursor-pointer hover:brightness-95 ${editor.isActive('codeBlock') ? 'ring-2 ring-teal-500' : ''}`}><Code size={14} /></button>
            </div>

            <div className="flex-1 w-full pt-1 px-2 pb-24 sm:pb-0">
            <EditorContent editor={editor} />
            </div>
        </div>

        {/* FOOTER STATISTIQUES */}
        <div className="bg-[#FBF7EE] px-4 sm:px-12 py-3 flex justify-between items-center text-[10px] text-black/40 font-medium border-t border-black/5 select-none sm:mb-0 mb-16">
            <div className="flex gap-4">
            <span>Mots : {editor.storage.characterCount?.words?.() || 0}</span>
            <span className="hidden sm:inline">Temps : {Math.ceil((editor.storage.characterCount?.words?.() || 0) / 200)} min</span>
            </div>
            <span>Sauvegarde auto activée</span>
        </div>
        </div>
    );
    };

    export default EditorContainer;