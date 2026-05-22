import React from 'react';
import { Palette } from 'lucide-react';

const ThemeSelectorButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 btn btn-circle btn-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group border-0"
      style={{ 
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)' 
      }}
      title="Choisir un thème"
    >
      <Palette size={24} className="text-white" />
      
      <span className="absolute left-full ml-3 px-3 py-1.5 bg-black text-white text-xs font-medium font-custom-main rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Thèmes prédéfinis
      </span>
    </button>
  );
};

export default ThemeSelectorButton;