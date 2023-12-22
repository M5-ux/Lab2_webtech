import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../utils/supabase';

export default function Header() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessionListener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    // Obtenir la session actuelle
    setSession(supabase.auth.session);

    return () => {
      sessionListener.data?.unsubscribe;
    };
  }, []);

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-5">
        <Link href="/">
          <Image
            src="/Logo1.png"
            alt="SoleyEvazyon Logo"
            width={190}
            height={120}
          />
        </Link>
        <nav className="flex space-x-3">
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
            <Link
              href="/login"
              className="text-customBlue hover:text-blue-600 transition duration-300"
            >
              Mon profil
            </Link>
          ) : (
            <Link
              href="/logintest"
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
