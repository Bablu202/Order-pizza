import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="first-letter: duration-300first-line: first-letter:first-line w-35
         rounded-full bg-yellow-100 px-4 py-2  text-base
        transition-all placeholder:text-stone-400 focus:outline-none
         focus:ring focus:ring-yellow-100 focus:ring-opacity-20 sm:w-64
          sm:focus:w-72"
      />
    </form>
  );
}
