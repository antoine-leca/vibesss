import { useEffect, useRef, useState } from 'react';
import UserService from "../../services/UserService";

const EditProfileModal = ({ user, isOpen, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    bio: user?.bio || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dialogRef = useRef(null);

  // Utilisation de showModal() pour activer le backdrop DaisyUI/Natif
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

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
    <dialog ref={dialogRef} className="modal backdrop-blur-sm" onClose={onClose}>
      <div className="modal-box bg-[#FCF8F5] rounded-[2.5rem] border-2 border-[#E99FB4] shadow-2xl p-8 max-w-md">
        <form method="dialog">
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6 hover:bg-[#E99FB4]/10 transition-colors">✕</button>
        </form>
        
        <div className="text-center mb-8">
          <h3 className="font-black text-3xl font-custom-title text-black tracking-tight mb-2">
            Modifier mon profil
          </h3>
          <p className="text-neutral-400 text-sm font-medium font-custom-main">
            Personnalisez vos informations publiques.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-[10px] uppercase tracking-widest text-neutral-400 font-custom-main">Prénom</span>
            </label>
            <input 
              type="text" 
              className="input input-bordered w-full rounded-2xl bg-white border-2 border-neutral-100 focus:border-[#FF649E] focus:outline-none font-custom-main transition-all" 
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
              placeholder="Votre prénom"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-[10px] uppercase tracking-widest text-neutral-400 font-custom-main">Nom</span>
            </label>
            <input 
              type="text" 
              className="input input-bordered w-full rounded-2xl bg-white border-2 border-neutral-100 focus:border-[#FF649E] focus:outline-none font-custom-main transition-all" 
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
              placeholder="Votre nom"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-[10px] uppercase tracking-widest text-neutral-400 font-custom-main">Bio (max 500 caractères)</span>
            </label>
            <textarea 
              className="textarea textarea-bordered h-32 rounded-2xl bg-white border-2 border-neutral-100 focus:border-[#FF649E] focus:outline-none font-custom-main transition-all leading-relaxed resize-none" 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Racontez-nous quelque chose sur vous..."
              maxLength={500}
            ></textarea>
          </div>

          <div className="modal-action pt-4">
            <button type="submit" disabled={isSubmitting} className="btn flex-1 bg-[#FF649E] hover:bg-[#E99FB4] text-white border-none rounded-full h-12 shadow-md shadow-[#FF649E]/20 transition-all font-bold uppercase tracking-widest text-xs cursor-pointer">
              {isSubmitting ? "Enregistrement..." : "Sauvegarder les modifications"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProfileModal;