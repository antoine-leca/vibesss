import React from 'react';
import { Save, Send, LogOut } from 'lucide-react';

const EditorMenu = ({ 
  isOpen, 
  menuRef, 
  onSaveDraft, 
  onPublish, 
  onQuit 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef} 
      className="absolute top-10 right-0 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <ul className="menu bg-[var(--card-color)] text-black rounded-box w-60 p-2 border border-black/5">
        <li className="menu-title">
          <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold font-custom-main">
            Actions Studio
          </span>
        </li>
        
        <li>
          <button 
            onClick={onSaveDraft}
            className="flex items-center gap-3 py-3 font-semibold text-sm active:bg-black/10 font-custom-main"
          >
            <Save size={18} className="text-blue-500" />
            Enregistrer brouillon
          </button>
        </li>
        
        <li>
          <button 
            onClick={onPublish}
            className="flex items-center gap-3 py-3 font-semibold text-sm active:bg-black/10 font-custom-main"
          >
            <Send size={18} style={{ color: 'var(--primary-color)' }} />
            Publier le blog
          </button>
        </li>
        
        <li><div className="h-px bg-black/5 my-1" /></li>
        
        <li>
          <button 
            onClick={onQuit}
            className="flex items-center gap-3 py-3 font-semibold text-sm text-red-500 hover:bg-red-50 active:bg-red-100 font-custom-main"
          >
            <LogOut size={18} />
            Quitter l'éditeur
          </button>
        </li>
      </ul>
    </div>
  );
};

export default EditorMenu;