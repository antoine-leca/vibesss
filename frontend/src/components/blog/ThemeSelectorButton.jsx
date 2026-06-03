import React from 'react';
import { Palette } from 'lucide-react';

const ThemeSelectorButton = ({ onClick }) => {
  return (
    <div // Changé en div
      className="absolute top-6 right-6 z-30 group flex flex-col items-center gap-2 transition-all duration-300"
      title="Choisir un thème prédéfini"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity group-hover:scale-110"></div>
        
        <button
          onClick={onClick} // Déplacé ici
          className="relative px-6 py-4 rounded-3xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:scale-110 flex items-center gap-3 border border-white/30 backdrop-blur-md bg-gradient-to-br from-[var(--primary-color)]/90 to-[var(--secondary-color)]/90 font-custom-title"
        >
          <Palette size={24} className="text-white" strokeWidth={2.5} />
          <span className="text-sm tracking-wide">Thèmes</span>
        </button>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-custom-main bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none">
        Thèmes prédéfinis
      </div>
    </div>
  );
};

export default ThemeSelectorButton;