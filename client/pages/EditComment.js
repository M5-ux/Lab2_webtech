import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

export default function EditComment() {
  const [comment, setComment] = useState({ content: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchComment(id);
  }, [id]);

  async function fetchComment(commentId) {
    let { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', commentId)
      .single();

    if (error) console.error(error);
    else setComment(data);
  }

  const handleInputChange = (e) => {
    setComment({ ...comment, content: e.target.value });
  };

  async function updateComment() {
    const now = new Date();
    const { error } = await supabase
      .from('comments')
      .update({ content: comment.content, created_at: now.toISOString() })
      .match({ id });

    if (error) console.error(error);
    else router.push('/userPosts');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Modifier le Commentaire</h1>
      <div className="mt-4">
        <textarea
          name="content"
          value={comment.content}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={updateComment}
          className="bg-customBlue hover:bg-customBlueGreen text-white p-2 rounded mt-2"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
