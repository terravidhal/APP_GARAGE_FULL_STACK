import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import techniciensService from '../../services/techniciensService';
import { 
  ROUTES, 
  SUCCESS_MESSAGES, 
  ERROR_MESSAGES,
  SPECIALITE_TYPES
} from '../../utils/constants';

const UpdateTechnicien = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    specialite: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadTechnicien();
  }, [id]);

  const loadTechnicien = async () => {
    try {
      setInitialLoading(true);
      const technicien = await techniciensService.getById(id);
      setFormData({
        nom: technicien.nom || '',
        prenom: technicien.prenom || '',
        specialite: technicien.specialite || ''
      });
      setNotFound(false);
    } catch (error) {
      if (error.response?.status === 404) {
        setNotFound(true);
      } else {
        alert(ERROR_MESSAGES.NETWORK_ERROR);
        console.error('Erreur lors du chargement du technicien:', error);
      }
    } finally {
      setInitialLoading(false);
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.specialite.trim()) {
      newErrors.specialite = 'La spécialité est requise';
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
      await techniciensService.update(id, formData);
      toast.success(SUCCESS_MESSAGES.UPDATED);
      navigate(ROUTES.TECHNICIENS);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Technicien non trouvé
          <Link to={ROUTES.TECHNICIENS} className="alert-link ms-2">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Modifier le technicien</h3>
                <Link to={ROUTES.TECHNICIENS} className="btn btn-secondary">
                  <i className="fas fa-arrow-left me-1"></i>
                  Retour à la liste
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    Nom *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Dupont"
                    required
                  />
                  {errors.nom && (
                    <div className="invalid-feedback">{errors.nom}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Jean"
                    required
                  />
                  {errors.prenom && (
                    <div className="invalid-feedback">{errors.prenom}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="specialite" className="form-label">
                    Spécialité *
                  </label>
                  <select
                    className={`form-select ${errors.specialite ? 'is-invalid' : ''}`}
                    id="specialite"
                    name="specialite"
                    value={formData.specialite}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner une spécialité</option>
                    {SPECIALITE_TYPES.map(specialite => (
                      <option key={specialite} value={specialite}>{specialite}</option>
                    ))}
                  </select>
                  {errors.specialite && (
                    <div className="invalid-feedback">{errors.specialite}</div>
                  )}
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Link to={ROUTES.TECHNICIENS} className="btn btn-secondary">
                    Annuler
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-warning"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-1"></i>
                        Mettre à jour
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

export default UpdateTechnicien; 