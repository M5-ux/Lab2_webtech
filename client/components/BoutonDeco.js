import React from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

// Configuration de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const BoutonDeco = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); 
  };

  return (
    <div>
     

      <button
        onClick={handleLogout}
        className="bg-customBlue hover:bg-customBlueGreen text-white font-bold py-10 px-4 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default BoutonDeco;
