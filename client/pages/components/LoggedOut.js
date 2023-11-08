// ./components/LoggedOut.js
import { useUser } from './UserContext';

function LoggedOut() {
  const { login } = useUser();

  const onClickLogin = async () => {
    // Replace with your API request to fetch user data
    const response = await fetch('/api/profile');
    const user = await response.json();
    login(user);
  };

  return (
    <div>
      <h1>You are logged out.</h1>
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
}

export default LoggedOut;
