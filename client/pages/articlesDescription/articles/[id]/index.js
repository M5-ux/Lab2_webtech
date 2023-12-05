import { supabase } from 'pages/login.js';
import Link from 'next/link';
import { useState } from 'react';
import CommentForm from 'pages/commentForm.js';


function listeContacts({ article ,comments  }) {

  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleShowCommentForm = () => {
    setShowCommentForm(true);
  };

  if (!article && !comments) {
    return <p>chargement...</p>;
  }

  return (
   
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>

{/* Bouton pour afficher le formulaire de commentaire */}
<button onClick={handleShowCommentForm}>Ajouter un commentaire</button>

{/* Afficher le formulaire de commentaire uniquement si showCommentForm est vrai */}
{showCommentForm && <CommentForm articleId={article.id} click={showCommentForm} />}


    
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

export default listeContacts;
