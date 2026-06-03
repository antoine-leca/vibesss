import React from 'react';
import { useParams } from 'react-router';
import CommentSection from '../components/comments/CommentSection';

export default function TestComments() {
  const { articleId } = useParams();
  const testArticleId = articleId ? parseInt(articleId) : 1;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test des Commentaires</h1>
          <p className="text-gray-600">
            ID de l'article testé: <span className="font-mono font-bold text-blue-600">{testArticleId}</span>
          </p>
          <p className="text-sm text-gray-500 mt-4">
            💡 Astuce: Vous pouvez changer l'ID dans l'URL: <code className="bg-gray-100 px-2 py-1 rounded">/test/comments/:articleId</code>
          </p>
        </div>

        <CommentSection articleId={testArticleId} />
      </div>
    </div>
  );
}
