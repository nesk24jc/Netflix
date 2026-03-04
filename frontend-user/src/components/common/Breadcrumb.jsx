import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ items }) {
  return (
    <nav className="flex text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        
       
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-white transition-colors font-medium">
            Accueil
          </Link>
        </li>

       
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            
           
            <svg className="w-3 h-3 text-gray-500 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>

            
            {item.path ? (
              <Link to={item.path} className="hover:text-white transition-colors font-medium">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-200 font-bold">
                {item.label}
              </span>
            )}
            
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;