import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur ma page d'accueil Next.js !</h1>
      <p className="mb-4">C'est ma première page avec Next.js.</p>

      <div className="mb-4 space-y-2">
        <Link href="/about">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            À Propos
          </button>
        </Link>

        <Link href="/contacts">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Contact
          </button>
        </Link>

        <Link href="/articles">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Liste d'articles
          </button>
        </Link>
      </div>

      <p className="mt-4">&copy; 2023 Ma Page d'Accueil Next.js</p>
    </div>
  );
}
