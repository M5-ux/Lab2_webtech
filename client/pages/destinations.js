import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';

export default function Destination() {
  const [articles, setArticles] = useState([]);

  const [Articles2, setArticles2] = useState([]);
  const [recherche, setRecherche] = useState('');
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

  const { isDarkMode } = useTheme(); // DarkMode

  useEffect(() => {
    async function chargerArticles() {
      const { data, error } = await supabase
        .from('articles')
        .select('*,profiles:profile_id (username, avatar_url)')
        .order('created_at', { ascending: true });

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
      (articles) =>
        articles.title.toLowerCase().includes(lowercasedFilter) ||
        articles.description.toLowerCase().includes(lowercasedFilter),
    );
    setArticles2(filteredData);
  }, [recherche, articles]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchTerm)}`,
      );

      if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }

      const result = await response.json();

      setArticles(result);
    } catch (error) {
      console.error('Erreur lors de l appel de l API de recherche:', error);
    }
  };

  return (
    <>
      <div
        className={
          isDarkMode
            ? 'bg-dark-background text-dark-text py-10'
            : 'bg-gray-100 text-gray-800 py-10'
        }
      >
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Articles2.map((article, index) => (
              <div
                key={article.id}
                className={`rounded-lg shadow overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col ${
                  isDarkMode
                    ? 'bg-dark-background border border-gray-700'
                    : 'bg-white'
                }`}
              >
                <Link
                  href={`/destinationsDescription/destinations/${article.id}`}
                >
                  <div className="h-48 w-full overflow-hidden cursor-pointer">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={300}
                      height={300}
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div>
                </Link>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <h2
                    className={`text-xl font-semibold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {article.title}
                  </h2>
                  <p
                    className={`mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {article.description}
                  </p>
                  <p className={isDarkMode ? 'text-white' : 'text-gray-600'}>
                    Prix : {article.price}
                  </p>

                  <div className="flex items-center justify-center mt-4">
                    {article.profiles.avatar_url && (
                      <img
                        src={article.profiles.avatar_url}
                        alt={article.profiles.username}
                        className="w-10 h-10 rounded-full object-cover mr-2"
                      />
                    )}
                    <span
                      className={isDarkMode ? 'text-white' : 'text-gray-700'}
                    >
                      Écrit par {article.profiles.username}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {session ? (
            <div className="text-center mt-10">
              <Link
                href="/destinationForm"
                className="bg-customBlue hover:bg-customBlueGreen text-white py-3 px-6 rounded-full text-lg font-semibold  transition duration-300"
              >
                Ajouter une destination
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
