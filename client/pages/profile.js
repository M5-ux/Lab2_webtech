import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'aos/dist/aos.css';
import AOS from 'aos';
import BoutonDeco from '../components/BoutonDeco';
import { supabase } from './login.js';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ full_name: '', avatar_url: '' });
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchProfile(session.user.id);
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  const fetchProfile = async (userId) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(profileData || {});
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div data-aos="fade-up">
        <h1 className="text-3xl font-bold text-center mb-8">Mon Profil</h1>
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nom d'utilisateur:</label>
            <p>{profile.full_name}</p> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <p>{profile.email}</p> 
          </div>
          {profile.avatar_url && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Avatar:</label>
              <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
            </div>
          )}
        </div>
      </div>
      <div className="text-center mt-6" data-aos="fade-up">
        <BoutonDeco />
      </div>
    </div>
  );
};

export default ProfilePage;
