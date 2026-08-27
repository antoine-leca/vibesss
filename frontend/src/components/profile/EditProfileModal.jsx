import { useState } from 'react';
import UserService from "../../services/UserService";

const EditProfileModal = ({ user, isOpen, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    bio: user?.bio || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await UserService.update(user.id, formData);
    
    if (success) {
      onUpdateSuccess();
      onClose();
    } else {
      alert("Erreur lors de la mise à jour du profil.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-[#FCF8F5] rounded-[2.5rem] border-2 border-[#E99FB4] shadow-2xl p-8 max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-[#E99FB4]/10 transition-colors text-black font-bold cursor-pointer"
        >
          ✕
        </button>
        
        <div className="text-center mb-8">
          <h3 className="font-black text-3xl font-custom-title text-black tracking-tight mb-2">
            Modifier mon profil
          </h3>
          <p className="text-neutral-400 text-sm font-medium font-custom-main">
            Personnalisez vos informations publiques.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col w-full">
            <label className="mb-1">
              <span className="font-bold text-[10px] uppercase tracking-widest text-neutral-400 font-custom-main">Prénom</span>
            </label>
            <input 
              type="text" 
              className="w-full rounded-2xl bg-white border-2 border-neutral-100 focus:border-[#FF649E] outline-none font-custom-main transition-all px-4 py-2" 
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
              placeholder="Votre prénom"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">
              <span className="font-bold text-[10px] uppercase tracking-widest text-neutral-400 font-custom-main">Nom</span>
            </label>
            <input 
              type="text" 
              className="w-full rounded-2xl bg-white border-2 border-neutral-100 focus:border-[#FF649E] outline-none font-custom-main transition-all px-4 py-2" 
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
              placeholder="Votre nom"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1">
              <span className="font-bold text-[10px] uppercase tracking-widest text-neutral-400 font-custom-main">Bio (max 500 caractères)</span>
            </label>
            <textarea 
              className="h-32 rounded-2xl bg-white border-2 border-neutral-100 focus:border-[#FF649E] outline-none font-custom-main transition-all px-4 py-2 leading-relaxed resize-none" 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Racontez-nous quelque chose sur vous..."
              maxLength={500}
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-[#FF649E] hover:bg-[#E99FB4] text-white border-none rounded-full h-12 shadow-md shadow-[#FF649E]/20 transition-all font-bold uppercase tracking-widest text-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Enregistrement..." : "Sauvegarder les modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;