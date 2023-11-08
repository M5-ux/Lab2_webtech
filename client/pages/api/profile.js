
export default (req, res) => {
    // Check if the user is authenticated (you can implement your own logic here)
    const isAuthenticated = true; // Change this according to your authentication logic
  
    if (!isAuthenticated) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  
    const userProfile =[
      {
        username: 'jojo',
        password: 'lakaz',
      },
      {
        username: 'mathias',
        password: 'mako',
      },
      {
        username: 'omar',
        password: 'makomè',
      },
    ];
  
    res.status(200).json(userProfile);
  };
  