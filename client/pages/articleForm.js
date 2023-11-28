import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { supabase } from 'pages/login.js';
import { useRouter } from 'next/router';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content && !submitted) {
      const { data } = await supabase
        .from('articles')
        .insert([{ title, content }]);
      setSubmitted(true);
      router.push('/articles');
    }
  };

  return (
    <div className="container">
      <section className="article-form">
        <h2>remplir</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" disabled={submitted}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default ArticleForm;
