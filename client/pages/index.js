import Header from '../components/header';
import Link from 'next/link';
import DestinationPhare from '../components/DestinationPhare';
import About from './about';
import Contact from './contacts';

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
          className="bg-white text-customBlueGreen py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Réservez Maintenant
        </Link>
      </section>

      {/* Section Destinations Phares */}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto">
          <div
            data-aos="fade-up"
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-4xl font-semibold text-center">
              Destinations Phares
            </h2>
            <DestinationPhare />
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section className="py-20 px-6 bg-gray-100">
        <div
          data-aos="fade-right"
          className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-4xl font-semibold mb-4">À Propos de Nous</h2>
          <About />
          <div className="flex justify-center items-center">
            <Link
              href="/about"
              className=" bg-customBlueGreen text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-customBlue transition duration-300"
            >
              A propos de nous
            </Link>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-20 px-6 bg-customBlueGreen">
        <div
          data-aos="fade-left"
          className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-4xl font-semibold mb-4 text-customBlueGreen">
            Contactez-Nous
          </h2>
          <Contact />
        </div>
      </section>

      {/* Footer */}
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
