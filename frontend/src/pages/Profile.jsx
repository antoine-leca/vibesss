import { Calendar, Settings, User } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../services/AuthContext";

const CATEGORIES = [
  { id: 'cuisine', name: 'CUISINE', bgColor: 'var(--primary-color, #e99fb4)', textColor: '#fff' },
  { id: 'animaux', name: 'ANIMAUX', bgColor: 'var(--secondary-color, #B5A2D7)', textColor: '#fff' },
  { id: 'lifestyle', name: 'LIFESTYLE', bgColor: 'var(--category-color, #A7CBE0)', textColor: '#fff' },
  { id: 'sport', name: 'SPORT', bgColor: 'var(--accent-color, #EFC3A7)', textColor: '#333' },
  { id: 'nature', name: 'NATURE', bgColor: 'var(--success-color, #A7C49F)', textColor: '#333' },
  { id: 'voyage', name: 'VOYAGE', bgColor: '#F4E5A1', textColor: '#333' },
];

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
    "sport_bg.jpg": "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
    "nature_bg.jpg": "https://images.unsplash.com/photo-1472214222541-d510753a4907?w=800&q=80",
    "voyage_bg.jpg": "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80"
  };
  return themeImages[bgImage] || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80";
}

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { user, blogs: apiBlogs, loading, error, isOwner } = useProfile(id, authUser?.id);

  // Simulation d'un blog pour le test
  const blogs = apiBlogs.length > 0 ? apiBlogs : [
    {
      id: "fake-1",
      title: "Mon super blog de test",
      description: "Ceci est un blog fictif pour tester l'affichage des badges et de la mise en page. Il n'est pas issu de la base de données.",
      bg_image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      category_id: "chill",
      creation_date: new Date().toISOString(),
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-vh-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[var(--bg-color)] px-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-sm border max-w-sm w-full">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
             <User size={40} />
          </div>
          <h2 className="text-2xl font-bold font-custom-title mb-2">Utilisateur non trouvé</h2>
          <p className="text-gray-500 font-custom-main mb-6">
            Désolé, le profil que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <a 
            href="/" 
            className="block w-full bg-[#FF649E] text-white py-3 rounded-2xl font-semibold hover:opacity-90 hover:cursor-pointer transition-opacity"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      {/* Top Banner with Background Color */}
      <div className="bg-[#E99FB4] h-64 pt-8 flex flex-col items-center relative">
        
        {/* Profile Picture Overlay */}
        <div className="absolute -bottom-16">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-[#E99FB4] overflow-hidden bg-white flex items-center justify-center">
              {user.profile_picture || user.pseudo ? (
                <img 
                  src={resolveProfilePicture(user.profile_picture, user.pseudo)} 
                  alt={user.pseudo} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#FCF8F5] flex items-center justify-center text-[#E99FB4]">
                  <User size={56} strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold font-custom-main">@{user.pseudo}</h2>
        </div>

        {/* Info Card */}
        <div className="bg-[#FCF8F5] rounded-t-[40px] p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold font-custom-title">{user.firstname} {user.lastname}</h3>
              <p className="text-gray-500 font-custom-main">@{user.pseudo}</p>
            </div>
          </div>

          <p className="text-gray-700 font-custom-main mb-6 leading-relaxed">
            {user.bio}
          </p>

          <div className="flex justify-between py-6 mb-8">
            <div className="text-center flex-1">
              <span className="block text-xl font-bold">{user.posts_count ?? 0}</span>
              <span className="text-gray-500 text-sm">Publications</span>
            </div>
            <div className="text-center flex-1">
              <span className="block text-xl font-bold">{user.followers_count ?? 0}</span>
              <span className="text-gray-500 text-sm">Abonnés</span>
            </div>
          </div>

          <div className="flex gap-4">
            {isOwner ? (
              <>
                <button className="flex-1 bg-[#FF649E] text-white py-3 rounded-2xl font-semibold hover:opacity-90 hover:cursor-pointer transition-opacity">
                  Modifier le profil
                </button>
                <button className="p-3 bg-gray-50 rounded-2xl hover:cursor-pointer">
                   <Settings size={20} />
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 bg-[#FF649E] text-white py-3 rounded-2xl font-semibold hover:opacity-90 hover:cursor-pointer transition-opacity">
                  Suivre
                </button>
              </>
            )}
          </div>
        </div>

        {/* Blogs Feed - Card Style */}
        <div className="flex flex-col gap-6 mt-8 pb-20">
          <div className="flex items-center justify-between px-2">
            <h4 className="font-bold font-custom-main text-lg text-gray-800">Blogs récents</h4>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => {
                const categoryName = blog.theme_label ? blog.theme_label.toLowerCase() : '';
                const category = CATEGORIES.find(c => c.id === categoryName) || CATEGORIES[2];
                return (
                  <div 
                    key={blog.id} 
                    onClick={() => {
                      if (isOwner) {
                        navigate('/create/mes-blogs');
                      } else {
                        navigate(`/blogs/${blog.id}`);
                      }
                    }}
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
              })
            ) : (
              <div className="py-20 text-center text-gray-400 font-custom-main border-2 border-dashed rounded-3xl bg-white">
                Aucun blog créé pour le moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
