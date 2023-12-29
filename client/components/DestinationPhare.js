import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../pages/ThemeContext';

export default function DestinationPhare() {
  const [articles, setArticles] = useState([]);
  const { isDarkMode } = useTheme();
  useEffect(() => {
    async function loadRandomArticles() {
      try {
        // On récupére tous les ID
        const { data: allArticles, error: allArticlesError } = await supabase
          .from('articles')
          .select('id');

        if (allArticlesError) throw allArticlesError;

        // On choisit aléatoirement 3 ID existants
        let selectedIds = [];
        while (selectedIds.length < 3) {
          const randomIndex = Math.floor(Math.random() * allArticles.length);
          const selectedId = allArticles[randomIndex].id;
          if (!selectedIds.includes(selectedId)) {
            selectedIds.push(selectedId);
          }
        }

        // On récupére les détails de ces 3 articles
        const { data: randomArticles, error: randomArticlesError } =
          await supabase.from('articles').select('*').in('id', selectedIds);

        if (randomArticlesError) throw randomArticlesError;

        setArticles(randomArticles);
      } catch (error) {
        console.error('Erreur de récupération des articles', error);
      }
    }

    loadRandomArticles();
  }, []);

  return (
    <div
      className={`flex justify-center items-center overflow-x-auto space-x-10 py-4 ${
        isDarkMode ? 'bg-dark-background' : ''
      }`}
    >
      {articles.map((article, index) => (
        <Link
          href={`/destinationsDescription/destinations/${article.id}`}
          key={article.id}
          className="flex-shrink-0"
        >
          <div
            className={`flex flex-col items-center cursor-pointer ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            <h2 className="text-lg mb-2">{article.title}</h2>
            <Image
              src={article.image}
              alt={article.title}
              width={300}
              height={300}
              className="w-40 h-40 object-cover mb-2"
            />
            <p className="text-sm">{article.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
