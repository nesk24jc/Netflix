import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MyRentals from './pages/MyRentals';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider'; 

function App() {
   return (
      
      <AuthProvider>
         <BrowserRouter>
            <Routes>
               {/* Routes publiques */}
               <Route path="/" element={<Home />} />
               <Route path="/movie/:id" element={<MovieDetail />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               
               {/* Route protégée (Nécessite d'être connecté) */}
               <Route
                  path="/my-rentals"
                  element={
                     <ProtectedRoute>
                        <MyRentals />
                     </ProtectedRoute>
                  }
               />

               {/* Route 404 (Toujours à mettre en tout dernier) */}
               <Route path="*" element={<NotFound />} />
            </Routes>
         </BrowserRouter>
      </AuthProvider>
   ); 
}

export default App;