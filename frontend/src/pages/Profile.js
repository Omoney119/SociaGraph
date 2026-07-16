import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUser(userResponse.data);
      
      const postsResponse = await axios.get(`http://localhost:5000/api/users/${userId}/posts`);
      setPosts(postsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!user) return <div className="container">User not found</div>;

  return (
    <div className="container">
      <div className="post-card">
        <h2>{user.username}</h2>
        <p>{user.profile?.bio || 'No bio yet'}</p>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Followers:</strong> {user.profile?.followers?.length || 0}</p>
          <p><strong>Following:</strong> {user.profile?.following?.length || 0}</p>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Follow</button>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <p>{post.content}</p>
            <div className="post-actions">
              <button className="btn btn-secondary">👍 Like</button>
              <button className="btn btn-secondary">💬 Comment</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
