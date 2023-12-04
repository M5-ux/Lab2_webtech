import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { supabase } from '../utils/supabaseClient';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    AOS.init();
    async function loadDestinations() {
      // Recuperere les donnnées ici
    }
    loadDestinations();
  }, []);

  return (
      <div className="grid md:grid-cols-3 gap-10">
        {destinations.map((destination, index) => (
          <div key={index} className="bg-customBlueGreen text-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105" data-aos="fade-up">
            <img src={destination.imageUrl} alt={destination.name} className="w-full h-64 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{destination.titre}</h2>
              <p>{destination.description}</p> 
              <p>{destination.prix}</p> 
              <p>{destination.nb_pers}</p> 
              <p>{destination.note}</p> 
            </div>
          </div>
        ))}
      </div>
        );
}
