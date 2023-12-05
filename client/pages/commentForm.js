import React, { useState, useEffect } from 'react';
import { supabase } from 'pages/login.js';
import { useRouter } from 'next/router';

function commentForm({ articleId }) {
  const [formVisible, setFormVisible] = useState(true);  
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( content && !submitted) {
      const { data } = await supabase
        .from('comments')
        .insert([{ id_article: articleId, content: content }]);
      setSubmitted(true);
      router.push(`/articlesDescription/articles/${articleId}`);

      setFormVisible(false);
    }
  };

  return formVisible && (
    <div className="container">
      <section className="article-form">
        <h2>remplir</h2>
        <form onSubmit={handleSubmit}>
          <br />
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" disabled={submitted} >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default commentForm;
