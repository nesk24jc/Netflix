import Home from './pages/Home.jsx'; // Assure-toi que le chemin vers Home est correct
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* Ici, on rend simplement le composant Home. 
        Plus tard, c'est ici que tu ajouteras tes Routes 
        pour naviguer entre l'accueil et le détail d'un film.
      */}
      <Home />
    </div>
  );
}

export default App;