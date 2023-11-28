import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Bienvenue sur ma page d&apos;accueil Next.js !
      </h1>

      <div className="text-center">
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
              Liste d&apos;articles
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
          &copy; 2023 Ma Page d&apos;accueil Next.js
        </p>
      </div>
    </div>
  );
}
