import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


function listeContacts({ }) {
  const supabase = useSupabaseClient();
  const [data, setData] = useState()

  useEffect(() => {

    async function loadData() {
      const { data } = await supabase.from('contacts').select('*')
      setData(data)
    }

    loadData()
  }, []);



  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>

  );
}

export default listeContacts;