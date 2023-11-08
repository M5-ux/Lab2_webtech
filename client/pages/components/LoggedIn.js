// ./components/LoggedIn.js
import { useUser } from './UserContext';

function LoggedIn() {
  const { user, logout } = useUser();

  // Check if the user object is not null before accessing its properties
  if (user) {
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    // Handle the case where the user is not authenticated (user is null)
    return (
      <div>
        <h1>Welcome, Guest!</h1>
      </div>
    );
  }
}

export default LoggedIn;
