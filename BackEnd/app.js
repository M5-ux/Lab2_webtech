const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Create a router for your routes
const router = express.Router();
// Import necessary modules
const fs = require('fs');

// Define your routes using the router
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('To learn how /hello works, go to /hello');
});

router.get('/hello', (req, res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).send('Please provide a name in the query parameter.');
  } else if (name === 'YourName') {
    res.status(200).send('Hello, I am YourName. Nice to meet you!');
  } else {
    res.status(200).send(`Hello, ${name}!`);
  }
});

router.get('/about', (req, res) => {
  fs.readFile('about.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(data);
    }
  });
});



app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
  
    res.send(`Thank you, ${name}, for submitting your email address: ${email}`);
  });

  

// Use the router for all routes
app.use('/', router);





// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
