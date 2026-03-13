🛒🛒 PARTIE 4 : CARTCONTEXT - GESTION DU PANIER (40 MIN)
4.1 CREER LE CARTCONTEXT
- Créez le fichier context/CartContext.jsx :
import { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export function CartProvider({ children }) {
// Todo : Chargez et initialisez le panier et les locations
 // Todo : Sauvegardez le panier et les locations à chaque modif
 // Ajouter au panier
const addToCart = (movie) => {//Todo :XXX };
 // Retirer du panier
 const removeFromCart = (movieId) => {//Todo :XXX };
 // Vider le panier
 const clearCart = () => {//Todo :XXX };
 // Calculer le total
 const getCartTotal = () => { //Todo :XX}
 // Nombre d'items
 const getCartCount = () => { //Todo :XXX };
 // Louer un film
 const rentMovie = (movie) => {
 const rentalDate = new Date();
 const expiryDate = new Date();
 expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours
 const rental = {
 id: Date.now(), movieId: movie.id, title: movie.title,
 poster: movie.poster, price: movie.price,
 rentalDate: rentalDate.toISOString(),
 expiryDate: expiryDate.toISOString()
 };
 //Todo : Mettre à jour la liste des films loués
//Supprimer le film du panier
 return { success: true, rental };
 };
 // Louer tous les films du panier
 const rentAllInCart = () => {
 //Todo :XXX
 //Todo :vider le panier
 return { success: true, count: newRentals.length };
 };
 // Vérifier si un film est loué
 const isRented = (movieId) => { //Todo :XXX };
 // Obtenir la location d'un film
 const getRentalByMovieId = (movieId) => { //Todo :XXX };
 // Vérifier si un film est dans le panier
 const isInCart = (movieId) => { //Todo :XXX };
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
 isInCart
 };
 return (
 <CartContext.Provider value={value}>
 {children}
 </CartContext.Provider>
 );
}
export function useCart() {
 const context = useContext(CartContext);

 if (!context) {
 throw new Error('useCart must be used within CartProvider');
 }

 return context;
}