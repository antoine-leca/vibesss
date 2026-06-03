import React, { useRef } from 'react';
import { ImageIcon } from 'lucide-react';
import ThemeSelectorButton from './ThemeSelectorButton';

const BannerSection = ({ bannerImage, onBannerChange, onThemeSelectorToggle }) => {
  const bannerInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onBannerChange(e.target.result);
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  return (
    <div className="relative h-64 sm:h-80 overflow-hidden bg-gradient-to-br from-[var(--secondary-color)] to-[var(--category-color)]">
      <input
        type="file"
        ref={bannerInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {bannerImage ? (
        <img
          src={bannerImage}
          alt="Bannière"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/60 font-medium font-custom-main">
            Cliquez pour ajouter une bannière
          </span>
        </div>
      )}

      {/* Bouton thème - top right */}
      <ThemeSelectorButton onClick={onThemeSelectorToggle} />

      {/* Bouton changement bannière - bottom right */}
      <button
        onClick={() => bannerInputRef.current?.click()}
        className="bottom-10 relative"
        title="Changer la bannière"
      >
        
        {/* Button */}
        <div className="px-5 py-3 rounded-2xl font-bold text-white hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center gap-3 border border-white/30 backdrop-blur-md bg-white/20 hover:bg-white/30">
          <ImageIcon size={24} strokeWidth={2.5} />
          <span className="text-sm tracking-wide">Modifier</span>
        </div>
      </button>
    </div>
  );
};

export default BannerSection;