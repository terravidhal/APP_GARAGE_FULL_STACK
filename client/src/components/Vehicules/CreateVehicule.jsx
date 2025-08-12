import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vehiculesService from '../../services/vehiculesService';
import { 
  ROUTES, 
  SUCCESS_MESSAGES, 
  ERROR_MESSAGES,
  CARROSSERIE_TYPES,
  ENERGIE_TYPES,
  BOITE_TYPES,
  COULEUR_TYPES
} from '../../utils/constants';

const CreateVehicule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    immatriculation: '',
    marque: '',
    modele: '',
    couleur: '',
    annee: '',
    kilometrage: '',
    carosserie: '',
    energie: '',
    boite: ''
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

    if (!formData.immatriculation.trim()) {
      newErrors.immatriculation = 'L\'immatriculation est requise';
    }

    if (!formData.marque.trim()) {
      newErrors.marque = 'La marque est requise';
    }

    if (!formData.modele.trim()) {
      newErrors.modele = 'Le modèle est requis';
    }

    if (!formData.annee) {
      newErrors.annee = 'L\'année est requise';
    } else if (formData.annee < 1900 || formData.annee > new Date().getFullYear() + 1) {
      newErrors.annee = 'L\'année doit être valide';
    }

    if (formData.kilometrage && formData.kilometrage < 0) {
      newErrors.kilometrage = 'Le kilométrage doit être positif';
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
      // Convertir les valeurs numériques
      const vehiculeData = {
        ...formData,
        annee: parseInt(formData.annee),
        kilometrage: formData.kilometrage ? parseInt(formData.kilometrage) : null
      };

      await vehiculesService.create(vehiculeData);
      alert(SUCCESS_MESSAGES.CREATED);
      navigate(ROUTES.VEHICULES);
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
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Ajouter un véhicule</h3>
                <Link to={ROUTES.VEHICULES} className="btn btn-secondary">
                  <i className="fas fa-arrow-left me-1"></i>
                  Retour à la liste
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="immatriculation" className="form-label">
                      Immatriculation *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.immatriculation ? 'is-invalid' : ''}`}
                      id="immatriculation"
                      name="immatriculation"
                      value={formData.immatriculation}
                      onChange={handleChange}
                      placeholder="AB-123-CD"
                      required
                    />
                    {errors.immatriculation && (
                      <div className="invalid-feedback">{errors.immatriculation}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="marque" className="form-label">
                      Marque *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.marque ? 'is-invalid' : ''}`}
                      id="marque"
                      name="marque"
                      value={formData.marque}
                      onChange={handleChange}
                      placeholder="Renault"
                      required
                    />
                    {errors.marque && (
                      <div className="invalid-feedback">{errors.marque}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="modele" className="form-label">
                      Modèle *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.modele ? 'is-invalid' : ''}`}
                      id="modele"
                      name="modele"
                      value={formData.modele}
                      onChange={handleChange}
                      placeholder="Clio"
                      required
                    />
                    {errors.modele && (
                      <div className="invalid-feedback">{errors.modele}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="couleur" className="form-label">
                      Couleur
                    </label>
                    <select
                      className="form-select"
                      id="couleur"
                      name="couleur"
                      value={formData.couleur}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner une couleur</option>
                      {COULEUR_TYPES.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="annee" className="form-label">
                      Année *
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.annee ? 'is-invalid' : ''}`}
                      id="annee"
                      name="annee"
                      value={formData.annee}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                    {errors.annee && (
                      <div className="invalid-feedback">{errors.annee}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="kilometrage" className="form-label">
                      Kilométrage
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.kilometrage ? 'is-invalid' : ''}`}
                      id="kilometrage"
                      name="kilometrage"
                      value={formData.kilometrage}
                      onChange={handleChange}
                      min="0"
                      placeholder="50000"
                    />
                    {errors.kilometrage && (
                      <div className="invalid-feedback">{errors.kilometrage}</div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="carosserie" className="form-label">
                      Carrosserie
                    </label>
                    <select
                      className="form-select"
                      id="carosserie"
                      name="carosserie"
                      value={formData.carosserie}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner</option>
                      {CARROSSERIE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="energie" className="form-label">
                      Énergie
                    </label>
                    <select
                      className="form-select"
                      id="energie"
                      name="energie"
                      value={formData.energie}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner</option>
                      {ENERGIE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="boite" className="form-label">
                      Boîte de vitesse
                    </label>
                    <select
                      className="form-select"
                      id="boite"
                      name="boite"
                      value={formData.boite}
                      onChange={handleChange}
                    >
                      <option value="">Sélectionner</option>
                      {BOITE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Link to={ROUTES.VEHICULES} className="btn btn-secondary">
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

export default CreateVehicule; 