import React, { useState } from 'react'; 
import Navbar from '../components/common/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieList from '../components/movies/MovieList';
import MovieFilter from '../components/movies/MovieFilter';
import Footer from '../components/layout/Footer';


const moviesData = [
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
  },
  {
    id: 3,
    title: "The Dark Knight",
    backdrop: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    year: 2008,
    duration: 152,
    description: "Batman aborde une phase décisive de sa guerre contre le crime, mais il se heurte à un génie criminel connu sous le nom de Joker.",
    price: 4.99,
    genre: "Action"
  }
];

function Home() {
 
  const [allMovies] = useState(moviesData);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);


  const featuredMovie = allMovies[0];

  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased">
      {/* Barre de navigation */}
      <Navbar />

      <main>
        {/* Section principale avec le film en vedette */}
        {featuredMovie && <MovieHero movie={featuredMovie} />}

        {/* Conteneur principal */}
        <div className="relative z-10 -mt-32 pb-20">
          
          {/* Composant de filtrage */}
          <div className="container mx-auto relative z-20">
             {/* setFilteredMovies est passé directement, il sert de callback onFilter */}
            <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />
          </div>

          {/* Liste dynamique qui réagit au filtre */}
          <MovieList title="Notre Catalogue" movies={filteredMovies} />
          
          {/* Listes statiques pour l'exemple */}
          <MovieList title="Les mieux notés" movies={[...allMovies].reverse()} />
          <MovieList title="Films d'Action" movies={allMovies.filter(m => m.genre === 'Action')} />
        </div>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default Home;