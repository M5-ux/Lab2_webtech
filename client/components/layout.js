import Header from './header';
import UserInfo from './UserInfo';

export default function Layout({ children }) {
  return (
    <div>
      <Header />

      <main>{children}</main>
    </div>
  );
}
// <UserInfo />
