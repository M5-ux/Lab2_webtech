import React from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

// Configuration de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const ProfilePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirige vers la page d'accueil après la déconnexion
  };

  return (
    <div>
      {/* ... votre contenu de la page ... */}

      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default ProfilePage;
