import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';
import { useTheme } from '../context/ThemeContext';

function Contact() {
  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const bgColor = isDarkMode ? 'bg-dark-background' : 'bg-gray-100';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstname && lastname && email && message && !submitted) {
      const { data } = await supabase
        .from('contacts')
        .insert([
          { prenom: firstname, nom: lastname, email: email, message: message },
        ]);
      setSubmitted(true);
      router.push('/');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${bgColor}`}>
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className={`text-xl text-center font-bold text-gray-800 mb-4`}>
          Contactez-nous
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom :
            </label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled={submitted}
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Nom :
            </label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled={submitted}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email :
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled={submitted}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message :
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled={submitted}
            />
          </div>
          <button
            type="submit"
            className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
              isDarkMode
                ? 'bg-customBlueGreen text-white'
                : 'bg-customBlue text-white'
            } hover:bg-customBlueGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customBlue ${
              submitted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={submitted}
          >
            {submitted ? 'Envoyé' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
