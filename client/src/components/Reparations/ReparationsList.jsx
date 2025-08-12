import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import reparationsService from '../../services/reparationsService';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/constants';

const ReparationsList = () => {
  const [reparations, setReparations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadReparations();
  }, []);

  const loadReparations = async () => {
    try {
      setLoading(true);
      const data = await reparationsService.getAll();
      setReparations(data);
      setError(null);
    } catch (err) {
      setError(ERROR_MESSAGES.NETWORK_ERROR);
      console.error('Erreur lors du chargement des réparations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réparation ?')) {
      try {
        await reparationsService.delete(id);
        setReparations(reparations.filter(r => r.id !== id));
        alert(SUCCESS_MESSAGES.DELETED);
      } catch (err) {
        alert('Erreur lors de la suppression');
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-success" role="status">
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
          <button className="btn btn-outline-danger ms-3" onClick={loadReparations}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Liste des réparations</h2>
        <div>
          <Link to={ROUTES.HOME} className="btn btn-secondary me-2">
            🏠 Retour à l'accueil
          </Link>
          <Link to={ROUTES.REPARATIONS_CREATE} className="btn btn-primary">
            <i className="fas fa-plus me-1"></i>
            Ajouter
          </Link>
        </div>
      </div>

      {reparations.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fas fa-info-circle me-2"></i>
          Aucune réparation enregistrée. 
          <Link to={ROUTES.REPARATIONS_CREATE} className="alert-link ms-1">
            Ajouter la première réparation
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-success">
              <tr>
                <th>Date</th>
                <th>Objet</th>
                <th>Véhicule</th>
                <th>Techniciens</th>
                <th>Durée (h)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reparations.map((reparation) => (
                <tr key={reparation.id}>
                  <td>
                    <strong>{formatDate(reparation.date)}</strong>
                  </td>
                  <td>
                    <span className="text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
                      {reparation.objet_reparation}
                    </span>
                  </td>
                  <td>
                    {reparation.vehicule ? (
                      <span className="badge bg-primary">
                        {reparation.vehicule.immatriculation}
                      </span>
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>
                  <td>
                    {reparation.techniciens && reparation.techniciens.length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {reparation.techniciens.map((technicien) => (
                          <span key={technicien.id} className="badge bg-info text-dark">
                            {technicien.prenom}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted">Aucun technicien</span>
                    )}
                  </td>
                  <td>
                    {reparation.duree_main_oeuvre ? (
                      <span className="badge bg-secondary">
                        {reparation.duree_main_oeuvre}h
                      </span>
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/reparations/${reparation.id}/edit`)}
                        title="Modifier"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(reparation.id)}
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

export default ReparationsList; 