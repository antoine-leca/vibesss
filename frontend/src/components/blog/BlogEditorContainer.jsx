import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditorHeader from './EditorHeader';
import EditorMenu from './EditorMenu';
import ThemeSelectorButton from './ThemeSelectorButton';
import ThemeSelector from './ThemeSelector';
import BlogPreview from './BlogPreview';

const BlogEditorContainer = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: 'Mon Super Blog',
    description: 'Description de mon blog ici...',
    bannerImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
    backgroundImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80',
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
      backgroundImage: theme.backgroundImage,
      themeId: theme.id
    }));
    setIsThemeSelectorOpen(false);
  };

  const handleSaveDraft = () => {
    console.log('Sauvegarde:', blogData);
    alert('Brouillon enregistré !');
    setIsMenuOpen(false);
  };

  const handlePublish = () => {
    if (!blogData.title.trim() || !blogData.description.trim()) {
      return alert("Titre et description obligatoires !");
    }
    alert("Blog publié !");
    navigate('/');
  };

  return (
    <div className="w-full h-full bg-[var(--bg-color)] sm:rounded-3xl overflow-hidden flex flex-col sm:border sm:border-black/5 relative">
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

      <ThemeSelectorButton onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)} />

      <ThemeSelector 
        isOpen={isThemeSelectorOpen}
        onClose={() => setIsThemeSelectorOpen(false)}
        onThemeSelect={handleThemeSelect}
        currentThemeId={blogData.themeId}
      />

      <div className="flex-1 overflow-y-auto">
        <BlogPreview blogData={blogData} onBlogChange={handleBlogChange} />
      </div>

      <div className="bg-[var(--bg-color)] px-4 sm:px-6 py-3 flex justify-between items-center text-[10px] text-black/40 font-custom-main border-t border-black/5 select-none flex-shrink-0">
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