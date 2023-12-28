import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

export default function EditPost() {
  const [post, setPost] = useState({ title: '', content: '', image: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchPost(id);
  }, [id]);

  async function fetchPost(postId) {
    let { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) console.error(error);
    else setPost(data);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  async function updatePost() {
    const now = new Date();
    const { data, error } = await supabase
      .from('articles')
      .update({
        title: post.title,
        content: post.content,
        created_at: now.toISOString(),
      })
      .match({ id: post.id });

    if (error) {
      console.error('Erreur lors de la mise à jour du post:', error);
    } else {
      console.log('Post mis à jour avec succès:', data);
      router.push('/userPosts');
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Modifier le Post</h1>
      <div className="mt-4">
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleInputChange}
          className="border p-2 rounded w-full mt-2"
        />
        {/* Gérer l'upload d'image si nécessaire */}
        <button
          onClick={updatePost}
          className="bg-customBlue hover:bg-customBlueGreen text-white p-2 rounded mt-2"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
