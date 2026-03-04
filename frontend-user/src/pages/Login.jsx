import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit faire au moins 6 caractères";
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
    
    
    setTimeout(() => {
      
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0] 
      }));

      setLoading(false);
      
      
      navigate('/'); 
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col justify-center items-center text-white">
      {/* Background avec une image assombrie pour le style Netflix */}
      <div className="absolute inset-0 z-0 opacity-50">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-eca7922cb522/e02146e4-4fa9-482a-a7ad-e22dd0e2a2fb/FR-fr-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-black/80 p-12 rounded-md">
        <h1 className="text-3xl font-bold mb-8">S'identifier</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-6 transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion en cours...' : 'S\'identifier'}
          </button>
        </form>

        <div className="mt-4 text-gray-400 text-sm">
          Première visite sur Netflix ? <Link to="/register" className="text-white hover:underline">Inscrivez-vous.</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;