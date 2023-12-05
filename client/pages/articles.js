import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from 'pages/login.js';
import Link from 'next/link';

export default function DestinationPhare() {
  const [articles, setArticles] = useState([]);

  const [Articles2, setArticles2] = useState([]);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    async function chargerArticles() {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('id', { ascending: true })
        .limit(3); // Limiter à 3 articles aa changer avec les likes peut etre

      if (error) {
        console.error('Erreur de récupération des articles', error);
      } else {
        setArticles(data);
      }
    }

    chargerArticles();
  }, []);

  useEffect(() => {
    const lowercasedFilter = recherche.toLowerCase();
    const filteredData = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedFilter) ||
        article.description.toLowerCase().includes(lowercasedFilter),
    );
    setArticles2(filteredData);
  }, [recherche, articles]);

  return (
    <>
      <div className="flex justify-center items-center overflow-x-auto space-x-10 py-2">
        <input
          type="text"
          placeholder="Recherche..."
          className="p-2 border rounded"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-center overflow-x-auto space-x-10 py-4">
        {Articles2.map((article, index) => (
          <div
            key={article.id}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
            className="flex-shrink-0"
          >
            <div className="flex flex-col items-center">
              {' '}
              {/* Centre verticalement et horizontalement les contenus de l'article */}
              <h2 className="text-lg mb-2">{article.title}</h2>

              <Link href={`/articlesDescription/articles/${article.id}`}>
              <img
                src={article.image}
                alt={article.title}
                className="w-40 h-40 object-cover mb-2"
              />
               </Link>
              {' '}
              {/* Utilisez object-cover pour maintenir l'aspect ratio de l'image */}
              <p className="text-sm">{article.description}</p>
              <p className="text-sm">{article.price}</p>
            </div>
          </div>
        ))}

        <Link href="/articleForm">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            +
          </button>
        </Link>
      </div>
    </>
  );
}
