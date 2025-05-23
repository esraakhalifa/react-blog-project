import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function BlogMenu() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // For controlling modal visibility and which post to delete
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Fetch blogs from API
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // When delete button clicked -> open modal and save post id
  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  // Confirm delete: call API, refetch posts, close modal
  const confirmDelete = async () => {
    if (!postToDelete) return;

    setLoading(true);
    setShowModal(false);

    try {
      await axios.delete(`http://localhost:8000/posts/${postToDelete}/`);
      await fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{post.title}</h3>
              <p>{post.description}</p>
              <div className="card-actions justify-between">
                <div className="flex gap-2">
                  <Link to={`/edit-post/${post.id}`}>
                    <button className="btn btn-outline btn-accent btn-sm">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <dialog key="delete-modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this blog post?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={confirmDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
