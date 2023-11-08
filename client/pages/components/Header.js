// ./components/Header.js
import { useUser } from './UserContext';

function Header() {
  const { user } = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>{user ? 'Logged In' : 'Logged Out'}</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
