import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import Image from 'next/image';

export default function DestinationPhare() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadArticles() {
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

    loadArticles();
  }, []);

  return (
    <div className="flex justify-center items-center overflow-x-auto space-x-10 py-4">
      {articles.map((article, index) => (
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
            <Image
              src={article.image}
              alt={article.title}
              className="w-40 h-40 object-cover mb-2"
            />{' '}
            {/* Utilisez object-cover pour maintenir l'aspect ratio de l'image */}
            <p className="text-sm">{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
