import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vehiculesService from '../../services/vehiculesService';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/constants';

const VehiculesList = () => {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadVehicules();
  }, []);

  const loadVehicules = async () => {
    try {
      setLoading(true);
      const data = await vehiculesService.getAll();
      setVehicules(data);
      setError(null);
    } catch (err) {
      setError(ERROR_MESSAGES.NETWORK_ERROR);
      console.error('Erreur lors du chargement des véhicules:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await vehiculesService.delete(id);
        setVehicules(vehicules.filter(v => v.id !== id));
        alert(SUCCESS_MESSAGES.DELETED);
      } catch (err) {
        alert('Erreur lors de la suppression');
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
          <button className="btn btn-outline-danger ms-3" onClick={loadVehicules}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Liste des véhicules</h2>
        <div>
          <Link to={ROUTES.HOME} className="btn btn-secondary me-2">
            🏠 Retour à l'accueil
          </Link>
          <Link to={ROUTES.VEHICULES_CREATE} className="btn btn-primary">
            <i className="fas fa-plus me-1"></i>
            Ajouter
          </Link>
        </div>
      </div>

      {vehicules.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fas fa-info-circle me-2"></i>
          Aucun véhicule enregistré. 
          <Link to={ROUTES.VEHICULES_CREATE} className="alert-link ms-1">
            Ajouter le premier véhicule
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Immatriculation</th>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Couleur</th>
                <th>Année</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicules.map((vehicule) => (
                <tr key={vehicule.id}>
                  <td>
                    <strong>{vehicule.immatriculation}</strong>
                  </td>
                  <td>{vehicule.marque}</td>
                  <td>{vehicule.modele}</td>
                  <td>
                    <span 
                      className="badge rounded-pill"
                      style={{ 
                        backgroundColor: vehicule.couleur?.toLowerCase() || '#6c757d',
                        color: 'white'
                      }}
                    >
                      {vehicule.couleur}
                    </span>
                  </td>
                  <td>{vehicule.annee}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/vehicules/${vehicule.id}/edit`)}
                        title="Modifier"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(vehicule.id)}
                        title="Supprimer"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehiculesList; 