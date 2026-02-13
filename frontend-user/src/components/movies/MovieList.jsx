import MovieCard from './MovieCard.jsx';

function MovieList({ title, movies }) {
  return (
    <div className="my-8 px-4 md:px-12">
      {/* Titre de la section */}
      <h2 className="text-2xl font-semibold text-white mb-4 hover:text-gray-300 cursor-pointer transition-colors inline-block">
        {title}
      </h2>

      {/* Conteneur de la liste */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;