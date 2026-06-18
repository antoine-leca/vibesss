    import React, { useState, useEffect, useRef } from 'react';
    import { Link } from 'react-router';
    import { Home, User, Menu, X, Undo2, Redo2, Save, Send, LogOut } from 'lucide-react';
    import { useAuth } from '../../services/AuthContext';

    export default function EditorHeader({ editor, onPublish, onSaveDraft, onNavigate }) {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!editor) return null;

    return (
        <div className="flex bg-[#0D0D0D] text-white h-14 px-4 sm:px-6 items-center justify-between select-none relative z-[100]">
        <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="text-white cursor-pointer hover:text-[#E76F85] transition-colors"><Home size={18} /></Link>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wide">Vibesss</span>
            <div className="flex items-center gap-3 sm:gap-4 ml-1 sm:ml-4 pl-3 sm:pl-4">
            <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="text-white disabled:opacity-20 cursor-pointer"><Undo2 size={16} strokeWidth={2.5} /></button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="text-white disabled:opacity-20 cursor-pointer"><Redo2 size={16} strokeWidth={2.5} /></button>
            </div>
        </div>

        <div className="flex items-center gap-4 relative">
            <Link to={`/profile/${user?.pseudo}`} className="text-white cursor-pointer hover:text-[#E76F85]"><User size={18} /></Link>
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`cursor-pointer transition-colors ${isMenuOpen ? 'text-[#E76F85]' : 'text-white'}`}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {isMenuOpen && (
            <div ref={menuRef} className="absolute top-10 right-0 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                <ul className="menu bg-white text-black rounded-box w-60 p-2 border border-black/5">
                <li className="menu-title text-[10px] uppercase tracking-widest text-black/40 font-bold px-4 py-1 select-none">Actions Studio</li>
                <li>
                    <button type="button" onClick={() => { setIsMenuOpen(false); onSaveDraft(); }} className="flex items-center gap-3 py-3 font-semibold text-sm active:bg-black/10 cursor-pointer">
                    <Save size={18} className="text-blue-500" /> Enregistrer brouillon
                    </button>
                </li>
                <li>
                    <button type="button" onClick={() => { setIsMenuOpen(false); onPublish(); }} className="flex items-center gap-3 py-3 font-semibold text-sm active:bg-black/10 cursor-pointer">
                    <Send size={18} className="text-[#E76F85]" /> Publier l'article
                    </button>
                </li>
                <div className="h-px bg-black/5 my-1" />
                <li>
                    <button type="button" onClick={() => onNavigate('/')} className="flex items-center gap-3 py-3 font-semibold text-sm text-red-500 hover:bg-red-50 active:bg-red-100 cursor-pointer">
                    <LogOut size={18} /> Quitter l'éditeur
                    </button>
                </li>
                </ul>
            </div>
            )}
        </div>
        </div>
    );
    }