import React from 'react';

const articles = [
    {
      id: '1',
      title: 'Premier article',
      content: 'Contenu de l\'article 1',
      date: '2023-10-05',
      author: 'Auteur 1',
      comments: [
        {
          id: '1',
          timestamp: '1633413600000',
          content: 'Commentaire 1 pour l\'article 1',
          author: 'Commentateur 1',
        },
        {
          id: '2',
          timestamp: '1633417200000',
          content: 'Commentaire 2 pour l\'article 1',
          author: 'Commentateur 2',
        },
      ],
    },
    {
      id: '2',
      title: 'Deuxième article',
      content: 'Contenu de l\'article 2',
      date: '2023-10-06',
      author: 'Auteur 2',
      comments: [
        {
          id: '3',
          timestamp: '1633496400000',
          content: 'Commentaire 1 pour l\'article 2',
          author: 'Commentateur 3',
        },
      ],
    },
    {
    id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    title: 'My article',
    content: 'Content of the article.',
    date: '04/10/2022',
    author: 'Liz Gringer',
    comments: [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob McLaren',
      },
      {
        id: '9b1d60bb47fa-89fc-4316-8748-92d414a124e1',
        timestamp: 1695876796832,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Jonathan VELIN',
      },
    ]
    }
    // Ajoutez d'autres articles ici...
  ];
  

  export default function Articles() {
    return (
        <div>
          <h1>Liste d'Articles</h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {articles.map((article) => (
              <li key={article.id} style={{ marginBottom: '20px' }}>
                <h2 style={{ color: 'blue' }}>{article.title}</h2>
                <p>{article.content}</p>
                <p>Date: {article.date}</p>
                <p>Auteur: {article.author}</p>
                <h3>Commentaires:</h3>
                <ul>
                  {article.comments.map((comment) => (
                    <li key={comment.id}>
                      <p>{comment.content}</p>
                      <p>Auteur du commentaire: {comment.author}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
}
