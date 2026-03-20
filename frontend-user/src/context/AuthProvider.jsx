import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO : Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // TODO: Sera remplacé plus tard par la vraie API (séance 8 ou 9 , ça dépend ;-))
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`,
      };
      
      // TODO : Enregistrer les données de l'utilisateur dans le localStorage
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction d'inscription
  const register = async (name, email, password) => {
    // TODO : inspirez-vous de plus haut
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now(),
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    // TODO : Supprimez l’utilisateur enregistré en mémoire:
    setUser(null);
    localStorage.removeItem("user");
  };

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    // XXXX
    return user !== null;
  };

  // Mettre à jour le profil
  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates }; //ça ne vous rappelle rien ?
    // TODO : Mettre à jour et stocker l’utilisateur
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  //On met à disposition les éléments pour être utilisés dans les composants
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}