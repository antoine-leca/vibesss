import { Calendar, Link as LinkIcon, MapPin, Settings, User } from "lucide-react";
import { useParams } from "react-router";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../services/AuthContext";

const Profile = () => {
  const { id } = useParams();
  const { user: authUser } = useAuth();
  const { user, blogs, loading, isOwner } = useProfile(id, authUser?.id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-vh-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-vh-100 text-gray-500">
        Utilisateur non trouvé
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
            <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden bg-white">
              <img 
                src={user.profile_picture || "https://via.placeholder.com/150"} 
                alt={user.pseudo} 
                className="w-full h-full object-crop"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold font-custom-main">@{user.pseudo}</h2>
        </div>

        {/* Info Card */}
        <div className="bg-[#FCF8F5] rounded-t-[40px] p-8 shadow-sm border-t border-x border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold font-custom-title">{user.firstname} {user.lastname}</h3>
              <p className="text-gray-500 font-custom-main">@{user.pseudo}</p>
            </div>
          </div>

          <p className="text-gray-700 font-custom-main mb-6 leading-relaxed">
            {user.bio}
          </p>

          <div className="flex justify-between border-y border-gray-100 py-6 mb-8">
            <div className="text-center flex-1">
              <span className="block text-xl font-bold">{user.posts_count}</span>
              <span className="text-gray-500 text-sm">Posts</span>
            </div>
            <div className="text-center flex-1 border-x border-gray-100">
              <span className="block text-xl font-bold">{user.followers_count}</span>
              <span className="text-gray-500 text-sm">Followers</span>
            </div>
            <div className="text-center flex-1">
              <span className="block text-xl font-bold">{user.following_count}</span>
              <span className="text-gray-500 text-sm">Following</span>
            </div>
          </div>

          <div className="flex gap-4">
            {isOwner ? (
              <>
                <button className="flex-1 bg-[#FF649E] text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity">
                  Edit Profile
                </button>
                <button className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                   <Settings size={20} />
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 bg-[#FF649E] text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity">
                  Follow
                </button>
              </>
            )}
          </div>
        </div>

        {/* Featured Collections / Highlights Section */}
        <div className="bg-white p-6 rounded-3xl mb-6 border border-gray-100 shadow-sm">
          <h4 className="font-bold mb-4 font-custom-main text-lg">Featured Collections</h4>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              { label: "Travel", icon: <MapPin size={22} />, color: "bg-[#EFC3A7]/20", count: "12 blogs" },
              { label: "Cafe", icon: <LinkIcon size={22} />, color: "bg-[#B5A2D7]/20", count: "8 blogs" },
              { label: "Art", icon: <Calendar size={22} />, color: "bg-[#A7C49F]/20", count: "15 blogs" },
              { label: "Life", icon: <User size={22} />, color: "bg-[#FCEB92]/20", count: "24 blogs" },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`flex flex-col justify-between p-4 rounded-2xl ${item.color} min-w-[130px] h-[140px] border border-white shadow-sm cursor-pointer hover:shadow-md transition-all group`}
              >
                <div className="bg-white/50 w-10 h-10 rounded-xl flex items-center justify-center text-gray-700 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <span className="block font-bold text-sm font-custom-main text-gray-800">{item.label}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blogs Feed - Card Style */}
        <div className="flex flex-col gap-6 mt-8 pb-20">
          <div className="flex items-center justify-between px-2">
            <h4 className="font-bold font-custom-main text-lg text-gray-800">Recent Blogs</h4>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col md:flex-row h-auto md:h-64">
                  <div className="md:w-2/5 h-48 md:h-full overflow-hidden relative">
                    <img 
                      src={blog.bg_image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-bold uppercase tracking-wider text-black">
                      Collection
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
                    
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-50 text-[11px] text-gray-400 font-custom-main uppercase tracking-widest font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} />
                        <span>{new Date(blog.creation_date).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <span className="text-[#FF649E] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read Collection →
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 font-custom-main border-2 border-dashed border-gray-100 rounded-3xl bg-white">
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
