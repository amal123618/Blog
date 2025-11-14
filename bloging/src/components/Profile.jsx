import React, { useEffect, useState } from 'react';
import api from '../api';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({});
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/Profile/');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
  };

  const handleUpdate = async () => {
    if (!editingBlog) return;
    try {
      await api.put(`/update/${editingBlog.id}/`, {
        title: updatedTitle,
        content: updatedContent
      });
      setEditingBlog(null);
      fetchUserProfile();
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await api.delete(`/delete/${id}/`);
      fetchUserProfile();
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>Welcome, {user.username}</h2>
        <p>Email: {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="user-blogs">
        <h3>Your Blogs</h3>
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              {editingBlog && editingBlog.id === blog.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditingBlog(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h4>{blog.title}</h4>
                  <p>{blog.content.substring(0, 100)}...</p>
                  <button onClick={() => handleEdit(blog)}>Edit</button>
                  <button onClick={() => handleDelete(blog.id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
