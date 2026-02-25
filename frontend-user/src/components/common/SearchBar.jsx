import { useState, useEffect } from 'react';

function SearchBar({ movies = [], onSearch }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [suggestions, setSuggestions] = useState([]); 
  const [showSuggestions, setShowSuggestions] = useState(false); 

  useEffect(() => {
    if (searchTerm.length >= 2) {
     
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = movies.filter((movie) => 
        movie.title.toLowerCase().includes(lowercasedTerm) || 
        movie.description.toLowerCase().includes(lowercasedTerm)
      );
      
     
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, movies]);

  const handleSelect = (movie) => {
    setSearchTerm(movie.title);
    setShowSuggestions(false); 
    setIsOpen(false); 

    if (onSearch) {
      onSearch(movie);
    }
  };

  const handleFocus = () => {
   
    if (searchTerm.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
  
    setShowSuggestions(false);
    if (!searchTerm) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Bouton de recherche (Loupe) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-gray-300 transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Input de recherche */}
      {isOpen && (
        <div className="absolute right-0 top-0 translate-x-2">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Rechercher un film..."
            className="w-64 pr-10 pl-4 py-2 bg-black/90 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white backdrop-blur-md"
            autoFocus
          />
          
          {/* Dropdown de suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
              {suggestions.map((movie) => (
                <div 
                  key={movie.id}
                 
                  onMouseDown={() => handleSelect(movie)}
                  className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors flex items-center gap-3"
                >
                  {movie.poster && (
                    <img src={movie.poster} alt={movie.title} className="w-8 h-12 object-cover rounded" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{movie.title}</p>
                    <p className="text-gray-400 text-xs truncate">{movie.year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;