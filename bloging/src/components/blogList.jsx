import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bloglist.css';

function Bloglist() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get('https://blog-10-nrph.onrender.com/blogs/');
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(sortBlogs(filtered, sortOrder));
  }, [searchTerm, sortOrder, blogs]);

  const sortBlogs = (blogsArray, order) => {
    return [...blogsArray].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  return (
    <div className="blog-page-container">
      <div className="blog-header">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="blog-layout">
        <div className="blog-list-container">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-post">
                <p className="blog-author">
                  By <strong>{blog.author.username}</strong>
                </p>
                <h2>{blog.title}</h2>
                <p>{blog.content.substring(0, 200)}...</p>
                <a href={`/blog/${blog.id}`} className="read-more">
                  Read more
                </a>
              </div>
            ))
          )}
        </div>

        <aside className="reading-list">
          <h3>Reading List</h3>
          <ul>
            {filteredBlogs.slice(0, 5).map(blog => (
              <li key={blog.id}>
                <a href={`/blog/${blog.id}`}>{blog.title}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default Bloglist;
