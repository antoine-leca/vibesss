import { useState, useEffect } from "react";
import BlogCard from "../components/gallery/BlogCard";
import CategoryBar from "../components/gallery/CategoryBar";
import BlogService from "../services/BlogService";

const GALLERY_CATEGORIES = [
  { id: 'tout', name: 'TOUT', bgColor: '#111111', textColor: '#fff' },
  { id: 'cuisine', name: 'CUISINE', bgColor: 'var(--primary-color, #e99fb4)', textColor: '#fff' },
  { id: 'animaux', name: 'ANIMAUX', bgColor: 'var(--secondary-color, #B5A2D7)', textColor: '#fff' },
  { id: 'lifestyle', name: 'LIFESTYLE', bgColor: 'var(--category-color, #A7CBE0)', textColor: '#fff' },
  { id: 'sport', name: 'SPORT', bgColor: 'var(--accent-color, #EFC3A7)', textColor: '#333' },
  { id: 'nature', name: 'NATURE', bgColor: 'var(--success-color, #A7C49F)', textColor: '#333' },
  { id: 'voyage', name: 'VOYAGE', bgColor: '#F4E5A1', textColor: '#333' },
];

export default function Gallery() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('tout');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    BlogService.getAll()
      .then((data) => {
        setBlogs(data || []);
        setFilteredBlogs(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setError("Impossible de charger la galerie pour le moment.");
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'tout') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(blog => {
        const themeLabel = blog.theme_label ? blog.theme_label.toLowerCase() : '';
        return themeLabel === categoryId;
      }));
    }
  };

  return (
    <div
      className="min-h-screen pt-[61px] pb-20"
      style={{ background: "var(--bg-color, #FCF8F5)" }}
    >
      {/* En-tête */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-10 text-center">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--primary-color, #e99fb4)", fontFamily: "var(--main-font)" }}
        >
          Découvrir
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ fontFamily: "var(--title-font, 'Bentham', serif)", color: "#1a1a1a" }}
        >
          La Galerie
        </h1>
        <p
          className="text-sm max-w-sm mx-auto leading-relaxed"
          style={{ color: "#bbb", fontFamily: "var(--main-font)" }}
        >
          Explore les univers créés par notre communauté
        </p>

      </div>

      <CategoryBar 
        categories={GALLERY_CATEGORIES} 
        selectedCategory={selectedCategory} 
        onSelect={handleCategorySelect} 
      />

      {/* Masonry */}
      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-[#e99fb4]"></span>
          </div>
        ) : error ? (
          <p className="text-center py-20 text-red-500 font-bold font-custom-main">
            {error}
          </p>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center py-20" style={{ color: "#ccc" }}>
            Aucun blog à afficher pour le moment.
          </p>
        ) : (
          <div className="masonry-gallery">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .masonry-gallery {
          column-count: 4;
          column-gap: 20px;
          width: 100%;
        }
        @media (max-width: 1200px) {
          .masonry-gallery { column-count: 3; }
        }
        @media (max-width: 900px) {
          .masonry-gallery { column-count: 2; }
        }
        @media (max-width: 600px) {
          .masonry-gallery { column-count: 1; }
        }
      `}</style>
    </div>
  );
}