import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        content: newPost,
      });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container">
      <h2>Welcome to SociaGraph</h2>

      <form onSubmit={handlePostSubmit} className="post-card">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #e5e7eb',
            fontFamily: 'inherit',
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
          Post
        </button>
      </form>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet. Be the first to share!</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.author?.username || 'Anonymous'}</h3>
            <p>{post.content}</p>
            <div className="post-actions">
              <button className="btn btn-secondary">👍 Like ({post.likes?.length || 0})</button>
              <button className="btn btn-secondary">💬 Comment</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
