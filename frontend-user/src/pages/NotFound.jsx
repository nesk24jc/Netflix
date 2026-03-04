import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4 text-center">
      {/* Le gros 404 en rouge Netflix */}
      <h1 className="text-7xl md:text-9xl font-bold text-red-600 mb-4 tracking-tighter">
        404
      </h1>
      
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Page introuvable
      </h2>
      
      <p className="text-gray-400 mb-10 max-w-md text-lg">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      
      {/* Bouton de retour */}
      <Link 
        to="/" 
        className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-md transition-colors text-lg"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;