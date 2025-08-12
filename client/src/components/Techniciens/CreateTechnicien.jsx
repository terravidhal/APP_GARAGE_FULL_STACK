import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import techniciensService from '../../services/techniciensService';
import { 
  ROUTES, 
  SUCCESS_MESSAGES, 
  ERROR_MESSAGES,
  SPECIALITE_TYPES
} from '../../utils/constants';

const CreateTechnicien = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    specialite: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      await techniciensService.create(formData);
      alert(SUCCESS_MESSAGES.CREATED);
      navigate(ROUTES.TECHNICIENS);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(ERROR_MESSAGES.NETWORK_ERROR);
      }
      console.error('Erreur lors de la création:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Ajouter un technicien</h3>
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

export default CreateTechnicien; 