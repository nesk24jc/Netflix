import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';


const moviesData = [
  { id: 1, title: "Inception", backdrop: "https://image.tmdb.org/t/p/original/gqgwNjwjSqGkOqkE2rppogenu4v.jpg", poster: "https://image.tmdb.org/t/p/original/gqgwNjwjSqGkOqkE2rppogenu4v.jpg", rating: 8.8, year: 2010, duration: 148, description: "Un voleur expérimenté, spécialisé dans l'extraction, se voit offrir une chance de retrouver sa vie d'avant s'il parvient à accomplir l'impossible : l'inception.", price: 3.99, genre: "Science-Fiction" },
  { id: 2, title: "Interstellar", backdrop: "https://image.tmdb.org/t/p/original/4pWbfjzUkusGXAZQoduARaI0qu2.jpg", poster: "https://image.tmdb.org/t/p/original/4pWbfjzUkusGXAZQoduARaI0qu2.jpg", rating: 8.6, year: 2014, duration: 169, description: "Un groupe d'explorateurs utilise un trou de ver pour surpasser les limites du voyage spatial humain et sauver l'humanité.", price: 4.99, genre: "Science-Fiction" },
  { id: 3, title: "The Dark Knight", backdrop: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 9.0, year: 2008, duration: 152, description: "Batman aborde une phase décisive de sa guerre contre le crime, mais il se heurte à un génie criminel connu sous le nom de Joker.", price: 4.99, genre: "Action" }
];

function MovieDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundMovie = moviesData.find((m) => m.id === parseInt(id));
      setMovie(foundMovie);
      setLoading(false);
    }, 800);
  }, [id]);


  const handleRent = () => {
   
    const isAuthenticated = localStorage.getItem('user') !== null;
    if (!isAuthenticated) {
    
      navigate('/login');
      return;
    }

   
    const rental = { 
      ...movie,
      rentalDate: new Date().toISOString(), 
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours
    };

   
    const existingRentals = JSON.parse(localStorage.getItem('rentals') || '[]');

  
    const alreadyRented = existingRentals.some((r) => r.id === movie.id);

    if (alreadyRented) { 
      setNotification({ type: 'error', message: 'Vous avez déjà loué ce film.' });
      
      
      setTimeout(() => setNotification(null), 3000);
      return;
    }

   
    const updatedRentals = [...existingRentals, rental];
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));

    
    setNotification({ type: 'success', message: 'Film loué avec succès !' });

   
    setTimeout(() => {
      navigate('/my-rentals');
    }, 2000);
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

  return (
    <div className="bg-black min-h-screen text-white font-sans relative">
      <Navbar movies={moviesData} />

      {/* 3. Affichage de la Notification (Alerte flottante) */}
      {notification && (
        <div 
          className={`fixed top-24 right-4 z-50 p-4 rounded-md shadow-lg font-bold transition-all duration-300 ${
            notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Image de fond en pleine page + Bouton Retour */}
      <div className="relative h-[70vh] w-full mt-16">
        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-4 md:left-12 flex items-center gap-2 text-gray-300 hover:text-white transition z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Retour
        </button>


        <div className="absolute bottom-0 left-0 p-4 md:p-12 w-full">
           
          
           <Breadcrumb 
             items={[
               { label: 'Films', path: '/' },
               { label: movie.title }
             ]} 
           />

           =
           <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
           
           <div className="flex gap-4 text-sm font-bold items-center">
              <span className="bg-red-600 text-white px-2 py-1 rounded">⭐ {movie.rating}/10</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.duration} min</span>
              <span className="text-gray-300">{movie.genre}</span>
           </div>
        </div>

        

        <div className="absolute bottom-0 left-0 p-4 md:p-12 w-full">
           <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
           <div className="flex gap-4 text-sm font-bold items-center">
              <span className="bg-red-600 text-white px-2 py-1 rounded">⭐ {movie.rating}/10</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.duration} min</span>
              <span className="text-gray-300">{movie.genre}</span>
           </div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 md:px-12 py-12 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
           <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
           <p className="text-gray-300 leading-relaxed mb-8">{movie.description}</p>
           
           
           <Button onClick={handleRent} size="lg" className="bg-red-600 hover:bg-red-700 w-full md:w-auto mb-8">
             🎬 Louer pour {movie.price}€
           </Button>

           {/* Bloc Informations */}
           <div className="bg-gray-900 rounded-lg p-6 space-y-4 shadow-lg border border-gray-800">
             <h3 className="font-bold text-lg border-b border-gray-700 pb-2 mb-4">Informations</h3>
             <div className="grid grid-cols-3 text-sm border-b border-gray-800 pb-2">
               <span className="text-gray-500">Genre</span>
               <span className="col-span-2 text-gray-200">{movie.genre}</span>
             </div>
             <div className="grid grid-cols-3 text-sm border-b border-gray-800 pb-2">
               <span className="text-gray-500">Année</span>
               <span className="col-span-2 text-gray-200">{movie.year}</span>
             </div>
             <div className="grid grid-cols-3 text-sm">
               <span className="text-gray-500">Durée</span>
               <span className="col-span-2 text-gray-200">{movie.duration} minutes</span>
             </div>
           </div>
        </div>
        
        {/* Poster du film */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end items-start mt-[-100px] relative z-20">
           <img src={movie.poster} alt={movie.title} className="rounded-lg shadow-2xl max-w-[250px] md:max-w-[300px] border border-gray-800" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;