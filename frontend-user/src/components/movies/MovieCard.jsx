import Button from '../common/Button.jsx';

const genreColors = {
  'Action': 'bg-red-600',
  'Comédie': 'bg-yellow-600',
  'Drame': 'bg-blue-600',
  'Science-Fiction': 'bg-purple-600',
  'Horreur': 'bg-orange-600',
  'Thriller': 'bg-gray-600'
};

function MovieCard({ movie, onRent }) {
  // Sélection de la couleur basée sur le genre
  const genreColorClass = genreColors[movie.genre] || 'bg-gray-700';

  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 shadow-lg bg-gray-900">
      
      {/* Container de l'image */}
      <div className="relative aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Badge Note (Haut Droite) */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-xs">
            ⭐ {movie.rating}
          </span>
        </div>

        {/* Badge Genre (Bas Gauche) */}
        <div className={`absolute bottom-2 left-2 ${genreColorClass} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md z-10 uppercase tracking-tighter`}>
          {movie.genre}
        </div>
      </div>

      {/* Overlay au hover (Infos détaillées) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold mb-1 text-white">{movie.title}</h3>

        <div className="flex items-center space-x-3 mb-2 text-xs">
          <span className="text-green-400 font-semibold">{movie.rating}/10</span>
          <span className="text-gray-400">{movie.year}</span>
        </div>

        <p className="text-xs text-gray-300 mb-4 line-clamp-2 leading-tight">
          {movie.description}
        </p>

        <div className="flex gap-2">
          <Button onClick={onRent} size="sm" className="flex-1 py-1 text-xs">▶ Louer</Button>
          <Button variant="outline" size="sm" className="flex-1 py-1 text-xs">+ Info</Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;