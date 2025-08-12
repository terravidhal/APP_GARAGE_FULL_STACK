import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import techniciensService from '../../services/techniciensService';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/constants';

const TechniciensList = () => {
  const [techniciens, setTechniciens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTechniciens();
  }, []);

  const loadTechniciens = async () => {
    try {
      setLoading(true);
      const data = await techniciensService.getAll();
      setTechniciens(data);
      setError(null);
    } catch (err) {
      setError(ERROR_MESSAGES.NETWORK_ERROR);
      console.error('Erreur lors du chargement des techniciens:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce technicien ?')) {
      try {
        await techniciensService.delete(id);
        setTechniciens(techniciens.filter(t => t.id !== id));
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
        <div className="spinner-border text-info" role="status">
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
          <button className="btn btn-outline-danger ms-3" onClick={loadTechniciens}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Liste des techniciens</h2>
        <div>
          <Link to={ROUTES.HOME} className="btn btn-secondary me-2">
            🏠 Retour à l'accueil
          </Link>
          <Link to={ROUTES.TECHNICIENS_CREATE} className="btn btn-primary">
            <i className="fas fa-plus me-1"></i>
            Ajouter
          </Link>
        </div>
      </div>

      {techniciens.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fas fa-info-circle me-2"></i>
          Aucun technicien enregistré. 
          <Link to={ROUTES.TECHNICIENS_CREATE} className="alert-link ms-1">
            Ajouter le premier technicien
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-info">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Spécialité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {techniciens.map((technicien) => (
                <tr key={technicien.id}>
                  <td>
                    <strong>{technicien.nom}</strong>
                  </td>
                  <td>{technicien.prenom}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {technicien.specialite}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/techniciens/${technicien.id}/edit`)}
                        title="Modifier"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(technicien.id)}
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

export default TechniciensList; 