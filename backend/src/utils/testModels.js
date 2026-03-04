import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/database.js"; // Adapte le chemin si besoin
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Rental from "../models/Rental.js";

dotenv.config();

const testModels = async () => {
  try {
    await connectDB();

    console.log("🧪 Tests des modèles...\n");

    // Test 1: Créer un utilisateur
    console.log("Test 1: Création d'un utilisateur");
    const testUser = await User.create({
      name: "Test User",
      email: "test@test.com",
      password: "test123",
    });
    console.log("✅ Utilisateur créé:", testUser.name);

    // Test 2: Tester la méthode comparePassword
    console.log("\nTest 2: Comparaison de mot de passe");
    const userWithPassword = await User.findById(testUser._id).select(
      "+password",
    );
    const isMatch = await userWithPassword.comparePassword("test123");
    console.log("✅ Password match:", isMatch);

    // Test 3: Créer un film
    console.log("\nTest 3: Création d'un film");
    const testMovie = await Movie.create({
      title: "Test Movie",
      description: "Un film de test",
      poster: "https://example.com/poster.jpg",
      backdrop: "https://example.com/backdrop.jpg",
      genre: ["Action"],
      year: 2024,
      duration: 120,
      price: 4.99,
      rating: 7.5,
    });
    console.log("✅ Film créé:", testMovie.title);

    // Test 4: Créer une location
    console.log("\nTest 4: Création d'une location");
    const testRental = await Rental.create({
      user: testUser._id,
      movie: testMovie._id,
      price: testMovie.price,
    });
    console.log("✅ Location créée");

    // Test 5: Populate
    console.log("\nTest 5: Populate (relations)");
    const rentalWithDetails = await Rental.findById(testRental._id)
      .populate("user", "name email")
      .populate("movie", "title price");
    console.log("✅ Location avec détails récupérée.");

    // Test 6: Méthodes statiques (Locations)
    console.log("\nTest 6: Méthodes statiques (Locations)");
    const activeRentals = await Rental.getActiveRentals(testUser._id);
    console.log("✅ Locations actives:", activeRentals.length);

    // Test 7: Validations personnalisées (Exercice 2)
    console.log("\nTest 7: Validations personnalisées (erreurs attendues)");
    try {
      await Movie.create({
        title: "Film invalide",
        description: "Description",
        poster: "https://example.com/poster.jpg",
        backdrop: "https://example.com/backdrop.jpg",
        year: 2024,
        genre: [
          "Action",
          "Comédie",
          "Drame",
          "Science-Fiction",
          "Horreur",
          "Thriller",
        ], // 6 genres
        duration: 600, // Trop long
        price: 3.999, // Trop de décimales
      });
      console.log("❌ Échec: Le film a été créé alors qu'il est invalide !");
    } catch (error) {
      console.log("✅ Validation échouée comme prévu !");
    }

    // Test 8: Méthodes de requête avancées (Exercice 3)
    console.log("\nTest 8: Requêtes avancées par genre et prix");
    const scifiMovie = await Movie.create({
      title: "Interstellar Test",
      description: "Film dans l'espace",
      poster: "https://example.com/interstellar.jpg",
      backdrop: "https://example.com/interstellar-bg.jpg",
      genre: ["Science-Fiction", "Drame"],
      year: 2014,
      duration: 169,
      price: 3.5, // Moins de 4€
      rating: 8.6,
    });

    const sciFiMovies = await Movie.getByGenre("Science-Fiction");
    console.log("✅ Films Sci-Fi trouvés:", sciFiMovies.length);

    const affordableMovies = await Movie.getByPriceRange(0, 4);
    console.log("✅ Films à moins de 4€:", affordableMovies.length);

    const stats = await Movie.getStatsByGenre();
    console.log("✅ Statistiques par genre récupérées avec succès.");

    // Nettoyage final
    console.log("\n🧹 Nettoyage...");
    await User.deleteOne({ _id: testUser._id });
    await Movie.deleteOne({ _id: testMovie._id });
    await Rental.deleteOne({ _id: testRental._id });
    await Movie.deleteOne({ _id: scifiMovie._id }); // Suppression du film du Test 8

    console.log("\n🎉 Tous les tests sont passés !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error);
    process.exit(1);
  }
};

testModels();
