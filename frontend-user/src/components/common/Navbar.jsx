import { useState, useEffect } from 'react';
import SearchBar from './SearchBar'; 

function Navbar({movies, onSearch}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Section Gauche : Logo & Liens */}
          <div className="flex items-center space-x-8">
            <h1 className="text-primary text-3xl font-bold tracking-tight cursor-pointer">
              NETFLIX
            </h1>

            <ul className="hidden md:flex space-x-6">
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Films
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Mes locations
                </a>
              </li>
            </ul>
          </div>

          {/* Section Droite : Recherche & Profil */}
          <div className="flex items-center space-x-6">
            
          
            <SearchBar movies={movies} onSearch={onSearch}/>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;