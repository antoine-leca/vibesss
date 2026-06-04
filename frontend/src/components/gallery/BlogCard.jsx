import { useState } from "react";
import { useNavigate } from "react-router";

function getInitials(pseudo = "") {
  return pseudo.slice(0, 2).toUpperCase();
}

function resolveProfilePicture(profilePicture, pseudo) {
  if (profilePicture && (profilePicture.startsWith("http://") || profilePicture.startsWith("https://"))) {
    return profilePicture;
  }
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${pseudo || "Anonyme"}`;
}

function resolveBgImage(bgImage) {
  if (bgImage && (bgImage.startsWith("http://") || bgImage.startsWith("https://"))) {
    return bgImage;
  }
  const themeImages = {
    "cuisine_bg.jpg": "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=700&q=80",
    "animaux_bg.jpg": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=700&q=80",
    "lifestyle_bg.jpg": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=700&q=80",
    "sport_bg.jpg": "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700&q=80",
    "nature_bg.jpg": "https://images.unsplash.com/photo-1472214222541-d510753a4907?w=700&q=80",
    "voyage_bg.jpg": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=700&q=80"
  };
  return themeImages[bgImage] || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80";
}

const IconHeart = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconBookmark = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export default function BlogCard({ blog }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer flex flex-col break-inside-avoid mb-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/blogs/${blog.id}`)}
      style={{
        background: "#fff",
        boxShadow: hovered
          ? "0 10px 28px rgba(233,159,180,0.2), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 10px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.28s ease, transform 0.28s ease",
      }}
    >
      {/* Bannière noire */}
      <div className="flex items-center gap-2 px-2.5 py-2" style={{ background: "#111" }}>
        {blog.profile_picture || blog.pseudo ? (
          <img
            src={resolveProfilePicture(blog.profile_picture, blog.pseudo)}
            alt={blog.pseudo}
            className="w-5 h-5 rounded-full object-cover flex-shrink-0"
            style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}
          />
        ) : (
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
            style={{ background: "var(--primary-color, #e99fb4)" }}
          >
            {getInitials(blog.pseudo)}
          </div>
        )}
        <span className="text-white text-[11px] truncate" style={{ fontFamily: "var(--main-font)" }}>
          @{blog.pseudo}
        </span>
      </div>

      {/* Image */}
      <div className="overflow-hidden w-full">
        <img
          src={blog.banniere ? blog.banniere : resolveBgImage(blog.bg_image)}
          alt={blog.title}
          className="w-full object-cover transition-transform duration-500 ease-out block"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
      </div>

      {/* Footer */}
      <div className="px-2.5 pt-2 pb-2.5 flex items-center justify-between gap-2" style={{ background: "#fff" }}>
        {/* Titre */}
        <p
          className="text-sm font-bold leading-snug line-clamp-2 flex-1"
          style={{ fontFamily: "var(--title-font, 'Bentham', serif)", color: "#1a1a1a" }}
        >
          {blog.title}
        </p>

        {/* Icônes */}
        <div
          className="flex items-center gap-1 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center justify-center w-7 h-7 rounded-full transition-all"
            style={{
              background: liked ? "#fde8ef" : "#f5f5f5",
              color: liked ? "#e05c8a" : "#bbb",
            }}
          >
            <IconHeart filled={liked} />
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className="flex items-center justify-center w-7 h-7 rounded-full transition-all"
            style={{
              background: saved ? "#ede8f7" : "#f5f5f5",
              color: saved ? "#e9dd3c" : "#bbb",
            }}
          >
            <IconBookmark filled={saved} />
          </button>
        </div>
      </div>
    </div>
  );
}