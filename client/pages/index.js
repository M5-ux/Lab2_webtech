import Link from 'next/link';
import Header from '../components/header';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur ma page d&apos;accueil Next.js !</h1>
      <p className="mb-4">C&apos;est ma première page avec Next.js.</p>

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
            Liste d&apos;articles
          </button>
        </Link>

        <Header />



      </div>i

      <p className="mt-4">&copy; 2023 Ma Page d&apos;Accueil Next.js</p>
    </div>
  );
}
