import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

const ImageUploader = ({ 
  currentImage, 
  onImageChange, 
  label = "Modifier l'image",
  previewClassName = "aspect-video"
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
    event.target.value = '';
  };

  const handleRemove = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {currentImage ? (
        <div className="relative group">
          <div className={`w-full ${previewClassName} rounded-xl overflow-hidden border border-black/10 bg-black/5`}>
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-xl">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Upload size={14} />
              Changer
            </button>
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <X size={14} />
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-black/20 hover:border-[#E76F85] bg-white hover:bg-[#E76F85]/5 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-[#E76F85]/10 group-hover:bg-[#E76F85]/20 flex items-center justify-center transition-colors">
            <Upload size={20} className="text-[#E76F85]" />
          </div>
          <span className="text-sm font-medium text-black/60 group-hover:text-[#E76F85] transition-colors">
            {label}
          </span>
          <span className="text-xs text-black/40">
            JPG, PNG ou GIF (max 5MB)
          </span>
        </button>
      )}
    </div>
  );
};

export default ImageUploader;