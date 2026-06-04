import React, { useState } from 'react';
import { Flag } from 'lucide-react';
import { useAuth } from '../../services/AuthContext';
import ReportModal from '../layout/ReportModal';

export default function CommentCard({ comment, isReply = false }) {
  const { user } = useAuth();
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className={`flex flex-col ${isReply ? 'ml-12 relative' : ''}`}>
      
      {isReply && (
        <div className="absolute left-[-24px] top-0 bottom-6 w-[2px] bg-gray-100" />
      )}

      <div className={`flex gap-4 p-5 rounded-2xl ${comment.bgColor} transition-all duration-200 hover:shadow-sm group`}>
        {/* Avatar */}
        <img 
          src={comment.avatar} 
          alt={comment.author} 
          className="w-10 h-10 rounded-full object-cover border border-white/50"
        />

        {/* Contenu du commentaire */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-[15px]">{comment.author}</span>
              <span className="text-xs text-gray-400">• {comment.time}</span>
            </div>
            
            {/* Bouton Signaler (visible seulement si connecté et au survol) */}
            {user && (
              <button 
                onClick={() => setIsReportOpen(true)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                title="Signaler ce commentaire"
              >
                <Flag size={14} />
              </button>
            )}
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
        </div>
      </div>

      <ReportModal 
         isOpen={isReportOpen}
         onClose={() => setIsReportOpen(false)}
         targetType="comment"
         targetId={comment.id}
         userId={user?.id}
      />
    </div>
  );
}
