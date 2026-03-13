import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import CartButton from './CartButton';
import { useAuth } from '../context/AuthProvider'; 

function Navbar({movies, onSearch, cartItems, removeFromCart}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); 
  
  const { user, logout, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

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


  const handleLogout = () => {
    logout(); 
    setShowUserMenu(false); 
    navigate('/login'); 
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Menu Gauche (Logo + Liens) */}
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
              
              {/* On n'affiche le lien "Mes locations" que si l'utilisateur est connecté */}
              {isAuthenticated() && (
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
              )}
            </ul>
          </div>

          {/* Menu Droit (Recherche + Panier + Utilisateur) */}
          <div className="flex items-center space-x-6">
            <SearchBar movies={movies} onSearch={onSearch}/>

            <CartButton cartItems={cartItems} removeFromCart={removeFromCart} />

            {/* Icône de notification (issue de ton bout de code) */}
            <button className="hover:text-gray-300 transition-colors hidden md:block text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Section Utilisateur Dynamique */}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-white"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name} 
                    className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-primary transition"
                  />
                  <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                </button>
                
                {/* Menu déroulant de l'utilisateur */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl py-2 flex flex-col">
                    <NavLink 
                      to="/profile" 
                      onClick={() => setShowUserMenu(false)}
                      className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 text-left"
                    >
                      Profil
                    </NavLink>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 text-left border-t border-gray-800"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
            
              <Link to="/login">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded transition-colors text-sm">
                  S'identifier
                </button>
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;