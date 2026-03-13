import express from 'express';
import {
  getAllRentals,
  getMyRentals,
  getRentalStats,
  createRental,
  cancelRental
} from '../controllers/rental.controller.js';

const router = express.Router();

// ⚠️ Toujours placer les routes spécifiques en premier
router.get('/my-rentals', getMyRentals);
router.get('/stats', getRentalStats);

// Routes à la racine (/)
router.route('/')
  .get(getAllRentals) // Obtenir toutes les locations (Admin)
  .post(createRental); // Créer une location

// Route avec un paramètre d'ID (/:id -> correspond au "xxx" de ton tableau)
router.delete('/:id', cancelRental); // Annuler une location

export default router;