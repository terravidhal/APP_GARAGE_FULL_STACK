import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to={ROUTES.HOME}>
            <i className="fas fa-car me-2"></i>
            Garage Manager
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive(ROUTES.HOME) ? 'active' : ''}`} 
                  to={ROUTES.HOME}
                >
                  <i className="fas fa-home me-1"></i>
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive(ROUTES.VEHICULES) ? 'active' : ''}`} 
                  to={ROUTES.VEHICULES}
                >
                  <i className="fas fa-car me-1"></i>
                  Véhicules
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive(ROUTES.REPARATIONS) ? 'active' : ''}`} 
                  to={ROUTES.REPARATIONS}
                >
                  <i className="fas fa-tools me-1"></i>
                  Réparations
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive(ROUTES.TECHNICIENS) ? 'active' : ''}`} 
                  to={ROUTES.TECHNICIENS}
                >
                  <i className="fas fa-user-cog me-1"></i>
                  Techniciens
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-light py-3 mt-auto">
        <div className="container text-center">
          <p className="text-muted mb-0">
            <i className="fas fa-copyright me-1"></i>
            {new Date().getFullYear()} Garage Manager - Application de gestion automobile
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 