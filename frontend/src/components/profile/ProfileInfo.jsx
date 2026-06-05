import { useState } from 'react';
import EditProfileModal from "./EditProfileModal";

const ProfileInfo = ({ user, isOwner, onProfileUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
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
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 bg-[#FF649E] text-white py-3 rounded-2xl font-semibold hover:opacity-90 hover:cursor-pointer transition-opacity"
            >
              Modifier le profil
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

      {/* Modal de modification perso */}
      <EditProfileModal 
        user={user} 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateSuccess={onProfileUpdate} 
      />
    </div>
  );
};

export default ProfileInfo;