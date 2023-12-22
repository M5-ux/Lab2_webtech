import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import BoutonDeco from '../components/BoutonDeco';
import Avatar from './Avatar';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [full_name, setFullname] = useState('');
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const user = session.user;

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, avatar_url, full_name`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
          setFullname(data.full_name);
        }
      } catch (error) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      getProfile();
    }
  }, [session]);

  async function updateProfile(profileData) {
    try {
      setLoading(true);
      const user = session.user;

      let { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...profileData });

      if (error) throw error;

      setSuccess('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Mon Profil
        </h1>

        <div className="flex flex-col items-center mb-4">
          {avatar_url && (
            <Avatar
              url={avatar_url}
              size={150}
              onUpload={(newUrl) => {
                setAvatarUrl(newUrl);
                updateProfile({ username, avatar_url: newUrl, full_name });
              }}
            />
          )}
        </div>
        {!editing ? (
          <>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <strong>Nom d&apos;utilisateur :</strong> <span>{username}</span>
            </div>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <strong>Nom complet :</strong> <span>{full_name}</span>
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={toggleEditing}
            >
              Éditer le Profil
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nom d&apos;utilisateur :
              </label>
              <input
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nom complet :
              </label>
              <input
                type="text"
                value={full_name || ''}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={() => updateProfile({ username, avatar_url, full_name })}
            >
              Mettre à Jour
            </button>
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleEditing}
            >
              Annuler
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <BoutonDeco />
        </div>
      </div>
    </div>
  );
}
