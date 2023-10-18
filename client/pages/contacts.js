import React from 'react';
import Link from 'next/link';

function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>
        If you have any questions or feedback, please feel free to contact us.
      </p>
      <p>
        Email: contact@example.com
      </p>
      <p>
        Phone: +33 12 34 56 78 90
      </p>
      <div className="mb-4 space-y-2">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Retour à l'Accueil
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Contact;
