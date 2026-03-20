import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Chargez et initialisez le panier et les locations
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [rentals, setRentals] = useState(() => {
    const savedRentals = localStorage.getItem("rentals");
    return savedRentals ? JSON.parse(savedRentals) : [];
  });

  // Sauvegardez le panier et les locations à chaque modif
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("rentals", JSON.stringify(rentals));
  }, [rentals]);

  // Ajouter au panier
  const addToCart = (movie) => {
    if (!isInCart(movie.id)) {
      setCart([...cart, movie]);
    }
  };

  // Retirer du panier
  const removeFromCart = (movieId) => {
    setCart(cart.filter((movie) => movie.id !== movieId));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le total
  const getCartTotal = () => {
    return cart.reduce((total, movie) => total + (movie.price || 0), 0);
  };

  // Nombre d'items
  const getCartCount = () => {
    return cart.length;
  };

  // Louer un film
  const rentMovie = (movie) => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours

    const rental = {
      id: Date.now(),
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    };

    // Mettre à jour la liste des films loués
    setRentals([...rentals, rental]);
    // Supprimer le film du panier
    removeFromCart(movie.id);

    return { success: true, rental };
  };

  // Louer tous les films du panier
  const rentAllInCart = () => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours

    const newRentals = cart.map((movie, index) => ({
      id: Date.now() + index,
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    }));

    setRentals([...rentals, ...newRentals]);
    clearCart();

    return { success: true, count: newRentals.length };
  };

  // Vérifier si un film est loué
  const isRented = (movieId) => {
    return rentals.some((rental) => rental.movieId === movieId);
  };

  // Obtenir la location d'un film
  const getRentalByMovieId = (movieId) => {
    return rentals.find((rental) => rental.movieId === movieId);
  };

  // Vérifier si un film est dans le panier
  const isInCart = (movieId) => {
    return cart.some((movie) => movie.id === movieId);
  };

  const value = {
    cart,
    rentals,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    rentMovie,
    rentAllInCart,
    isRented,
    getRentalByMovieId,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
