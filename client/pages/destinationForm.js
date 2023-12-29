import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

function DestinationForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [countries, setCountries] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const [session, setSession] = useState(supabase.auth.session);

  useEffect(() => {
    setSession(supabase.auth.session);

    const sessionListener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      sessionListener.data?.unsubscribe;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content && price && description && countries && !submitted) {
      const { data } = await supabase
        .from('articles')
        .insert([
          {
            title,
            description,
            countries,
            content,
            profile_id: session.user.id,
          },
        ])
        .select();

      if (data) {
        setSubmitted(true);
        router.push(`/destinationsImageChoice?id=${data[0].id}`);
      } else {
        console.error('Erreur lors de la soumission:');
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
              Ville:
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
              Price:
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            Choisir une image
          </button>
        </form>
      </section>
    </div>
  );
}

export default DestinationForm;
