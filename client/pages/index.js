import Header from '../components/header';
import Link from 'next/link';
import DestinationPhare from '../components/DestinationPhare';

export default function Home() {
  return (
    <div className="bg-teal-500 font-sans">
      <section
        data-aos="zoom-in"
        className="text-center py-20 bg-customBlueGreen text-white"
      >
        <h1 className="text-5xl font-bold mb-6">
          Explorez le Monde avec SoleyEvazyon
        </h1>
        <p className="text-xl mb-6">Des voyages inoubliables vous attendent</p>
        <Link
          href="/destinations"
          className="bg-white text-customBlueGreen py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Réservez Maintenant
        </Link>
      </section>

      {/* Section Destinations */}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold text-center">
            Destinations Phares
          </h2>
          <DestinationPhare />

          {/* Contenu Destinations */}
        </div>
      </section>

      {/* Autres sections de contenu pour la page d'accueil ici */}

      <footer className="bg-customBlue text-white py-6">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} SoleyEvazyon. Tous droits
            réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
