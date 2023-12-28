import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {

  const [session, setSession] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const sessionListener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    // Obtenir la session actuelle
    setSession(supabase.auth.session);

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      sessionListener.data?.unsubscribe;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <Image
            src="/Logo1.png"
            alt="SoleyEvazyon Logo"
            width={190}
            height={120}
          />
        </Link>
        <nav className="flex space-x-4">
          <Link
            href="/destinations"
            className="text-customBlue hover:text-blue-600 transition duration-300"
          >
            Destinations
          </Link>
          <Link
            href="/specials"
            className="text-customBlue hover:text-blue-600 transition duration-300"
          >
            Offres Spéciales
          </Link>
          <Link
            href="/about"
            className="text-customBlue hover:text-blue-600 transition duration-300"
          >
            A propos de nous
          </Link>
          <Link
            href="/contacts"
            className="text-customBlue hover:text-blue-600 transition duration-300"
          >
            Contacts
          </Link>

          {session ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-customBlue hover:text-blue-600 transition duration-300"
              >
                Mon profil
              </button>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
                >
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-center text-gray-700 hover:bg-customBlueGreen hover:text-white"
                    onClick={closeDropdown}
                  >
                    Voir profil
                  </Link>
                  <Link
                    href="/UserPosts"
                    className="block px-4 py-2 text-center text-gray-700 hover:bg-customBlueGreen hover:text-white"
                    onClick={closeDropdown}
                  >
                    Mes posts et commentaires
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-customBlue hover:text-blue-600 transition duration-300"
            >
              Inscription/Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
