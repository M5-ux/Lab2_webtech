import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from 'pages/login.js';
import Link from 'next/link';

export default function useListeArticles({}) {
  const [data, setData] = useState('');

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('articles').select('title,content, comments(*)');
      setData(data || []);
    }

    loadData();
  }, []);

  return (
    <div>
      <h2>Liste des articles</h2>
      {data ? (
        <ul>
          {data.map((article, index) => (
            <li key={index}>
              {article.title}

              <h2>{article.content}</h2>

              <ul>
              {article.comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>




            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      <Link href="/articleForm">
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          +
        </button>
      </Link>
    </div>
  );
}