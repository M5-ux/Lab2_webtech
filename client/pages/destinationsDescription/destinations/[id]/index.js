import { useState } from 'react';
import CommentForm from 'pages/commentForm.js';
import { supabase } from 'pages/login.js';

function UniqueDestination({ article, comments }) {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleShowCommentForm = () => {
    setShowCommentForm(true);
  };

  if (!article && !comments) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <article className="shadow-lg rounded-lg overflow-hidden mb-6">
        <img src={article.image} alt={article.title} className="w-full h-48 object-cover"/>
        <div className="bg-white bg-opacity-90 p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-700">{article.content}</p>
        </div>
      </article>
      
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
        <ul className="list-disc pl-5 mb-6">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">{comment.content}</li>
          ))}
        </ul>

        <button
          onClick={handleShowCommentForm}
          className="bg-customBlue hover:bg-customBlueGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter un commentaire
        </button>

        {showCommentForm && <CommentForm articleId={article.id} />}
      </section>
    </div>
  );
}


export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const { data: article, error: articleError } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();


    const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('*')
    .eq('id_article', id)

    if (articleError || commentsError) {
      console.error('Erreur lors de la récupération des données:', articleError || commentsError);
      return {
        notFound: true,
      };
    }

  return {
    props: {
      article,
      comments,
    },
  };
}

export default UniqueDestination;
