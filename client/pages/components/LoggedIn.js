// ./components/LoggedIn.js
import { useUser } from './UserContext';

function LoggedIn() {
  const { user, logout } = useUser();

  // Vérifiez si user est défini avant d'accéder à user.name
  const userName = user ? user.name : '';

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default LoggedIn;
