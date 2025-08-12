import api from './api';

// Service pour les véhicules
const vehiculesService = {
  // Récupérer tous les véhicules
  getAll: async () => {
    try {
      const response = await api.get('/vehicules');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules:', error);
      throw error;
    }
  },

  // Récupérer un véhicule par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/vehicules/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du véhicule ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau véhicule
  create: async (vehiculeData) => {
    try {
      const response = await api.post('/vehicules', vehiculeData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du véhicule:', error);
      throw error;
    }
  },

  // Mettre à jour un véhicule
  update: async (id, vehiculeData) => {
    try {
      const response = await api.put(`/vehicules/${id}`, vehiculeData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du véhicule ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un véhicule
  delete: async (id) => {
    try {
      const response = await api.delete(`/vehicules/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du véhicule ${id}:`, error);
      throw error;
    }
  }
};

export default vehiculesService; 