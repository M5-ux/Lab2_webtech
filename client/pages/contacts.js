import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

function Contact() {

  const [lastname, setLastName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); 


  const supabase = useSupabaseClient();

  useEffect(() => {
    const insertContact = async () => {
        if (firstname && lastname && email && message && !submitted) {
          const { data } = await supabase.from('contacts').insert([{ firstname, lastname, email, message }]);
          setSubmitted(true);
        }
      
    };
    insertContact();

  }, [firstname, lastname, email, message, supabase, submitted]); 

  const handleFirtsNameChange = (e) => {
    setFirstName(e.target.value);
  };
  
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return ( 
    <div class="container"> 
    <section class="contact-form">
        <h2>Contactez-nous</h2>
        <form action="#" method="POST">
            <div class="form-group">
                <label for="name">Firstname :</label>
            <input type="text" value={firstname} onChange={handleFirtsNameChange} />

            </div>
            <div class="form-group">
                <label for="name">Lastname :</label>
                           <input type="text" value={lastname} onChange={handleLastNameChange} />

            </div>
            <div class="form-group">
                <label for="email">Email :</label>
                          <input type="text"  value={email} onChange={handleEmailChange} />

            </div>
            <div class="form-group">
                <label for="message">Message :</label>
                <textarea id="message" name="message" rows="4" value={message} onChange={handleMessageChange}
                ></textarea>
            </div>
            <button type="submit" disabled={submitted}> Submit
            </button>
        </form>
    </section>
</div>
  );
}

export default Contact;






