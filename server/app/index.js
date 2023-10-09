const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

const app = express();
const port = 8080; // Vous pouvez choisir n'importe quel port disponible
module.exports = app;

app.use(bodyParser.json());

const db = [];

// Générer un article avec des commentaires factices
function generateArticle() {
  const article = {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    content: faker.lorem.paragraph(),
    date: faker.date.past().toLocaleDateString(),
    author: faker.name.findName(),
    comments: [],
  };

  // Générer des commentaires fictifs pour cet article
  for (let i = 0; i < 2; i++) {
    const comment = {
      id: faker.datatype.uuid(),
      timestamp: faker.date.recent().getTime(),
      content: faker.lorem.sentence(),
      articleId :article.id ,
      author: faker.name.findName(),
    };
    article.comments.push(comment);
  }

  return article;
}

// Générer 10 articles avec des commentaires fictifs

//Generation article deja defini pour effectuer les test
db.push({
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
    ],
  });

//Generation article aléatoirement
for (let i = 0; i < 9; i++) {
  db.push(generateArticle());
}

// Route pour obtenir la liste de tous les articles
app.get('/articles', (req, res) => {
  res.json(db);
});

// Route pour ajouter un nouvel article
app.post('/articles', (req, res) => {
  const newArticle = req.body;
  newArticle.id = faker.datatype.uuid();
  newArticle.date = new Date().toLocaleDateString();
  newArticle.comments = [];

  // Générer un commentaire fictif pour le nouvel article
  const comment = {
    id: faker.datatype.uuid(),
    timestamp: faker.date.recent().getTime(),
    content: faker.lorem.sentence(),
    author: faker.name.findName(),
  };
  newArticle.comments.push(comment);

  db.push(newArticle);
  res.status(201).json(newArticle);
});

// Route pour obtenir un article par son ID
app.get('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  const article = db.find((a) => a.id === articleId);

  if (!article) {
    res.status(404).json({ error: 'Article not found' });
  } else {
    res.json(article);
  }
});

// Route pour obtenir tous les commentaires d'un article
app.get('/articles/:articleId/comments', (req, res) => {
  const articleId = req.params.articleId;
  const article = db.find((a) => a.id === articleId);

  if (!article) {
    res.status(404).json({ error: 'Article not found' });
  } else {
    res.json(article.comments);
  }
});

// Route pour ajouter un commentaire à un article
app.post('/articles/:articleId/comments', (req, res) => {
  const articleId = req.params.articleId;
  const article = db.find((a) => a.id === articleId);

  if (!article) {
    res.status(404).json({ error: 'Article not found' });
  } else {
    const newComment = req.body;
    newComment.id = faker.datatype.uuid();
    newComment.timestamp = faker.date.recent().getTime();
    article.comments.push(newComment);
    res.status(201).json(newComment);
  }
});

// Route pour obtenir un commentaire spécifique d'un article
app.get('/articles/:articleId/comments/:commentId', (req, res) => {
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;
  const article = db.find((a) => a.id === articleId);

  if (!article) {
    res.status(404).json({ error: 'Article not found' });
  } else {
    const comment = article.comments.find((c) => c.id === commentId);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.json(comment);
    }
  }
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
