const request = require('supertest'); //Mise en place des test automatisé avec SuperTest
const app = require('/Users/jojo/Desktop/ING4/WebTech/ece-webtech-gr06-605/index.js');
const chai = require('chai');

const expect = chai.expect;

describe('Test des routes de l\'application Express', () => {
  it('Devrait obtenir la liste de tous les articles', async () => {
    const response = await request(app).get('/articles');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Devrait ajouter un nouvel article', async () => {
    const newArticle = {
      title: 'Nouvel article',
      content: 'Contenu du nouvel article',
      author: 'Auteur du nouvel article',
    };
    const response = await request(app).post('/articles').send(newArticle);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
  });

  it('Devrait obtenir un article par son ID', async () => {
    const articleId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    const response = await request(app).get(`/articles/${articleId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id', articleId);
  });

  it('Devrait obtenir tous les commentaires d\'un article', async () => {
    const articleId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    const response = await request(app).get(`/articles/${articleId}/comments`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Devrait ajouter un commentaire à un article', async () => {
    const articleId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    const newComment = {
      content: 'Nouveau commentaire',
      author: 'Auteur du nouveau commentaire',
    };
    const response = await request(app).post(`/articles/${articleId}/comments`).send(newComment);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
  });

  it('Devrait obtenir un commentaire spécifique d\'un article', async () => {
    const articleId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
    const commentId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
    const response = await request(app).get(`/articles/${articleId}/comments/${commentId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id', commentId);
  });
});
