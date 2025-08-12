import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const HomePage = () => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="text-center">
        <h1 className="mb-4 display-4 fw-bold text-primary">
          🚗 Application de gestion du garage
        </h1>
        
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
          <Link 
            to={ROUTES.VEHICULES} 
            className="btn btn-primary btn-lg px-4 py-3 text-decoration-none"
            style={{ minWidth: '200px' }}
          >
            <i className="fas fa-car me-2"></i>
            Véhicules
          </Link>
          
          <Link 
            to={ROUTES.REPARATIONS} 
            className="btn btn-success btn-lg px-4 py-3 text-decoration-none"
            style={{ minWidth: '200px' }}
          >
            <i className="fas fa-tools me-2"></i>
            Réparations
          </Link>
          
          <Link 
            to={ROUTES.TECHNICIENS} 
            className="btn btn-info btn-lg px-4 py-3 text-decoration-none"
            style={{ minWidth: '200px' }}
          >
            <i className="fas fa-user-cog me-2"></i>
            Techniciens
          </Link>
        </div>
        
        <div className="mt-5">
          <p className="text-muted">
            Gérez efficacement votre garage automobile
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 