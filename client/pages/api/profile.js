
export default (req, res) => {
 
    
    const utilisateur = {
      username: 'omi',
      email: 'omi@gmail.com'
    };
  
    res.status(200).json(utilisateur);
  }
  