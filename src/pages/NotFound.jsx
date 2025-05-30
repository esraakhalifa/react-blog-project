import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Hero Section */}
      <div
        className="hero grow bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1496309732348-3627f3f040ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="hero-overlay bg-opacity-70 backdrop-blur-sm"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold text-error mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="mb-6 text-xl text-white">
  The trail you followed ends here, but your story continues elsewhere.
</p>

            <Link to="/" className="btn btn-primary rounded-full px-6">
              ⬅ Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}