// pages/api/search.js
import { supabase } from '../../utils/supabase';

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    let queryBuilder = supabase
      .from('articles')
      .select('*, profiles:profile_id (username, avatar_url)'); // Jointure avec la table des profils

    if (query) {
      queryBuilder = queryBuilder
        .ilike('title', `%${query}%`)
        .order('created_at', { ascending: true });
    } else {
      queryBuilder = queryBuilder.order('created_at', { ascending: true });
    }

    const { data, error } = await queryBuilder;

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
