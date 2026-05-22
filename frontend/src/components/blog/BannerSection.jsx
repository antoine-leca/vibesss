import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

const BannerSection = ({ bannerImage, onBannerChange }) => {
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

      <button
        onClick={() => bannerInputRef.current?.click()}
        className="btn btn-sm absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-black border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all gap-2 font-custom-main"
      >
        <Camera size={16} />
        Changer la bannière
      </button>
    </div>
  );
};

export default BannerSection;