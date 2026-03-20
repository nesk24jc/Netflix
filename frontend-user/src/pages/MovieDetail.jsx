import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthProvider';

const moviesData = [
  { id: 1, title: "Inception", backdrop: "https://image.tmdb.org/t/p/original/gqgwNjwjSqGkOqkE2rppogenu4v.jpg", poster: "https://image.tmdb.org/t/p/original/gqgwNjwjSqGkOqkE2rppogenu4v.jpg", rating: 8.8, year: 2010, duration: 148, description: "Un voleur expérimenté, spécialisé dans l'extraction, se voit offrir une chance de retrouver sa vie d'avant s'il parvient à accomplir l'impossible : l'inception.", price: 3.99, genre: "Science-Fiction" },
  { id: 2, title: "Interstellar", backdrop: "https://image.tmdb.org/t/p/original/4pWbfjzUkusGXAZQoduARaI0qu2.jpg", poster: "https://image.tmdb.org/t/p/original/4pWbfjzUkusGXAZQoduARaI0qu2.jpg", rating: 8.6, year: 2014, duration: 169, description: "Un groupe d'explorateurs utilise un trou de ver pour surpasser les limites du voyage spatial humain et sauver l'humanité.", price: 4.99, genre: "Science-Fiction" },
  { id: 3, title: "The Dark Knight", backdrop: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 9.0, year: 2008, duration: 152, description: "Batman aborne une phase décisive de sa guerre contre le crime, mais il se heurte à un génie criminel connu sous le nom de Joker.", price: 4.99, genre: "Action" },
  { id: 4, title: "Pulp Fiction", backdrop: "https://image.tmdb.org/t/p/original/sua0YvS968STCgsS7S369o3qS6v.jpg", poster: "https://image.tmdb.org/t/p/original/d5iIl9h9FvS6o9H5iH0oYvS6o9H.jpg", rating: 8.9, year: 1994, duration: 154, description: "Les histoires entrelacées de criminels, d'un boxeur et d'un couple de braqueurs dans le Los Angeles criminel.", price: 3.99, genre: "Thriller" }
];

function MovieDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addToCart, isInCart, isRented, getRentalByMovieId, rentMovie } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  useEffect(() => {
    const foundMovie = moviesData.find((m) => m.id === parseInt(id));
    
    // On simule un petit délai de chargement pour l'effet "premium"
    const timer = setTimeout(() => {
      setMovie(foundMovie);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    if (!movie) return;
    addToCart(movie);
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  const handleRentNow = () => {
    if (!movie) return;
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    const result = rentMovie(movie);
    if (result.success) {
      navigate('/my-rentals');
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Chargement...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Film introuvable</h1>
        <p className="text-gray-400 mb-8">Le film que vous recherchez n'existe pas.</p>
        <Button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-700">
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  const movieIsRented = isRented(movie.id);
  const movieInCart = isInCart(movie.id);
  const rentalInfo = movieIsRented ? getRentalByMovieId(movie.id) : null;

  return (
    <div className="bg-black min-h-screen text-white font-sans relative">
      <Navbar movies={moviesData} />

      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] md:h-[70vh] w-full mt-16">
        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-4 md:left-12 flex items-center gap-2 text-gray-300 hover:text-white transition z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </button>

        <div className="absolute bottom-0 left-0 p-4 md:p-12 w-full max-w-4xl">
           <Breadcrumb 
             items={[
               { label: 'Accueil', path: '/' },
               { label: 'Films', path: '/' },
               { label: movie.title }
             ]} 
           />
           <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">{movie.title}</h1>
           
           <div className="flex flex-wrap gap-4 text-sm font-bold items-center mb-6">
              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-black">⭐ {movie.rating}/10</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.duration} min</span>
              <span className="text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded border border-gray-700">{movie.genre}</span>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-12 py-12 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
           <h2 className="text-3xl font-bold mb-6">Synopsis</h2>
           <p className="text-gray-300 leading-relaxed text-lg mb-10 max-w-2xl">{movie.description}</p>
           
           <div className="flex flex-col sm:flex-row gap-4 mb-12">
             {movieIsRented ? (
               <div className="bg-green-900/40 border border-green-500/50 text-green-400 px-6 py-4 rounded-md flex items-center gap-3 font-semibold">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
                 <span>Film loué jusqu'au {rentalInfo ? new Date(rentalInfo.expiryDate).toLocaleDateString() : ''}</span>
               </div>
             ) : (
               <>
                 <button 
                   onClick={handleRentNow}
                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20"
                 >
                   🎬 Louer maintenant - {movie.price.toFixed(2)}€
                 </button>

                 <button 
                   onClick={movieInCart ? () => navigate('/cart') : handleAddToCart}
                   className={`font-bold py-4 px-8 rounded flex items-center justify-center gap-2 transition-all border-2 ${
                     movieInCart 
                     ? 'border-blue-500 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20' 
                     : 'bg-gray-800 hover:bg-gray-700 border-transparent text-white'
                   }`}
                 >
                   {movieInCart ? (
                     <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        ✓ Dans le panier
                     </>
                   ) : (
                     <>
                        <span className="text-xl">+</span> Ajouter au panier
                     </>
                   )}
                 </button>
               </>
             )}
           </div>

           {/* Informations Grid */}
           <div className="bg-gray-900/50 rounded-xl p-8 space-y-4 border border-gray-800 backdrop-blur-sm max-w-md">
             <h3 className="font-bold text-xl mb-6 text-gray-100">Détails du film</h3>
             <div className="flex justify-between py-3 border-b border-gray-800">
               <span className="text-gray-500">Genre</span>
               <span className="text-gray-200 font-medium">{movie.genre}</span>
             </div>
             <div className="flex justify-between py-3 border-b border-gray-800">
               <span className="text-gray-500">Année</span>
               <span className="text-gray-200 font-medium">{movie.year}</span>
             </div>
             <div className="flex justify-between py-3">
               <span className="text-gray-500">Durée</span>
               <span className="text-gray-200 font-medium">{movie.duration} minutes</span>
             </div>
           </div>
        </div>
        
        {/* Poster with Floating Notification */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end items-start md:mt-[-150px] relative z-20">
           <div className="relative group">
             <img 
               src={movie.poster} 
               alt={movie.title} 
               className="rounded-lg shadow-2xl max-w-[280px] md:max-w-[320px] border border-white/5 transition-transform duration-500 group-hover:scale-[1.02]" 
             />
             
             {/* Simple Notification overlay */}
             {showAddedNotification && (
               <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded shadow-xl font-bold animate-bounce flex items-center gap-2 z-30">
                 <div className="bg-white text-green-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</div>
                 Film ajouté au panier !
               </div>
             )}
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;