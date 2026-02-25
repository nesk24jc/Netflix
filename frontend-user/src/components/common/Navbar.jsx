import { useState, useEffect } from 'react';
import SearchBar from './SearchBar'; 
import CartButton from './CartButton';

import { Link, NavLink } from 'react-router-dom';  

function Navbar({movies, onSearch, cartItems, removeFromCart}) {
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
          
          <div className="flex items-center space-x-8">
            
            <Link to="/" className="text-primary text-3xl font-bold tracking-tight cursor-pointer">
              NETFLIX
            </Link>

            <ul className="hidden md:flex space-x-6">
              <li>
                
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white transition-colors'
                  }
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white transition-colors'
                  }
                >
                  Films
                </NavLink>
              </li>
              <li>
              
                <NavLink 
                  to="/my-rentals" 
                  className={({ isActive }) => 
                    isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white transition-colors'
                  }
                >
                  Mes locations
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-6">
            
            <SearchBar movies={movies} onSearch={onSearch}/>

            <CartButton cartItems={cartItems} removeFromCart={removeFromCart} />

          



            <Link to="/login">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
                <span className="text-sm font-bold text-white">U</span>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;