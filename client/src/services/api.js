import axios from 'axios';

// Configuration de base pour Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    console.log('Requête envoyée:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Erreur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log('Réponse reçue:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Erreur de réponse:', error.response?.status, error.response?.data);
    
    // Gestion des erreurs communes
    if (error.response?.status === 404) {
      console.error('Ressource non trouvée');
    } else if (error.response?.status === 422) {
      console.error('Erreur de validation:', error.response.data.errors);
    } else if (error.response?.status >= 500) {
      console.error('Erreur serveur');
    }
    
    return Promise.reject(error);
  }
);

export default api; 