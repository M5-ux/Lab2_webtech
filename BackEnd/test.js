const express = require('express');
const app = express();
const port = 3000;

// Middleware pour traiter les données POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Page HTML contenant un formulaire
app.get('/form', (req, res) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/submit">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required><br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

// Route pour traiter les données POST
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  res.send(`Thank you, ${name}, for submitting your email address: ${email}`);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});