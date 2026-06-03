import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../services/AuthContext'; // Import du contexte Auth
import BlogService from '../../services/BlogService';  // Import du service Blog
import EditorHeader from './EditorHeader';
import EditorMenu from './EditorMenu';
import ThemeSelector from './ThemeSelector';
import BlogPreview from './BlogPreview';

const BlogEditorContainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  const menuRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: 'Mon Super Blog',
    description: 'Description de mon blog ici...',
    bannerImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
    backgroundcolor: '#414141',
    themeId: null,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBlogChange = (field, value) => {
    setBlogData(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeSelect = (theme) => {
    setBlogData(prev => ({
      ...prev,
      bannerImage: theme.bannerImage,
      backgroundcolor: theme.backgroundcolor,
      themeId: theme.id
    }));
    setIsThemeSelectorOpen(false);
  };

  const handleSaveDraft = () => {
    console.log('Sauvegarde:', blogData);
    alert('Brouillon enregistré !');
    setIsMenuOpen(false);
  };

  const handlePublish = async () => {
    if (!blogData.title.trim() || !blogData.description.trim()) {
      return alert("Titre et description obligatoires !");
    }

    try {
      // Préparation des données pour le backend
      const dataToSend = {
        title: blogData.title,
        description: blogData.description,
        user_id: user?.id, // ID de l'utilisateur stocké dans le context
        theme_id: blogData.themeId || 1,
        banniere: blogData.bannerImage,
        couleurs: blogData.backgroundcolor
      };

      const response = await BlogService.create(dataToSend);

      if (response.ok) {
        alert("Félicitations ! Votre blog vient d'être créé.");
        navigate('/'); // Redirection vers l'accueil ou le tableau de bord
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.message || "Impossible de créer le blog"}`);
      }
    } catch (err) {
      alert("Une erreur réseau est survenue.");
    }
  };

  console.log("Utilisateur connecté :", user);
  console.log("ID envoyé au backend :", user?.id);

  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <EditorHeader 
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      <EditorMenu
        isOpen={isMenuOpen}
        menuRef={menuRef}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onQuit={() => navigate('/')}
      />

      <ThemeSelector 
        isOpen={isThemeSelectorOpen}
        onClose={() => setIsThemeSelectorOpen(false)}
        onThemeSelect={handleThemeSelect}
        currentThemeId={blogData.themeId}
      />

      <div className="flex-1 overflow-y-auto">
        <BlogPreview 
          blogData={blogData} 
          onBlogChange={handleBlogChange}
          isThemeSelectorOpen={isThemeSelectorOpen}
          onThemeSelectorToggle={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
          onPublish={handlePublish}
        />
      </div>

      <div className="bg-white px-4 sm:px-6 py-3 flex justify-between items-center text-[10px] text-black/40 font-custom-main border-t border-black/5 select-none flex-shrink-0">
        <div className="flex gap-4">
          <span>Blog en édition</span>
          {blogData.themeId && <span style={{ color: 'var(--primary-color)' }}>• Thème appliqué</span>}
        </div>
        <span>Sauvegarde auto activée</span>
      </div>
    </div>
  );
};

export default BlogEditorContainer;