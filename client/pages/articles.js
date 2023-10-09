import React from 'react';

const articles = [
    {
      id: '12143a72-7d42-4bec-bc0b-e5abee18719c',
      title: 'Handmade Concrete Pizza',
      content: 'Expedita consequatur beatae omnis. Enim et tenetur et distinctio mollitia odio. Id et dolores et.',
      date: '26/10/2022',
      author: 'Mrs. Cedric Fahey',
      comments: [
        {
          id: 'a9e9009c-00e2-4790-85d5-c4675dbd9706',
          timestamp: '1696814166309',
          content: 'Voluptatum itaque nostrum quos provident praesentium optio et ad omnis.',
          author: 'Angelina Douglas',
        },
        {
          id: '1dc8a147-85d8-4800-8db9-ea77d5e2929f',
          timestamp: '1696854426140',
          content: 'Ea similique et deserunt.',
          author: 'Jacquelyn Koepp',
        },
      ],
    },
    {
      id: 'd66812ca-9be2-488c-9223-285b238bc908',
      title: 'Rustic Concrete Shirt',
      content: 'Corporis doloremque consequatur. Ut consectetur nemo dolorum rerum ea sapiente accusantium aspernatur. Sed consequatur voluptatem fugit maxime voluptatem quibusdam sequi ut. Qui error et eius maxime delectus atque quo.',
      date: '16/02/2023',
      author: 'Richard Kuhn',
      comments: [
        {
          id: '021725ec-3797-45cf-b60a-e59e9779ddbd',
          timestamp: '1696803930232',
          content: 'Dolore occaecati ratione totam commodi occaecati non.',
          author: 'Dr. Noel Heller',
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
