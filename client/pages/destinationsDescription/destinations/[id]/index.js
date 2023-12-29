/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import CommentForm from '../../../commentForm.js';
import { supabase } from '/utils/supabase';
import Image from 'next/image';
import Weather from '../../../../components/weather.js';
import { useTheme } from '../../../../context/themeContext.js';

function UniqueDestination({ article, comments }) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? 'text-white' : 'text-gray-700';
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

  const handleShowCommentForm = () => {
    setShowCommentForm(true);
  };

  if (!article && !comments) {
    return (
      <p
        className={
          isDarkMode ? 'text-center text-white' : 'text-center text-gray-800'
        }
      >
        Chargement...
      </p>
    );
  }

  return (
    <div
      className={`container mx-auto p-4 ${
        isDarkMode ? 'bg-dark-background' : 'bg-white'
      }`}
    >
      {/* Section Destination*/}
      <article
        data-aos="fade-up"
        className={`shadow-lg rounded-lg overflow-hidden mb-6 bg-white}`}
      >
        <Image
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
          width={300}
          height={300}
        />
        <div
          className={`p-6 ${isDarkMode ? 'bg-dark-background' : 'bg-white'}`}
        >
          <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>
            {article.title}
          </h1>
          <p className={textColor}>{article.content}</p>
        </div>
      </article>

      {/* Section Méteo */}
      <section
        data-aos="fade-left"
        className={`shadow rounded-lg p-6 my-4 ${
          isDarkMode ? 'bg-dark-background' : 'bg-white'
        }`}
      >
        <Weather city={article.title} />
      </section>

      {/* Section Commentaire */}
      <section
        data-aos="fade-right"
        className={`shadow rounded-lg p-6 ${
          isDarkMode
            ? 'bg-dark-background text-white'
            : 'bg-white text-gray-700'
        }`}
      >
        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>Commentaires</h2>
        <ul className="list-disc pl-5 mb-6">
          {comments &&
            Array.isArray(comments) &&
            comments.map((comment) => (
              <li key={comment.id} className="mb-4 flex items-start space-x-4 ">
                {comment.profiles && comment.profiles.avatar_url ? (
                  <img
                    src={comment.profiles.avatar_url}
                    alt={comment.profiles.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {/* Placeholder pour l'avatar */}
                  </span>
                )}
                <div>
                  {comment.profiles ? (
                    <p className="font-semibold">{comment.profiles.username}</p>
                  ) : (
                    <p className="font-semibold ">Utilisateur anonyme</p>
                  )}
                  <p>{comment.content}</p>
                </div>
              </li>
            ))}
        </ul>

        {session ? (
          <button
            onClick={handleShowCommentForm}
            className="bg-customBlue hover:bg-customBlueGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ajouter un commentaire
          </button>
        ) : (
          <div></div>
        )}

        {showCommentForm && <CommentForm articleId={article.id} />}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const { data: article, error: articleError } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select(
      `
      *, 
      profiles:user_id (username, avatar_url)
    `,
    )
    .eq('id_article', id);

  if (articleError || commentsError) {
    console.error(
      'Erreur lors de la récupération des données:',
      articleError || commentsError,
    );
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      comments,
    },
  };
}

export default UniqueDestination;
