import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/router';
import { supabase } from './supabase';


const Login = () => {
  //const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { user } = Auth.useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile page if the user is already authenticated
    if (user) {
      router.push('./profile');
    }
  }, [user, router]);

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'facebook', 'twitter']}
        onSuccess={() => {
          console.log('Login successful'); // Ajoutez cette ligne pour le débogage
          router.push('/profile');
        }}
        onError={(error) => console.error('Login error:', error)}
      />
    </div>
  );
};

export default Login;
