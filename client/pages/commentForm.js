import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';

function CommentForm({ articleId }) {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const sessionListener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    // Obtenir la session actuelle
    setSession(supabase.auth.session);
    return () => {
      sessionListener.data?.unsubscribe;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content && articleId) {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          { id_article: articleId, content: content, user_id: session.user.id },
        ]);
      setSubmitted(true);
      router.push(`/destinations`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Ajouter un Commentaire</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 font-bold mb-2"
            >
              Commentaire :
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Votre commentaire..."
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

export default CommentForm;
