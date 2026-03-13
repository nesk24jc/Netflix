import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🌟 AJOUT IMPORTANT : Il faut déclarer tes states !
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO : Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    // On vérifie s'il y a déjà quelqu'un d'enregistré dans le navigateur
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // localStorage stocke du texte, il faut le retransformer en objet JS avec parse
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // On a fini de charger
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // Simulation d'une requête réseau (1 seconde d'attente)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`
      };

      // TODO : Enregistrer les données de l'utilisateur dans le localStorage
      setUser(mockUser); // On met à jour le state React
      localStorage.setItem('user', JSON.stringify(mockUser)); // On sauvegarde dans le navigateur

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction d'inscription
  const register = async (name, email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=e50914&color=fff`
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    // TODO : Supprimez l’utilisateur enregistré en mémoire
    setUser(null); // On vide le state
    localStorage.removeItem('user'); // On nettoie le navigateur
  };

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => { 
    return user !== null; // Renvoie true s'il y a un user, false sinon
  };

  // Mettre à jour le profil
  const updateProfile = (updates) => {
    // "Ça ne vous rappelle rien ?" -> C'est le Spread Operator (...) !
    const updatedUser = { ...user, ...updates }; 
    
    // TODO : Mettre à jour et stocker l’utilisateur
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // On met à disposition les éléments pour être utilisés dans les composants
  const value = { user, loading, login, register, logout, isAuthenticated, updateProfile };

  return (
    // 🌟 CORRECTION : Il faut englober children avec le Provider du Context
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
}

// Hook personnalisé
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}