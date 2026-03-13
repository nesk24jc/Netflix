import Movie from "../models/Movie.js";

// @desc    Obtenir tous les films (avec filtres, tri et pagination)
// @route   GET /api/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
  try {
    // 1. Récupération des paramètres de requête
    const { search, genre, year, sort, page = 1, limit = 10 } = req.query;

    // 2. Construction de la requête (query)
    let query = {};

    // Filtre de recherche (titre ou description)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // 'i' pour insensible à la casse
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filtres stricts
    if (genre) query.genre = genre;
    if (year) query.year = year;

    // 3. Gestion du tri
    let sortOption = {};
    if (sort) {
      // Si sort=rating,mongoose triera par rating. (On peut aussi mettre -rating pour inverser)
      const sortFields = sort.split(",").join(" ");
      sortOption = sortFields;
    } else {
      sortOption = "-createdAt"; // Tri par défaut (les plus récents d'abord)
    }

    // 4. Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // 5. Exécution de la requête avec chaînage
    const movies = await Movie.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Comptage total pour la pagination
    const total = await Movie.countDocuments(query);

    // 6. Résultat attendu
    res.status(200).json({
      success: true,
      count: movies.length,
      total: total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir un film par ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Film non trouvé" });
    }

    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir des films similaires
// @route   GET /api/movies/:id/similar
// @access  Public
export const getSimilarMovies = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Film non trouvé" });
    }

    // Trouver des films du même genre
    const similarMovies = await Movie.find({
      genre: { $in: movie.genre },
      _id: { $ne: movie._id }, // Exclure le film actuel
      isAvailable: true,
    })
      .sort({ rating: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: similarMovies.length,
      data: similarMovies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtenir les statistiques des films
// @route   GET /api/movies/stats
// @access  Private/Admin
export const getMovieStats = async (req, res, next) => {
  try {
    // Agrégation pour le total global
    const globalStats = await Movie.aggregate([
      {
        $group: {
          _id: null,
          totalMovies: { $sum: 1 },
          estimatedRevenue: { $sum: { $multiply: ["$price", "$rentalCount"] } },
        },
      },
    ]);

    // Agrégation par genre (pour correspondre au JSON de ton image)
    const byGenre = await Movie.aggregate([
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          avgRating: { $avg: "$rating" },
          totalRentals: { $sum: "$rentalCount" },
        },
      },
    ]);

    const statsData = {
      totalMovies: globalStats[0]?.totalMovies || 0,
      estimatedRevenue: globalStats[0]?.estimatedRevenue
        ? parseFloat(globalStats[0].estimatedRevenue.toFixed(2))
        : 0,
      byGenre: byGenre,
    };

    res.status(200).json({ success: true, data: statsData });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer un nouveau film
// @route   POST /api/movies
// @access  Private/Admin
export const createMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      poster,
      backdrop,
      genre,
      year,
      duration,
      price,
      rating,
    } = req.body;

    // Créer le film
    const movie = await Movie.create({
      title,
      description,
      poster,
      backdrop,
      genre,
      year,
      duration,
      price,
      rating,
    });

    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

// @desc    Modifier un film
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res, next) => {
  try {
    // Mise à jour
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Retourner le document modifié
        runValidators: true, // Exécuter les validations du modèle
      },
    );

    if (!updatedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Film non trouvé" });
    }

    res.status(200).json({ success: true, data: updatedMovie });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un film
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Film non trouvé" });
    }

    // Vérifiez qu'il n'y ait pas de locations (si ta logique l'exige)
    if (movie.rentalCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Impossible de supprimer ce film car il a des locations en cours.",
      });
    }

    await movie.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
