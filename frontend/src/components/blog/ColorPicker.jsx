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
        className="group px-5 py-3 rounded-2xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center gap-3 border border-white/30 backdrop-blur-md bg-white/20 hover:bg-white/30"
        style={{ 
          backgroundColor: backgroundColor || '#ffffff',
          width: '3.5rem',
          height: '3.5rem'
        }}
        title="Sélectionner une couleur"
      >
        <Palette size={20} className={backgroundColor ? 'text-white' : 'text-gray-600'} />
      </button>

      {/* Palette de couleurs */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 z-30 border border-black/5">
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
          <div className="grid grid-cols-6 gap-2 mb-4">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onColorChange(color);
                  setIsOpen(false);
                }}
                className={`w-10 h-10 rounded-xl transition-transform hover:scale-110 shadow-md border-2 ${
                  backgroundColor === color ? 'border-black scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Input couleur personnalisée */}
          <div className="pt-4 border-t border-black/10">
            <label className="text-xs font-custom-main text-black/60 mb-2 block">
              Couleur personnalisée
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => colorInputRef.current?.click()}
                className="w-12 h-12 rounded-xl shadow-md border-2 border-black/10 transition-transform hover:scale-105"
                style={{ backgroundColor: backgroundColor || '#ffffff' }}
              />
              <input
                type="color"
                ref={colorInputRef}
                onChange={(e) => onColorChange(e.target.value)}
                value={backgroundColor || '#ffffff'}
                className="flex-1 h-12 rounded-xl cursor-pointer"
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