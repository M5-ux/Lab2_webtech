// app/articles/[id].js
import React from 'react';
import { useRouter } from 'next/router';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query; // Récupérez le paramètre 'id' de l'URL

  // Dans un vrai projet, vous chargeriez les données de l'article en utilisant l'ID
  const articleData = {
    id: id,
    title: 'Titre de l\'article #' + id,
    content: 'Contenu de l\'article #' + id,
  };

  return (
    <div>
      <h1>{articleData.title}</h1>
      <p>{articleData.content}</p>
    </div>
  );
};

export default ArticlePage;
