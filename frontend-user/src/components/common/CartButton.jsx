import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartButton({ cartItems = [] }) {
  const navigate = useNavigate();
  const cartCount = cartItems.length;

  return (
    <div className="relative">
      {/* Bouton Panier */}
      <button 
        onClick={() => navigate('/cart')}
        className="hover:text-gray-300 transition-colors relative z-10 flex items-center"
        title="Voir mon panier"
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
    </div>
  );
}

export default CartButton;