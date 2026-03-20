import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Nom requis";
    }
    
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    const result = await register(formData.name, formData.email, formData.password);
    
    setLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ ...newErrors, general: result.error || "Erreur lors de l'inscription" });
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center items-center text-white">
      {/* Background avec une image assombrie */}
      <div className="absolute inset-0 z-0 opacity-50">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-eca7922cb522/e02146e4-4fa9-482a-a7ad-e22dd0e2a2fb/FR-fr-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-black/80 p-12 rounded-md mt-16 mb-16">
        <h1 className="text-3xl font-bold mb-8">S'inscrire</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
              {errors.general}
            </div>
          )}

          {/* Champ Nom */}
          <div>
            <input 
              type="text" 
              name="name"
              placeholder="Nom" 
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 ${errors.name ? 'border-b-2 border-red-500 focus:ring-red-500' : 'focus:ring-gray-500'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Champ Email */}
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 ${errors.email ? 'border-b-2 border-red-500 focus:ring-red-500' : 'focus:ring-gray-500'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <input 
              type="password" 
              name="password"
              placeholder="Mot de passe" 
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 ${errors.password ? 'border-b-2 border-red-500 focus:ring-red-500' : 'focus:ring-gray-500'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Champ Confirmer le mot de passe */}
          <div>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirmer le mot de passe" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-b-2 border-red-500 focus:ring-red-500' : 'focus:ring-gray-500'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-6 transition-colors disabled:opacity-50"
          >
            {loading ? 'Création en cours...' : 'S\'inscrire'}
          </button>
        </form>

        <div className="mt-6 text-gray-400 text-sm">
          Déjà inscrit ? <Link to="/login" className="text-white hover:underline">Connectez-vous.</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;