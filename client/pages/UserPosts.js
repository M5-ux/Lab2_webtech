import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [session, setSession] = useState(supabase.auth.session);

  useEffect(() => {
    setSession(supabase.auth.session);

    const sessionListener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      sessionListener.data?.unsubscribe;
    };
  }, []);

  useEffect(() => {
    if (session) {
      fetchPostsAndComments(session.user.id);
    }
  }, [session]);

  async function fetchPostsAndComments(userId) {
    let { data: userPosts, error: postsError } = await supabase
      .from('articles')
      .select('*')
      .eq('profile_id', userId);

    let { data: userComments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('user_id', userId);

    if (!postsError) setPosts(userPosts);
    if (!commentsError) setComments(userComments);
  }

  async function deletePost(postId) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .match({ id: postId });

      if (!error) setPosts(posts.filter((post) => post.id !== postId));
    }
  }

  async function deleteComment(commentId) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      const { error } = await supabase
        .from('comments')
        .delete()
        .match({ id: commentId });

      if (!error)
        setComments(comments.filter((comment) => comment.id !== commentId));
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Mes Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded-md shadow-sm flex flex-col"
            >
              {post.image && (
                <div className="w-full h-48 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md mb-3"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  X
                </button>
                <Link
                  href={`/EditPost?id=${post.id}`}
                  className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Modifier
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun post à afficher.</p>
        )}
      </div>

      <h1 className="text-2xl font-semibold mt-6">Mes Commentaires</h1>
      <div className="space-y-4 mt-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border p-4 rounded-md shadow-sm flex justify-between items-start"
            >
              <p className="flex-1">{comment.content}</p>
              <div className="flex items-center">
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  X
                </button>
                <Link
                  href={`/EditComment?id=${comment.id}`}
                  className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Modifier
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun commentaire à afficher.</p>
        )}
      </div>
    </div>
  );
}
