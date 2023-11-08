export default (req, res) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const users = [
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
