import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'

function Contact() {
  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstname && lastname && email && message && !submitted) {
      const { data } = await supabase
        .from('contacts')
        .insert([{ firstname, lastname, email, message }]);
      setSubmitted(true);
    }
  };

  return (
    <div className="container">
      <section className="contact-form">
        <h2>Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
          {}
          <button type="submit" disabled={submitted}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
