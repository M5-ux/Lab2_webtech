import { useState } from 'react';
import CommentForm from 'pages/commentForm.js';
import { supabase } from 'pages/login.js';

function ListeContacts({ article, comments }) {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleShowCommentForm = () => {
    setShowCommentForm(true);
  };

  if (!article && !comments) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <article className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-700">{article.content}</p>
      </article>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
        <ul className="list-disc pl-5 mb-6">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">{comment.content}</li>
          ))}
        </ul>

        <button
          onClick={handleShowCommentForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter un commentaire
        </button>

        {showCommentForm && <CommentForm articleId={article.id} />}
      </section>
    </div>
  );
}

// getServerSideProps reste inchangé...

export default ListeContacts;
