import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

function ListeContacts({}) {
  const supabase = useSupabaseClient();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('contacts').select('*');
      setData(data);
    }

    loadData();
  }, [supabase]);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default ListeContacts;
