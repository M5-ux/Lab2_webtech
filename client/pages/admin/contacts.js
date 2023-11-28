import { useEffect, useState } from 'react';
import { supabase } from 'pages/login.js';

export default function useListeContacts({}) {
  const [data, setData] = useState('');

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('contacts').select('*');
      setData(data || []);
    }

    loadData();
  }, []);

  return (
    <div>
      <h2>Liste des Contacts</h2>
      {data ? (
        <ul>
          {data.map((contact, index) => (
            <li key={index}>
              {contact.lastname}

              <h2 className="text-2xl text-blue-600">{contact.firstname}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
