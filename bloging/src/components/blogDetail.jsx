import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = 'http://127.0.0.1:8000';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/blog/${id}/`);
      setBlog(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      setError('Failed to load the blog post. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/blog/${id}/comments/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await axios.post(
        `${API_BASE_URL}/blog/${id}/comments/add/`,
        { content: newComment },
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/blog/comments/${commentId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/blog/comments/${commentId}/update/`,
        { content: editedCommentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingCommentId(null);
      setEditedCommentContent('');
      fetchComments();
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  if (isLoading) return <div className="blog-loading">Loading...</div>;
  if (error) return <div className="blog-error">{error}</div>;

  return (
    <div className="blog-detail-container">
      {blog && (
        <article className="blog-content">
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-meta">
            Published on {new Date(blog.created_at).toLocaleDateString()}
          </p>
          <div className="blog-body">{blog.content}</div>
          <button className="back-btn" onClick={() => navigate('/Blogs')}>← Back to Blogs</button>

          <button
            className="toggle-comments-btn"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>

          {showComments && (
            <section className="comments-section">
              <h3>Comments</h3>
              {token ? (
                <div className="add-comment">
                  <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={handleAddComment}>Post Comment</button>
                </div>
              ) : (
                <p className="login-prompt">Please log in to leave a comment.</p>
              )}

              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <p><strong>{comment.author}</strong>:</p>
                    {editingCommentId === comment.id ? (
                      <>
                        <textarea
                          value={editedCommentContent}
                          onChange={(e) => setEditedCommentContent(e.target.value)}
                        />
                        <div className="comment-actions">
                          <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
                          <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>{comment.content}</p>
                        <small>{new Date(comment.created_at).toLocaleString()}</small>
                        {/* Only show edit/delete buttons if this is the user's comment */}
                        {comment.is_author && (
                          <div className="comment-actions">
                            <button 
                              className="edit-btn"
                              onClick={() => handleEditComment(comment)}
                            >
                              Edit
                            </button>
                            <button 
                              className="delete-btn"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </section>
          )}
        </article>
      )}
    </div>
  );
}

export default BlogDetail;
