import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@supabase/auth-ui-react';
import { createClient } from '@supabase/supabase-js';
import { ThemeSupa } from '@supabase/auth-ui-shared';

// Configuration de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Écouteur pour les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthenticated(!!session);
      },
    );

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      if (typeof authListener === 'function') {
        authListener();
      }
    };
  }, []);

  // Fonction pour gérer la redirection
  const handleRedirect = () => {
    if (authenticated) {
      router.push('/articles');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github']}
      />
      {authenticated && (
        <button onClick={handleRedirect} className="mt-4">
          Aller aux articles
        </button>
      )}
      {}
    </div>
  );
}
