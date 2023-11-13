import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';


function listeContacts({ contact }) {
  if (!contact) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(contact, null, 2)}</pre>

    </div>
  );
}



export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const { data } = await supabase.from('contacts').select('*').eq('id', id).single();

  if (!data) {
    console.error('Contact not found');
    return {
      notFound: true,
    };
  }

  return {
    props: {
      contact: data,
    },
  };

}




export default listeContacts;
