// ./components/LoggedOut.js
import { useUser } from './UserContext';

function LoggedOut() {
  const { login } = useUser();

  const onClickLogin = async () => {
    try {
      // Make an API request to your backend to fetch user data
      const response = await fetch('/api/profile'); 
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      // Parse the response JSON
      const userData = await response.json();

      // Assuming userData contains the user information
      login(userData);
    } catch (error) {
      console.error('Error logging in:', error.message);
    };
  };

  return (
    <div>
      <h1>You are logged out.</h1>
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
}

export default LoggedOut;
