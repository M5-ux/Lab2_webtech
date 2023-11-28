import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [userProfile, setUserProfile] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Effectuez la demande à l'endpoint /api/profile
    fetch('/api/profile')
      .then((response) => {
        if (response.status === 401) {
          // Gérer l'absence d'autorisation (utilisateur non connecté) ici
          console.log("L'utilisateur n'est pas connecté");
          return null;
        }
        if (response.status === 200) {
          // Analysez la réponse JSON et définissez les données du profil de l'utilisateur
          return response.json();
        }
        throw new Error('Échec de la récupération des données de profil');
      })
      .then((data) => {
        if (data) {
          setUserProfile(data);
          setAuthenticated(true); // Mettez à jour l'état d'authentification ici
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Bienvenue sur ma page d'accueil Next.js !
      </h1>

      <div className="text-center">
        {authenticated ? (
          <div>
            <p className="text-gray-500">
              {' '}
              <FontAwesomeIcon icon={faUser} />{' '}
            </p>
            <p className="text-green-600">Connecté</p>
          </div>
        ) : (
          <div className="user-profile"></div>
        )}
        {authenticated ? null : <p className="text-red-500">Non connecté</p>}
        <p className="mb-8 text-gray-700 text-lg">
          C'est ma première page avec Next.js.
        </p>

        <div className="space-y-4">
          <Link href="/about">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              À Propos
            </button>
          </Link>

          <Link href="/contacts">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Contact
            </button>
          </Link>

          <Link href="/articles">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Liste d'articles
            </button>
          </Link>

          <Link href="/admin/contacts">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              liste de contacts
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              login
            </button>
          </Link>
        </div>

        <p className="mt-8 text-gray-600 text-sm">
          &copy; 2023 Ma Page d'accueil Next.js
        </p>
      </div>

    
    </div>
  );
}