import { User } from "lucide-react";
import { resolveProfilePicture } from "../../services/ProfileService";

const ProfileBanner = ({ user, blogs }) => {
  return (
    <div 
      className="h-64 pt-8 flex flex-col items-center relative bg-center bg-cover bg-no-repeat"
      style={{ 
        backgroundColor: blogs[0]?.couleurs || '#E99FB4',
        backgroundImage: blogs[0]?.banniere ? `url(${blogs[0].banniere})` : 'none'
      }}
    >
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
  );
};

export default ProfileBanner;