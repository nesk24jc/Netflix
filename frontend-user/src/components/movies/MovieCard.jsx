import { useNavigate } from 'react-router-dom'; 
import Button from '../common/Button.jsx';
import { useCart } from '../../context/CartContext';

const genreColors = {
  'Action': 'bg-red-600',
  'Comédie': 'bg-yellow-600',
  'Drame': 'bg-blue-600',
  'Science-Fiction': 'bg-purple-600',
  'Horreur': 'bg-orange-600',
  'Thriller': 'bg-gray-600'
};

function MovieCard({ movie }) {
  const navigate = useNavigate(); 
  const { addToCart, isInCart, isRented } = useCart();
  
  const genreColorClass = genreColors[movie.genre] || 'bg-gray-700';

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleRentClick = (e) => {
    e.stopPropagation(); 
    if (isInCart(movie.id)) {
      navigate('/cart');
    } else {
      addToCart(movie);
    }
  };

  const movieInCart = isInCart(movie.id);
  const movieIsRented = isRented(movie.id);

  return (
    <div 
      onClick={handleCardClick} 
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 shadow-lg bg-gray-900"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-xs">
            ⭐ {movie.rating}
          </span>
        </div>

        <div className={`absolute bottom-2 left-2 ${genreColorClass} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md z-10 uppercase tracking-tighter`}>
          {movie.genre}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold mb-1 text-white line-clamp-1">{movie.title}</h3>

        <div className="flex items-center space-x-3 mb-2 text-xs">
          <span className="text-green-400 font-semibold">{movie.rating}/10</span>
          <span className="text-gray-400">{movie.year}</span>
        </div>

        <p className="text-xs text-gray-300 mb-4 line-clamp-2 leading-tight">
          {movie.description}
        </p>

        <div className="flex gap-2">
          {movieIsRented ? (
            <div className="flex-1 bg-green-900/40 border border-green-500/50 text-green-400 text-[10px] py-1 rounded flex items-center justify-center font-bold">
              ✓ Loué
            </div>
          ) : (
            <Button 
              onClick={handleRentClick} 
              size="sm" 
              className={`flex-1 py-1 text-[10px] font-bold ${movieInCart ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              variant={movieInCart ? 'default' : 'default'}
            >
              {movieInCart ? '✓ Dans le panier' : '▶ Louer'}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 py-1 text-[10px] font-bold"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${movie.id}`);
            }}
          >
            + Info
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;