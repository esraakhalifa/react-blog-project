import React from 'react'
import EditPost from '../pages/EditPost';
import { Link } from "react-router-dom";

export default function BlogMenu() {
  const blogs = [
    {
      id: 1,
      title: "How to Learn React Fast",
      description: "Master React with this practical step-by-step guide.",
      image: "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.avif",
    },
    {
      id: 2,
      title: "Understanding TypeScript",
      description: "A deep dive into TypeScript for JavaScript developers.",
      image: "https://img.daisyui.com/images/stock/photo-1507209696998-3c532be9b2b5.avif",
    },
    {
      id: 3,
      title: "NestJS for Beginners",
      description: "Why NestJS is the best Node.js framework in 2024.",
      image: "https://img.daisyui.com/images/stock/photo-1526401485004-2fa806b5e19b.avif",
    },
  ];

  // Handlers (placeholders)
//   const handleEdit = (id) => {
//     alert(`Edit blog with ID ${id}`);
//   };

  const handleDelete = (id) => {
    alert(`Delete blog with ID ${id}`);
  };

  return (
    <section className="py-12 px-6 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{blog.title}</h3>
              <p>{blog.description}</p>
              <div className="card-actions justify-between">
                <div className="flex gap-2">
                  <Link to="/edit-post"><button  className="btn btn-outline btn-accent btn-sm">
                    Edit
                  </button></Link>
                  <button onClick={() => handleDelete(blog.id)} className="btn btn-outline btn-error btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
