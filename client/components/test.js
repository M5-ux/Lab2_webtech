import { createClient } from '@supabase/supabase-js'

// Initialisation de Supabase
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Récupération de la session actuelle
const session = supabase.auth.session();

if (session) {
  console.log('Utilisateur connecté :', session.user);
} else {
  console.log('Aucun utilisateur connecté.');
}

// Écouter les changements de session
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('Utilisateur connecté :', session.user);
  }
  if (event === 'SIGNED_OUT') {
    console.log('Utilisateur déconnecté');
  }
});
