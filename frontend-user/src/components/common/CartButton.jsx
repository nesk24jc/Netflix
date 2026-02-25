import React, { useState } from 'react';

function CartButton({ cartItems = [], removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const cartCount = cartItems.length;

  const toggleShow = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative">
      {/* Bouton Panier */}
      <button 
        onClick={toggleShow}
        className="hover:text-gray-300 transition-colors relative z-10 flex items-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        
        {/* Pastille rouge */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showCart && (
        <div className="absolute right-0 top-full mt-4 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-3 border-b border-gray-700 bg-black/50">
            <h3 className="text-white font-semibold text-sm">Votre Panier</h3>
          </div>
          
          {/* Si le panier est vide */}
          {cartCount === 0 ? (
            <div className="p-4 text-gray-400 text-sm text-center">
              Votre panier est vide.
            </div>
          ) : (
            /* Si le panier contient des films */
            <>
              <div className="max-h-60 overflow-y-auto">
                {cartItems.map((movie) => (
                  <div 
                    key={movie.id}
                    onDoubleClick={() => removeFromCart(movie.id)}
                    className="p-3 hover:bg-gray-800 transition-colors flex items-center gap-3 cursor-pointer group"
                    title="Double-cliquez pour retirer"
                  >
                    {movie.poster && (
                      <img src={movie.poster} alt={movie.title} className="w-10 h-14 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{movie.title}</p>
                      <p className="text-gray-400 text-xs">{movie.price} €</p>
                    </div>
                    <div className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Retirer
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-700 flex justify-between items-center bg-black/50">
                <span className="text-white font-semibold text-sm">Total:</span>
                <span className="text-red-500 font-bold">
                  {cartItems.reduce((total, movie) => total + (movie.price || 0), 0).toFixed(2)} €
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CartButton;