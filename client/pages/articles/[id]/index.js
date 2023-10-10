
import React from 'react';
import { useRouter } from 'next/router';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query; // Récupérez le paramètre 'id' de l'URL

  // Dans un vrai projet, vous chargeriez les données de l'article en utilisant l'ID
  const articleData = {
    id: ' Article numero : ' + id,

  };

  return (
    <div>
      <h1>{articleData.id}</h1>
    </div>
  );
};

export default ArticlePage;
