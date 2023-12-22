import React from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

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
        className="bg-customBlue hover:bg-customBlueGreen text-white font-bold py-6 px-4 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default BoutonDeco;
