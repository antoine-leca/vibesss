    import React, { useState, useEffect } from 'react';
    import { Image as ImageIcon, Code } from 'lucide-react';

    export default function EditorToolbar({ editor, onImageClick }) {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        if (!window.visualViewport) return;
        const handleResize = () => {
        const heightOffset = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(heightOffset > 60 ? heightOffset : 0);
        };
        window.visualViewport.addEventListener('resize', handleResize);
        return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }, []);

    if (!editor) return null;

    return (
        <div 
        style={{ bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px' }}
        className="fixed left-0 w-full bg-white p-3 sm:p-2 border-t sm:border border-black/10 sm:border-black/5 flex flex-row justify-around sm:flex-col gap-3 sm:rounded-2xl select-none sm:sticky sm:top-4 sm:w-12 items-center z-50 shadow-xl transition-all"
        >
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-[#FEF3C7] text-[#D97706] cursor-pointer hover:brightness-95 ${editor.isActive('heading', { level: 1 }) ? 'ring-2 ring-amber-500' : ''}`}>H1</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-[#D1FAE5] text-[#10B981] cursor-pointer hover:brightness-95 ${editor.isActive('bold') ? 'ring-2 ring-emerald-400' : ''}`}>B</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif italic text-xs bg-[#F3E8FF] text-[#A855F7] cursor-pointer hover:brightness-95 ${editor.isActive('italic') ? 'ring-2 ring-purple-400' : ''}`}>I</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center bg-[#FFEDD5] text-[#EA580C] text-sm font-bold cursor-pointer hover:brightness-95 ${editor.isActive('bulletList') ? 'ring-2 ring-orange-500' : ''}`}>•=</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold cursor-pointer hover:brightness-95 ${editor.isActive('orderedList') ? 'ring-2 ring-sky-500' : ''}`}>123</button>
        <button type="button" onClick={onImageClick} className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E0F2FE] text-[#0284C7] cursor-pointer hover:brightness-95"><ImageIcon size={14} /></button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base bg-[#FEE2E2] text-[#EF4444] cursor-pointer hover:brightness-95 ${editor.isActive('blockquote') ? 'ring-2 ring-red-400' : ''}`}>“</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run(); }} className={`w-8 h-8 rounded-lg flex items-center justify-center bg-[#CCFBF1] text-[#0D9488] cursor-pointer hover:brightness-95 ${editor.isActive('codeBlock') ? 'ring-2 ring-teal-500' : ''}`}><Code size={14} /></button>
        </div>
    );
    }