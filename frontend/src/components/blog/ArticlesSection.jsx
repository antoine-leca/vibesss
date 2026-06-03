import React, { useRef } from 'react';
import { Palette } from 'lucide-react'; // On change l'icône Camera par Palette

const MOCK_ARTICLES = [
  { id: 1, title: "Premier article de test", date: "Il y a 2 jours", excerpt: "Ceci est un extrait de l'article..." },
  { id: 2, title: "Deuxième article exemple", date: "Il y a 5 jours", excerpt: "Un autre extrait intéressant..." },
  { id: 3, title: "Troisième publication", date: "Il y a 1 semaine", excerpt: "Du contenu de qualité arrive bientôt..." },
];

// 1. On récupère "backgroundColor" et "onColorChange" depuis les props parentes
const ArticlesSection = ({ backgroundColor, onColorChange, blogTitle }) => {
  const colorInputRef = useRef(null);

  return (
    <div className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* 2. Nouveau sélecteur de couleur caché (Input Color) */}
      <input
        type="color"
        ref={colorInputRef}
        onChange={(e) => onColorChange(e.target.value)}
        value={backgroundColor || '#ffffff'}
        className="hidden"
      />
      
      {/* 3. Affichage propre de la couleur de fond du thème */}
      {backgroundColor && (
        <div 
          className="absolute inset-0 transition-colors duration-300" 
          style={{ backgroundColor: backgroundColor }}
        />
      )}

      {/* Bouton changement de couleur */}
      <button
        onClick={() => colorInputRef.current?.click()}
        className="btn btn-sm absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border:80 hover:bg-white text-black border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all z-20 gap-2 font-custom-main"
      >
        <Palette size={16} />
        Changer la couleur du fond
      </button>

      {/* Articles simulés */}
      <div className="relative z-10 px-6 sm:px-12 py-12">
        <h2 className="text-2xl sm:text-3xl font-custom-title font-bold text-black mb-8">
          Derniers articles
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_ARTICLES.map((article) => (
            <div 
              key={article.id}
              className="card bg-[var(--card-color)] shadow-lg hover:shadow-xl transition-shadow border border-black/5"
            >
              <figure className="h-32">
                <div 
                  className="w-full h-full rounded-t-2xl"
                  style={{ background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--category-color) 100%)' }}
                />
              </figure>
              <div className="card-body p-6">
                <h3 className="card-title text-lg font-custom-title">{article.title}</h3>
                <p className="text-sm text-black/60 font-custom-main">{article.excerpt}</p>
                <div className="card-actions justify-between items-center mt-2">
                  <span className="text-xs text-black/40 font-custom-main">{article.date}</span>
                  <div 
                    className="badge text-white font-medium font-custom-main"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    Lire
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            className="btn btn-lg text-white border-0 shadow-lg font-custom-main"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            Voir tous les articles
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0D0D0D] text-white px-6 sm:px-12 py-8 text-center">
        <p className="text-sm text-white/60 font-custom-main">
          © 2026 {blogTitle} - Propulsé par Vibesss
        </p>
      </div>
    </div>
  );
};

export default ArticlesSection;