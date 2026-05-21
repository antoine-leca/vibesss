import React, { useRef } from 'react';
import { Image as ImageIcon, Palette, Type, FileText } from 'lucide-react';
import ImageUploader from './ImageUploader';

const BlogEditorSidebar = ({ blogData, onBlogChange }) => {
  const bannerInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const handleImageUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onBlogChange(field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* TITRE DE LA SECTION */}
      <div className="pb-4 border-b border-black/10">
        <h2 className="text-xl font-serif font-bold text-black">
          Personnalisation
        </h2>
        <p className="text-sm text-black/60 mt-1">
          Créez l'identité visuelle de votre blog
        </p>
      </div>

      {/* BANNIÈRE */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
            <ImageIcon size={16} className="text-white" />
          </div>
          <h3 className="font-semibold text-black">Bannière</h3>
        </div>
        
        <ImageUploader
          currentImage={blogData.bannerImage}
          onImageChange={(file) => handleImageUpload('bannerImage', file)}
          label="Modifier la bannière"
          previewClassName="aspect-[21/9]"
        />
        
        <p className="text-xs text-black/50">
          Format recommandé : 1200×450px (21:9)
        </p>
      </div>

      {/* FOND */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Palette size={16} className="text-white" />
          </div>
          <h3 className="font-semibold text-black">Arrière-plan</h3>
        </div>
        
        <ImageUploader
          currentImage={blogData.backgroundImage}
          onImageChange={(file) => handleImageUpload('backgroundImage', file)}
          label="Modifier le fond"
          previewClassName="aspect-video"
        />
        
        <p className="text-xs text-black/50">
          Format recommandé : 1920×1080px (16:9)
        </p>
      </div>

      {/* TITRE */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Type size={16} className="text-white" />
          </div>
          <h3 className="font-semibold text-black">Titre du blog</h3>
        </div>
        
        <input
          type="text"
          value={blogData.title}
          onChange={(e) => onBlogChange('title', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#E76F85] text-black font-semibold"
          placeholder="Mon Super Blog"
          maxLength={60}
        />
        
        <div className="flex justify-between text-xs text-black/50">
          <span>60 caractères maximum</span>
          <span>{blogData.title.length}/60</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <h3 className="font-semibold text-black">Description</h3>
        </div>
        
        <textarea
          value={blogData.description}
          onChange={(e) => onBlogChange('description', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#E76F85] text-black resize-none"
          placeholder="Décrivez votre blog en quelques mots..."
          rows={4}
          maxLength={200}
        />
        
        <div className="flex justify-between text-xs text-black/50">
          <span>200 caractères maximum</span>
          <span>{blogData.description.length}/200</span>
        </div>
      </div>

      {/* THÈME (Optionnel) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">🎨</span>
          </div>
          <h3 className="font-semibold text-black">Thème</h3>
        </div>
        
        <select
          value={blogData.themeId}
          onChange={(e) => onBlogChange('themeId', parseInt(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#E76F85] text-black font-medium cursor-pointer"
        >
          <option value={1}>🌊 Nature & Voyage</option>
          <option value={2}>🍰 Cuisine & Gourmandise</option>
          <option value={3}>🐾 Animaux & Compagnie</option>
          <option value={4}>💡 Tech & Innovation</option>
          <option value={5}>🎨 Art & Créativité</option>
        </select>
      </div>

    </div>
  );
};

export default BlogEditorSidebar;