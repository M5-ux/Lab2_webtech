import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

function DestinationForm({ session }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [countries, setCountries] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Mettre à jour l'userId lorsque la session change
    if (session?.user) {
      setUserId(session.user.id);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content && description && countries && !submitted) {
      const { error } = await supabase
        .from('articles')
        .insert([{ title, description, countries, content, user_id: userId }]);

      if (error) {
        console.error('Erreur lors de la soumission:', error);
      } else {
        setSubmitted(true);
        router.push('/destinations');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Ajouter une destination</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-xl font-bold mb-2">
              Titre:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xl font-bold mb-2">
              Description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xl font-bold mb-2">
              Countries:
            </label>
            <input
              type="text"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xl font-bold mb-2">
              Contenu:
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="bg-customBlue hover:bg-customBlueGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Soumettre
          </button>
        </form>
      </section>
    </div>
  );
}

export default DestinationForm;
