import { Calendar, Settings, User } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileBlogCard from "../components/profile/ProfileBlogCard";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../services/AuthContext";

const Profile = () => {
  const { pseudo: urlPseudo } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { user, blogs, loading, error, isOwner, refetchProfile } = useProfile(urlPseudo, authUser?.id);

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
      <ProfileBanner user={user} blogs={blogs} />

      <div className="mt-20 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold font-custom-main">@{user.pseudo}</h2>
        </div>

        <ProfileInfo user={user} isOwner={isOwner} onProfileUpdate={refetchProfile} />

        {/* Blogs Feed - Card Style */}
        <div className="flex flex-col gap-6 mt-8 pb-20">
          <div className="flex items-center justify-between px-2">
            <h4 className="font-bold font-custom-main text-lg text-gray-800">Blogs récents</h4>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <ProfileBlogCard key={blog.id} blog={blog} isOwner={isOwner} navigate={navigate} />
              ))
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
