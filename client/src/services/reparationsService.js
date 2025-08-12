import api from './api';

// Service pour les réparations
const reparationsService = {
  // Récupérer toutes les réparations
  getAll: async () => {
    try {
      const response = await api.get('/reparations');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réparations:', error);
      throw error;
    }
  },

  // Récupérer une réparation par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/reparations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la réparation ${id}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle réparation
  create: async (reparationData) => {
    try {
      const response = await api.post('/reparations', reparationData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la réparation:', error);
      throw error;
    }
  },

  // Mettre à jour une réparation
  update: async (id, reparationData) => {
    try {
      const response = await api.put(`/reparations/${id}`, reparationData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la réparation ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une réparation
  delete: async (id) => {
    try {
      const response = await api.delete(`/reparations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la réparation ${id}:`, error);
      throw error;
    }
  }
};

export default reparationsService; 