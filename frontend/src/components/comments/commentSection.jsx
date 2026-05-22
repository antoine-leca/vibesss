import React, { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
};

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comments`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      
      // Map database comments to UI structure
      const mappedComments = data.map((c) => ({
        id: c.id,
        author: c.pseudo || "Anonyme",
        avatar: c.profile_picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${c.pseudo || 'Anonyme'}`,
        time: formatTime(c.comment_date),
        text: c.content,
        likes: 0,
        bgColor: ["bg-[#E6EEFA]", "bg-[#FCEAEB]", "bg-[#EBE3FA]"][c.id % 3],
        replies: []
      }));
      
      setComments(mappedComments);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les commentaires.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentAdded = (newComment) => {
    const mapped = {
      id: newComment.id,
      author: newComment.pseudo || "Anonyme",
      avatar: newComment.profile_picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${newComment.pseudo || 'Anonyme'}`,
      time: "Just now",
      text: newComment.content,
      likes: 0,
      bgColor: ["bg-[#E6EEFA]", "bg-[#FCEAEB]", "bg-[#EBE3FA]"][newComment.id % 3],
      replies: []
    };
    setComments((prev) => [mapped, ...prev]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans bg-white min-h-screen">
      {/* Compteur de commentaires */}
      <h2 className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-6">
        Comments ({loading ? "..." : comments.length})
      </h2>

      {/* Appel du composant Formulaire */}
      <CommentForm onCommentAdded={handleCommentAdded} />

      {/* Chargement */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="text-center py-6 text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* Liste des commentaires */}
      {!loading && !error && (
        <div className="space-y-5">
          {comments.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              Aucun commentaire pour le moment. Soyez le premier à participer !
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <CommentCard comment={comment} />
                
                {comment.replies && comment.replies.map((reply) => (
                  <CommentCard key={reply.id} comment={reply} isReply={true} />
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}