import React from 'react';
import { Home, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router';

const EditorHeader = ({ isMenuOpen, onMenuToggle }) => {
  return (
    <div className="flex bg-[#0D0D0D] text-white h-14 px-4 sm:px-6 items-center justify-between select-none relative z-[100] flex-shrink-0">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link 
          to="/" 
          className="text-white cursor-pointer hover:text-[var(--primary-color)] transition-colors"
        >
          <Home size={18} />
        </Link>
        <span className="font-custom-title text-lg sm:text-xl font-bold tracking-wide">
          Vibesss Studio
        </span>
        <span className="text-xs sm:text-sm text-white/60 pl-3 sm:pl-4 font-custom-main">
          Création de blog
        </span>
      </div>

      <div className="flex items-center gap-4 relative">
        <button className="text-white cursor-pointer hover:text-[var(--primary-color)] transition-colors">
          <User size={18} />
        </button>
        
        <button 
          onClick={onMenuToggle}
          className={`cursor-pointer transition-colors ${
            isMenuOpen ? 'text-[var(--primary-color)]' : 'text-white'
          }`}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;