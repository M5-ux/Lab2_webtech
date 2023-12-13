import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import 'aos/dist/aos.css';
import AOS from 'aos';
import BoutonDeco from '../components/BoutonDeco';
import { supabase } from '../utils/supabase'
import '../styles/page.module.css';

const ProfilePage = () => {

  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [email, setEmail] = useState(null)
  const [fullname, setFullname] = useState(null)
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //AOS.init({ duration: 1000 });

    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        getCurrentUser(session.user.id);
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  const getCurrentUser = async (userId) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setEmail(data.email)
        setFullname(data.full_name)
      }

    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };


  async function updatedProfile({ username, website, avatar_url,fullname ,email}) {
    try {
      setLoading(true)
      const user = await getCurrentUser()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
        fullname,
        email,
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }


  //Mathias
  const handleSubmit = async (event) => {
    event.preventDefault();

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updatedProfile)
      .eq('user_id', supabase.auth.user().id);

    if (error) {
      throw error;
    }

    setProfile({ ...profile, ...data[0] });
    setEditingField(null);
    console.log('Profil mis à jour avec succès:', data);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
  }
  };

  return (
    <div className="container mx-auto p-4">
      <div data-aos="fade-up">
        <h1 className="text-3xl font-bold text-center mb-8">Mon Profil</h1>
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
          {!editing ? (
            <div>
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
              <div className="edit-icon" onClick={handleEditClick}>
                <Image src="/icon.png" alt="Edit" width={40} height={40} />
              </div>
            </div>
          ) : (
            //Mathias
            <form onSubmit={handleSubmit}> 
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Nom d'utilisateur:</label>
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="border p-2 rounded-lg w-full"
                />
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                <input
                  type="text"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="border p-2 rounded-lg w-full"
                />
                <label className="block text-gray-700 font-bold mb-2">Avatar:</label>
                <input
                  type="text"
                  value={profile.avatar_url}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={handleCancelClick} className="bg-gray-500 text-white p-2 rounded-lg">
                  Annuler
                </button>
                <button type="submit" className="bg-customBlue text-white p-2 rounded-lg">
                  Sauvegarder
                </button>
              </div>
            </form>
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