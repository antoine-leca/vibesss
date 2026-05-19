import React, { useState } from "react";
import { MOCK_BLOGS } from "../data/mockBlogs";
import BlogCard from "../components/gallery/BlogCard";
import CategoryBar from "../components/gallery/CategoryBar";

export default function Gallery() {
  const [blogs] = useState(MOCK_BLOGS); /* <-- Remplacer par fetch plus tard */

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

      <CategoryBar />

      {/* Masonry */}
      <div className="max-w-7xl mx-auto px-6">
        {blogs.length === 0 ? (
          <p className="text-center py-20" style={{ color: "#ccc" }}>
            Aucun blog à afficher pour le moment.
          </p>
        ) : (
          <div className="masonry-gallery">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .masonry-gallery {
          column-count: 5;
          column-gap: 14px;
        }
        @media (max-width: 1280px) {
          .masonry-gallery { column-count: 4; }
        }
        @media (max-width: 900px) {
          .masonry-gallery { column-count: 3; }
        }
        @media (max-width: 600px) {
          .masonry-gallery { column-count: 2; }
        }
      `}</style>
    </div>
  );
}