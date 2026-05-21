import React from 'react';

const UserRow = ({ user, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-all border-b border-white/5 last:border-none group">
      <div className="flex items-center gap-4">
        {/* Avatar avec la primary color */}
        <div 
          className="w-11 h-11 rounded-full border-2 overflow-hidden bg-white/10 flex-shrink-0"
          style={{ borderColor: "var(--primary-color)" }}
        >
          <img 
            src={user.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
            alt={user.pseudo}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 
            className="text-[14px] font-black text-white uppercase tracking-tight leading-none"
            style={{ fontFamily: "var(--main-font)" }}
          >
            {user.pseudo}
          </h3>
          <p className="text-[10px] text-white/40 font-medium mt-1 uppercase tracking-widest">
            {user.email}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
         <button
          onClick={() => onDelete(user.id)}
          className="text-[10px] font-black uppercase bg-white/5 hover:bg-red-500/20 text-white/30 hover:text-red-400 p-2 px-4 rounded-xl transition-all border border-white/5"
          style={{ fontFamily: "var(--main-font)" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserRow;