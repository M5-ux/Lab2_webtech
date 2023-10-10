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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Liste d'Articles</h1>
      <ul className="space-y-8">
        {articles.map((article) => (
          <li key={article.id} className="border-b-2 border-gray-200 pb-6">
            <h2 className="text-2xl text-blue-600">{article.title}</h2>
            <p className="bg-green-500 p-2 rounded mt-2">{article.content}</p>
            <p className="mt-2">Date: {article.date}</p>
            <p>Auteur: {article.author}</p>
            <h3 className="text-xl font-medium mt-4 mb-2">Commentaires:</h3>
            <ul className="list-decimal list-inside pl-4">
              {article.comments.map((comment) => (
                <li key={comment.id} className="mt-1">
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-600">Auteur du commentaire: {comment.author}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
