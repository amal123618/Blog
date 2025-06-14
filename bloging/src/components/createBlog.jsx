import React, { useState } from 'react';
import axios from 'axios';
import './CreateBlog.css';

function CreateBlog() {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authorized. Please log in.');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/create_blog/',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert('Blog created');
      console.log(response.data);
      setForm({ title: '', content: '' });
    } catch (err) {
      alert('Error creating blog');
      console.error(err);
    }
  };

  return (
    <div className="create-blog-container">
      <form onSubmit={handleSubmit} className="create-blog-form">
        <h2>Create a New Blog</h2>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Blog Title"
          required
        />
        <textarea
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          placeholder="Write your content here..."
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreateBlog;
