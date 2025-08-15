import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import reparationsService from '../../services/reparationsService';
import vehiculesService from '../../services/vehiculesService';
import techniciensService from '../../services/techniciensService';
import { 
  ROUTES, 
  SUCCESS_MESSAGES, 
  ERROR_MESSAGES
} from '../../utils/constants';

const CreateReparation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicule_id: '',
    date: '',
    duree_main_oeuvre: '',
    objet_reparation: '',
    technicien_ids: []
  });
  const [vehicules, setVehicules] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoadingData(true);
      const [vehiculesData, techniciensData] = await Promise.all([
        vehiculesService.getAll(),
        techniciensService.getAll()
      ]);
      setVehicules(vehiculesData);
      setTechniciens(techniciensData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast.error(ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTechnicienChange = (technicienId) => {
    setFormData(prev => ({
      ...prev,
      technicien_ids: prev.technicien_ids.includes(technicienId)
        ? prev.technicien_ids.filter(id => id !== technicienId)
        : [...prev.technicien_ids, technicienId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vehicule_id) {
      newErrors.vehicule_id = 'Le véhicule est requis';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.objet_reparation.trim()) {
      newErrors.objet_reparation = 'L\'objet de la réparation est requis';
    }

    if (formData.duree_main_oeuvre && formData.duree_main_oeuvre < 0) {
      newErrors.duree_main_oeuvre = 'La durée doit être positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Préparer les données pour l'API
      const reparationData = {
        vehicule_id: parseInt(formData.vehicule_id),
        date: formData.date,
        duree_main_oeuvre: formData.duree_main_oeuvre || null,
        objet_reparation: formData.objet_reparation,
        techniciens: formData.technicien_ids.map(id => parseInt(id))
      };

      await reparationsService.create(reparationData);
      toast.success(SUCCESS_MESSAGES.CREATED);
      navigate(ROUTES.REPARATIONS);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      console.error('Erreur lors de la création:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Ajouter une réparation</h3>
                <Link to={ROUTES.REPARATIONS} className="btn btn-secondary">
                  <i className="fas fa-arrow-left me-1"></i>
                  Retour à la liste
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="vehicule_id" className="form-label">
                      Véhicule *
                    </label>
                    <select
                      className={`form-select ${errors.vehicule_id ? 'is-invalid' : ''}`}
                      id="vehicule_id"
                      name="vehicule_id"
                      value={formData.vehicule_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionner un véhicule</option>
                      {vehicules.map(vehicule => (
                        <option key={vehicule.id} value={vehicule.id}>
                          {vehicule.immatriculation} - {vehicule.marque} {vehicule.modele}
                        </option>
                      ))}
                    </select>
                    {errors.vehicule_id && (
                      <div className="invalid-feedback">{errors.vehicule_id}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="date" className="form-label">
                      Date *
                    </label>
                    <input
                      type="date"
                      className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                    {errors.date && (
                      <div className="invalid-feedback">{errors.date}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="duree_main_oeuvre" className="form-label">
                      Durée main d'œuvre (heures)
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.duree_main_oeuvre ? 'is-invalid' : ''}`}
                      id="duree_main_oeuvre"
                      name="duree_main_oeuvre"
                      value={formData.duree_main_oeuvre}
                      onChange={handleChange}
                      min="0"
                      step="0.5"
                      placeholder="2.5"
                    />
                    {errors.duree_main_oeuvre && (
                      <div className="invalid-feedback">{errors.duree_main_oeuvre}</div>
                    )}
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="objet_reparation" className="form-label">
                      Objet de la réparation *
                    </label>
                    <textarea
                      className={`form-control ${errors.objet_reparation ? 'is-invalid' : ''}`}
                      id="objet_reparation"
                      name="objet_reparation"
                      value={formData.objet_reparation}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Description détaillée de la réparation à effectuer..."
                      required
                    />
                    {errors.objet_reparation && (
                      <div className="invalid-feedback">{errors.objet_reparation}</div>
                    )}
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">
                      Techniciens assignés
                    </label>
                    <div className="row">
                      {techniciens.map(technicien => (
                        <div key={technicien.id} className="col-md-4 mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`technicien_${technicien.id}`}
                              checked={formData.technicien_ids.includes(technicien.id.toString())}
                              onChange={() => handleTechnicienChange(technicien.id.toString())}
                            />
                            <label className="form-check-label" htmlFor={`technicien_${technicien.id}`}>
                              {technicien.prenom} {technicien.nom}
                              <br />
                              <small className="text-muted">{technicien.specialite}</small>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    {techniciens.length === 0 && (
                      <div className="alert alert-warning">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Aucun technicien disponible. 
                        <Link to={ROUTES.TECHNICIENS_CREATE} className="alert-link ms-1">
                          Créer un technicien
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Link to={ROUTES.REPARATIONS} className="btn btn-secondary">
                    Annuler
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-1"></i>
                        Enregistrer
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReparation; 