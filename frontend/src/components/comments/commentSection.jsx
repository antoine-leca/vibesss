import React from 'react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm'; // Import du nouveau composant

const MOCK_COMMENTS = [
  {
    id: 1,
    author: "David L.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    time: "2 hours ago",
    text: "Absolutely beautiful redesign! This minimal aesthetic is so fresh. Love the typography. Vibesss is looking amazing!",
    likes: 18,
    bgColor: "bg-[#E6EEFA]",
    replies: [
      {
        id: 2,
        author: "Sophie T.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        time: "1 hour ago",
        text: "Totally agree, David! It's incredibly smooth and easy to read. Well done, Vibesss team.",
        likes: 7,
        bgColor: "bg-[#FCEAEB]",
      }
    ]
  },
  {
    id: 3,
    author: "Leo K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    time: "3 hours ago",
    text: "The readability is fantastic. Such a breath of fresh air for a content platform. Love the pastel theme!",
    likes: 24,
    bgColor: "bg-[#EBE3FA]",
    replies: []
  }
];

export default function CommentSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans bg-white min-h-screen">
      {/* Compteur de commentaires */}
      <h2 className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-6">
        Comments ({MOCK_COMMENTS.length + 1})
      </h2>

      {/* Appel du composant Formulaire */}
      <CommentForm />

      {/* Liste des commentaires */}
      <div className="space-y-5">
        {MOCK_COMMENTS.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <CommentCard comment={comment} />
            
            {comment.replies && comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}