import React, { useRef, useState } from 'react';
import { Palette, X } from 'lucide-react';

const PRESET_COLORS = [
  '#FFE791', '#dd9260', '#A99961', '#655A5A', '#366d49', '#66bde6',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F',
];

const ColorPicker = ({ backgroundColor, onColorChange }) => {
  const colorInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bouton couleur flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        // 1. Changé shadow-2xl en shadow-[0_10px_40px_rgba(0,0,0,0.3)] pour une ombre plus profonde
        // 2. Ajouté ring-1 ring-white/20 pour un petit liseré blanc qui aide à la visibilité
        className="group px-5 py-3 rounded-2xl font-bold text-white shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 border border-white/30 backdrop-blur-md bg-white/10 hover:bg-white/20 ring-1 ring-white/20"
        style={{ 
          backgroundColor: backgroundColor || '#ffffff',
          // 3. Agrandi la taille : de 3.5rem à 4rem
          width: '4rem', 
          height: '4rem'
        }}
        title="Sélectionner une couleur"
      >
        {/* 4. Agrandi l'icône : de size={20} à size={24} */}
        <Palette size={24} className={backgroundColor ? 'text-white' : 'text-gray-600'} />
      </button>

      {/* Palette de couleurs */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl p-4 w-80 z-30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-custom-title font-semibold text-black">Couleur du fond</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="btn btn-circle btn-ghost btn-xs"
            >
              <X size={16} />
            </button>
          </div>

          {/* Grille de couleurs prédéfinies */}
          <div className="grid grid-cols-6 gap-3 mb-4">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onColorChange(color);
                  setIsOpen(false);
                }}
                className={`w-10 h-10 rounded-xl transition-transform hover:scale-110 shadow-sm ${
                  backgroundColor === color 
                    ? 'ring-2 ring-offset-2 ring-black scale-110' // Utilisez ring au lieu de border
                    : ''
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Input couleur personnalisée */}
          <div className="pt-4">
            <label className="text-xs font-custom-main text-black/60 mb-2 block">
              Couleur personnalisée
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => colorInputRef.current?.click()}
                className="w-12 h-12 rounded-xl shadow-md  transition-transform hover:scale-105"
                style={{ backgroundColor: backgroundColor || '#ffffff' }}
              />
              <input
                type="color"
                ref={colorInputRef}
                onChange={(e) => onColorChange(e.target.value)}
                value={backgroundColor || '#ffffff'}
                className="flex-1 h-12 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Backdrop pour fermer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ColorPicker;