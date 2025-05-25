import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getAccessToken } from '../utils/authService';

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(decoded.user_id); // or `id`, depending on your payload structure
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/posts/${postId}/`, {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      });
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-error mt-10">
        <p className="text-xl font-semibold">Post not found.</p>
      </div>
    );
  }

  const isAuthor = post.author?.id === currentUserId;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="card shadow-xl bg-base-100">
        {/* Post Image */}
        {post.image && (
          <figure>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-t-xl"
            />
          </figure>
        )}

        <div className="card-body">
          <h1 className="card-title text-3xl font-bold text-primary">{post.title}</h1>

          <p className="text-sm text-gray-500 mb-2">
            ✍️ By{' '}
            <span className="font-semibold">
              {post.author?.first_name} {post.author?.last_name}
            </span>
          </p>

          <div className="divider" />

          <p className="text-lg leading-relaxed">{post.content}</p>

          {isAuthor && (
            <div className="flex gap-4 mt-6">
              <Link to={`/edit-post/${post.id}`} className="btn btn-primary">
                ✏️ Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-error">
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
