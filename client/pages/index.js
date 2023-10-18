// pages/index.js
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Effectuez la demande à l'endpoint /api/profile
    fetch('/api/profile')
      .then((response) => {
        if (response.status === 401) {
          // Gérer l'absence d'autorisation (utilisateur non connecté) ici
          console.log('L\'utilisateur n\'est pas connecté');
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Bienvenue sur ma page d'accueil Next.js !</h1>
      <div className="user-profile"></div>
      {userProfile ? (
        <div>
          <p className="text-gray-500"> <FontAwesomeIcon icon={faUser} /> </p>
          <p className="text-green-600">Email: {userProfile.username}</p>
          <p className="text-green-600">Email: {userProfile.email}</p>
        </div>
      ) : (
        <p className="text-red-500">Non connecté</p>
      )}
      <div className="mb-4 space-y-2">
      <br />
        <Link href="/about">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            À Propos
          </button>
        </Link>

        <Link href="/contacts">
          <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Contact
          </button>
        </Link>

        <Link href="/articles">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Liste d'articles
          </button>
        </Link>
      </div>

      <p className="fixed bottom-0 left-0 w-full">&copy; 2023 Ma Page d'Accueil</p>
    </div>
  );
}

