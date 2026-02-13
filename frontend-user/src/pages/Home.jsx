import React from 'react';
import Navbar from '../components/common/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieList from '../components/movies/MovieList';
import Footer from '../components/layout/Footer';

// Données de test (à remplacer plus tard par un appel API)
const movies = [
  {
    id: 1,
    title: "Inception",
    backdrop: "https://image.tmdb.org/t/p/original/gqgwNjwjSqGkOqkE2rppogenu4v.jpg",
    poster: "https://image.tmdb.org/t/p/original/gqgwNjwjSqGkOqkE2rppogenu4v.jpg",
    rating: 8.8,
    year: 2010,
    duration: 148,
    description: "Un voleur expérimenté, spécialisé dans l'extraction, se voit offrir une chance de retrouver sa vie d'avant s'il parvient à accomplir l'impossible : l'inception.",
    price: 3.99,
    genre: "Science-Fiction"
  },
  {
    id: 2,
    title: "Interstellar",
    backdrop: "https://image.tmdb.org/t/p/original/4pWbfjzUkusGXAZQoduARaI0qu2.jpg",
    poster: "https://image.tmdb.org/t/p/original/4pWbfjzUkusGXAZQoduARaI0qu2.jpg",
    rating: 8.6,
    year: 2014,
    duration: 169,
    description: "Un groupe d'explorateurs utilise un trou de ver pour surpasser les limites du voyage spatial humain et sauver l'humanité.",
    price: 4.99,
    genre: "Science-Fiction"
  }
  // Ajoute d'autres films ici pour remplir tes listes
];

function Home() {
  // On choisit le premier film comme film à l'affiche (Hero)
  const featuredMovie = movies[0];

  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased">
      {/* Barre de navigation */}
      <Navbar />

      <main>
        {/* Section principale avec le film en vedette */}
        {featuredMovie && <MovieHero movie={featuredMovie} />}

        {/* Conteneur des listes de films avec un décalage négatif 
            pour que la première liste chevauche un peu le Hero (effet Netflix) */}
        <div className="relative z-10 -mt-32 pb-20">
          <MovieList title="Tendances actuelles" movies={movies} />
          
          <MovieList title="Les mieux notés" movies={[...movies].reverse()} />
          
          <MovieList title="Action & Aventure" movies={movies} />
        </div>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default Home;