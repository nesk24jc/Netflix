import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import MovieCard from '../components/movies/MovieCard';

function MyRentals() {
  const [rentals, setRentals] = useState([]);

 
  useEffect(() => {
   
    const storedRentalsJSON = localStorage.getItem('rentals') || '[]';
    

    const storedRentals = JSON.parse(storedRentalsJSON);
    
    setRentals(storedRentals);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      
      <Navbar movies={[]} cartItems={[]} />

      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Mes Locations</h1>

       
        {rentals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-900/50 rounded-lg border border-gray-800">
            <p className="text-xl text-gray-400 mb-6">Vous n'avez pas encore de films en location.</p>
            
            
            <Link 
              to="/" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition-colors"
            >
              Découvrir des films
            </Link>
          </div>
        ) : (
        
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {rentals.map((movie, index) => (
            
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyRentals;