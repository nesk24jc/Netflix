import Rental from "../models/Rental.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

// @desc    Louer un film
// @route   POST /api/rentals
// @access  Private
export const createRental = async (req, res, next) => {
  try {
    const { movieId } = req.body; 
    
    // Si tu n'as pas encore fait l'authentification, on prendra le userId du body, sinon celui du token
    const userId = req.user ? req.user.id : req.body.userId;

    // 1. Vérifier si le film existe
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Film non trouvé" });
    }

    // 2. Vérifier s'il est disponible (si tu as géré ça dans ton modèle)
    if (movie.isAvailable === false) {
      return res.status(400).json({ success: false, message: "Ce film n'est pas disponible actuellement" });
    }

    // 3. Calculer les dates (ex: location pour 48h)
    const rentalDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(rentalDate.getDate() + 2); // +2 jours

    // 4. Créer la location
    const rental = await Rental.create({
      user: userId,
      movie: movieId,
      rentalDate: rentalDate,
      returnDate: returnDate,
      price: movie.price // On fige le prix au moment de la location
    });

    // Optionnel: Incrémenter le nombre de locations du film (pour tes stats !)
    if (movie.rentalCount !== undefined) {
      movie.rentalCount += 1;
      await movie.save();
    }

    res.status(201).json({ success: true, data: rental });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir les locations d'un utilisateur
// @route   GET /api/rentals/my-rentals
// @access  Private
export const getMyRentals = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : req.body.userId;

    // 🌟 C'est ici qu'on utilise POPULATE ! 
    // Au lieu de n'avoir que l'ID, on récupère le titre et l'affiche du film
    const rentals = await Rental.find({ user: userId })
      .populate('movie', 'title poster price');

    res.status(200).json({ success: true, count: rentals.length, data: rentals });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir toutes les locations (admin)
// @route   GET /api/rentals
// @access  Private/Admin
export const getAllRentals = async (req, res, next) => {
  try {
    // Ici on populate pour voir qui a loué quel film
    const rentals = await Rental.find()
      .populate('user', 'name email')
      .populate('movie', 'title');

    res.status(200).json({ success: true, count: rentals.length, data: rentals });
  } catch (error) {
    next(error);
  }
};

// @desc    Annuler une location
// @route   DELETE /api/rentals/:id
// @access  Private
export const cancelRental = async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({ success: false, message: "Location non trouvée" });
    }

    // Supprimer la location
    await rental.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir les statistiques des locations
// @route   GET /api/rentals/stats
// @access  Private/Admin
export const getRentalStats = async (req, res, next) => {
  try {
    const stats = await Rental.aggregate([
      {
        $group: {
          _id: null,
          totalRentals: { $sum: 1 },
          totalRevenue: { $sum: "$price" }
        }
      }
    ]);

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};