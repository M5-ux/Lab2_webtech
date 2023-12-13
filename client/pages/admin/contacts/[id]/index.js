import { supabase } from '../utils/supabase'
import Link from 'next/link';


function listeContacts({ article,comments  }) {
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
