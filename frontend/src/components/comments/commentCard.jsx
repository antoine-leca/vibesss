import React from 'react';

export default function CommentCard({ comment, isReply = false }) {
  return (
    <div className={`flex flex-col ${isReply ? 'ml-12 relative' : ''}`}>
      
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
        </div>
      </div>
    </div>
  );
}