import React, { useState } from 'react';
import { Flag, Trash2 } from 'lucide-react';
import { useAuth } from '../../services/AuthContext';
import ReportModal from '../layout/ReportModal';
import { checkIsAdmin } from '../../utils/adminUtils';

export default function CommentCard({ comment, isReply = false, onDeleteSuccess }) {
  const { user } = useAuth();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const canPerformModeration = checkIsAdmin(user);

  const handleTriggerDeletion = async () => {
    if (!window.confirm("Supprimer définitivement ce commentaire ?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/${comment.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        onDeleteSuccess(comment.id);
      }
    } catch (error) {
      console.error("Erreur suppression commentaire:", error);
    }
  };

  return (
    <div className={`flex flex-col ${isReply ? 'ml-12 relative' : ''}`}>
      
      {isReply && (
        <div className="absolute left-[-24px] top-0 bottom-6 w-[2px] bg-gray-100" />
      )}

      <div className={`flex gap-4 p-5 rounded-2xl ${comment.bgColor} transition-all duration-200 hover:shadow-sm group`}>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-[15px]">{comment.author}</span>
              <span className="text-xs text-gray-400">• {comment.time}</span>
            </div>
            
            {/* Actions Admin et User */}
            {user && (
              <div className="flex items-center gap-1">
                {canPerformModeration && (
                  <button 
                    onClick={handleTriggerDeletion}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all cursor-pointer"
                    title="ADMIN: Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button 
                  onClick={() => setIsReportOpen(true)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                  title="Signaler ce commentaire"
                >
                  <Flag size={14} />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-700 text-sm">{comment.text}</p>
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
