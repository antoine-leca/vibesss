import React from 'react';
import { X, Check, Palette } from 'lucide-react';
import { THEMES } from './constants/themes';

const ThemeSelector = ({ isOpen, onClose, onThemeSelect, currentThemeId }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
        onClick={onClose}
      />

      <div className="fixed left-0 top-10 bottom-0 w-full sm:w-96 bg-white z-[91] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/10">
          <div>
            <h2 className="text-xl font-custom-title font-bold text-black flex items-center gap-2">
              <Palette size={20} style={{ color: 'var(--primary-color)' }} />
              Thèmes prédéfinis
            </h2>
            <p className="text-sm text-black/60 mt-1 font-custom-main">
              Choisissez un style pour votre blog
            </p>
          </div>
          <button onClick={onClose} className="btn btn-circle btn-ghost btn-sm">
            <X size={20} />
          </button>
        </div>

        {/* Liste des thèmes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeSelect(theme)}
              className={`w-full btn btn-ghost h-auto p-0 border-2 rounded-2xl transition-all hover:scale-[1.02] ${
                currentThemeId === theme.id 
                  ? 'border-[var(--primary-color)] shadow-lg' 
                  : 'border-black/10'
              }`}
            >
              <div className="relative h-32 w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 h-1/2">
                  <img src={theme.bannerImage} alt={theme.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 top-1/2">
                  <div className="w-full h-full" style={{ backgroundColor: theme.backgroundcolor }} />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`} />
                
                <div className="badge badge-lg absolute top-3 left-3 bg-white/90 backdrop-blur-sm border-0 shadow-md gap-2 font-custom-main">
                  <span className="text-lg">{theme.emoji}</span>
                  {theme.name}
                </div>

                {currentThemeId === theme.id && (
                  <div 
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ThemeSelector;