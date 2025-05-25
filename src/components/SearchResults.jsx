import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const [posts, setPosts] = useState([]);
  const query = useQuery().get('query');

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:8000/posts/?search=${query}`)
        .then(res => setPosts(res.data))
        .catch(err => console.error('Search error:', err));
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Search results for: {query}</h2>
      {posts.map(post => (
        <div key={post.id} className="mb-4 border p-2 rounded">
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
