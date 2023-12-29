import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Account from '../components/Account';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useTheme } from '../pages/ThemeContext';
import { Auth } from '@supabase/auth-ui-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    }

    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      mounted = false;

      subscription?.umountednsubscribe();
    };
  }, []);

  return (
    <div
      className={`container flex justify-center items-center min-h-screen ${
        isDarkMode ? 'bg-dark-background text-white' : 'bg-white text-gray-800'
      }`}
    >
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github']}
        />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
