import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../services/AuthContext';


export default function CommentForm({ onCommentAdded }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-between gap-4 p-5 mb-8 bg-[#F5F7FB] border border-[#E1E8F5] rounded-2xl">
        <span className="text-sm font-medium text-gray-500">
          Vous devez être connecté pour participer à la discussion.
        </span>
        <Link 
          to="/auth/login" 
          className="px-5 py-2 bg-[#7B96EC] hover:bg-[#6984DC] text-white font-semibold text-xs tracking-wide rounded-full uppercase transition shadow-sm hover:shadow"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  const initials = user.pseudo ? user.pseudo.slice(0, 2).toUpperCase() : 'US';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;

    try {
      setSubmitting(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: text }),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newComment = await response.json();
      onCommentAdded(newComment);
      setText('');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la publication du commentaire.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-8">
      {/* Avatar de l'utilisateur connecté */}
      {user.profile_picture ? (
        <img 
          src={user.profile_picture} 
          alt={user.pseudo} 
          className="w-9 h-9 rounded-full object-cover border border-gray-100"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-[#FCEAEB] text-[#D97B84] flex items-center justify-center font-bold text-sm select-none">
          {initials}
        </div>
      )}
      
      {/* Formulaire */}
      <div className="flex-1 relative flex items-center">
        <input 
          type="text" 
          placeholder="Add to the discussion..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitting}
          className="w-full pl-5 pr-24 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300 transition disabled:bg-gray-50"
        />
        <button 
          type="submit"
          disabled={submitting || !text.trim()}
          className="absolute right-1.5 px-5 py-1.5 bg-[#7B96EC] hover:bg-[#6984DC] text-white font-semibold text-xs tracking-wide rounded-full uppercase transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? '...' : 'Post'}
        </button>
      </div>
    </form>
  );
}