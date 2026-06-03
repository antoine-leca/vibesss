import React from 'react';
import ColorPicker from './ColorPicker';

const MOCK_ARTICLES = [
  { id: 1, title: "Premier article de test", date: "Il y a 2 jours", excerpt: "Ceci est un extrait de l'article..." },
  { id: 2, title: "Deuxième article exemple", date: "Il y a 5 jours", excerpt: "Un autre extrait intéressant..." },
  { id: 3, title: "Troisième publication", date: "Il y a 1 semaine", excerpt: "Du contenu de qualité arrive bientôt..." },
];

const ArticlesSection = ({ backgroundColor, onColorChange, blogTitle }) => {
  return (
    <div className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
      
      {backgroundColor && (
        <div 
          className="absolute inset-0 transition-colors duration-300" 
          style={{ backgroundColor: backgroundColor }}
        />
      )}

      {/* ColorPicker en haut à DROITE */}
      <div className="absolute top-6 right-6 z-20">
        <ColorPicker 
          backgroundColor={backgroundColor}
          onColorChange={onColorChange}
        />
      </div>

      {/* Articles simulés */}
      <div className="relative z-10 px-6 sm:px-12 py-12 mt-8">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_ARTICLES.map((article) => (
            <div 
              key={article.id}
              className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-black/5 rounded-2xl overflow-hidden hover:-translate-y-1"
            >
              <figure className="h-40">
                <div 
                  className="w-full h-full"
                  style={{ background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--category-color) 100%)' }}
                />
              </figure>
              <div className="card-body p-6 gap-3">
                <h3 className="card-title text-lg font-custom-title text-black line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-black/60 font-custom-main line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="card-actions justify-between items-center mt-2 pt-2 border-t border-black/5">
                  <span className="text-xs text-black/40 font-custom-main">{article.date}</span>
                  <div 
                    className="badge badge-lg text-white font-medium font-custom-main px-3 py-2 rounded-lg"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    Lire
                  </div>
                </div>
              </div>
            </div>
          ))}
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