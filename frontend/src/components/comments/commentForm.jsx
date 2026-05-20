import React from 'react';

export default function CommentForm() {
  return (
    <div className="flex items-center gap-3 mb-8">
      {/* Avatar de l'utilisateur connecté */}
      <div className="w-9 h-9 rounded-full bg-[#FCEAEB] text-[#D97B84] flex items-center justify-center font-semibold text-sm select-none">
        SJ
      </div>
      
      {/* Formulaire */}
      <div className="flex-1 relative flex items-center">
        <input 
          type="text" 
          placeholder="Add to the discussion..." 
          className="w-full pl-5 pr-24 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300 transition"
        />
        <button className="absolute right-1.5 px-5 py-1.5 bg-[#7B96EC] hover:bg-[#6984DC] text-white font-semibold text-xs tracking-wide rounded-full uppercase transition">
          Post
        </button>
      </div>
    </div>
  );
}