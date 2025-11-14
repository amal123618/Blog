import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import './CreateBlog.css';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post('/create_blog/', { title, content });
      navigate('/Blogs');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create blog.');
    }
  };

  return (
    <div className="create-blog-container">
      <div className="create-blog-left">
        <h2>Create a New Blog</h2>
        <p>Share your thoughts with the world.</p>
      </div>
      <form onSubmit={handleSubmit} className="create-blog-form">
        {message && <p className="error-message">{message}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name="content"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreateBlog;
