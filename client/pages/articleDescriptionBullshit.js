import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase'
import Link from 'next/link';

export default function useListeArticles() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('articles').select('title, content, comments(*)');
      setData(data || []);
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Liste des Articles</h2>
      {data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((article, index) => (
            <li key={index} className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-700 mb-4">{article.content}</p>
              <h4 className="font-bold">Commentaires:</h4>
              <ul className="list-disc list-inside">
                {article.comments.map((comment) => (
                  <li key={comment.id} className="text-gray-600">{comment.content}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Chargement...</p>
      )}

      <div className="text-center mt-8">
        <Link href="/add-destinations">
          <a className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Ajouter une destination +
          </a>
        </Link>
      </div>
    </div>
  );
}
