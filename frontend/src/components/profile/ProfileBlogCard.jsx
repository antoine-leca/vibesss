import { Calendar } from "lucide-react";
import { CATEGORIES, resolveBgImage } from "../../services/ProfileService";

const ProfileBlogCard = ({ blog, isOwner, navigate }) => {
  const categoryName = blog.theme_label ? blog.theme_label.toLowerCase() : '';
  const category = CATEGORIES.find(c => c.id === categoryName) || CATEGORIES[2];

  const handleClick = () => {
    if (isOwner) {
      navigate(`/blog/${blog.id}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-[32px] overflow-hidden shadow-sm border hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col md:flex-row h-auto md:h-64"
    >
      <div className="md:w-2/5 h-48 md:h-full overflow-hidden relative">
        <img 
          src={blog.banniere ? blog.banniere : resolveBgImage(blog.bg_image)} 
          alt={blog.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div 
          className="absolute top-4 left-4 badge border-none rounded-full text-[10px] font-bold uppercase h-7 px-3 shadow-sm flex items-center justify-center leading-none"
          style={{ backgroundColor: category.bgColor, color: category.textColor }}
        >
          {category.name}
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h5 className="font-bold text-2xl mb-3 font-custom-title text-gray-900 group-hover:text-[#FF649E] transition-colors leading-tight">
            {blog.title}
          </h5>
          <p className="text-gray-500 text-sm line-clamp-3 font-custom-main leading-relaxed">
            {blog.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-6 text-[11px] text-gray-400 font-custom-main uppercase tracking-widest font-semibold">
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>{new Date(blog.creation_date).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <span className="text-[#FF649E] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Lire la collection →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBlogCard;