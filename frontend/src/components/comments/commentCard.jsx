import React from 'react';

export default function CommentCard({ comment, isReply = false }) {
  return (
    <div className={`flex flex-col ${isReply ? 'ml-12 relative' : ''}`}>
      {/* Ligne verticale pour les réponses imbriquées */}
      {isReply && (
        <div className="absolute left-[-24px] top-0 bottom-6 w-[2px] bg-gray-100" />
      )}

      <div className={`flex gap-4 p-5 rounded-2xl ${comment.bgColor} transition-all duration-200 hover:shadow-sm`}>
        {/* Avatar */}
        <img 
          src={comment.avatar} 
          alt={comment.author} 
          className="w-10 h-10 rounded-full object-cover border border-white/50"
        />

        {/* Contenu du commentaire */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800 text-[15px]">{comment.author}</span>
            <span className="text-xs text-gray-400">• {comment.time}</span>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed">
            {comment.text}
          </p>

          {/* Actions de bas de carte */}
          <div className="flex items-center gap-5 mt-4 text-xs font-semibold text-gray-400">
            {/* Bouton Reply */}
            <button className="hover:text-gray-600 transition flex items-center gap-1.5">
              <span>Reply</span>
            </button>

            {/* Bouton Like (Cœur) */}
            <button className="flex items-center gap-1.5 hover:text-red-500 transition group">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span>{comment.likes}</span>
            </button>

            {/* Bouton Share (Lien/Partage) */}
            <button className="hover:text-gray-600 transition flex items-center gap-1.5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}