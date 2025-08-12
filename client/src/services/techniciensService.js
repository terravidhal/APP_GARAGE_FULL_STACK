import api from './api';

// Service pour les techniciens
const techniciensService = {
  // Récupérer tous les techniciens
  getAll: async () => {
    try {
      const response = await api.get('/techniciens');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des techniciens:', error);
      throw error;
    }
  },

  // Récupérer un technicien par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/techniciens/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du technicien ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau technicien
  create: async (technicienData) => {
    try {
      const response = await api.post('/techniciens', technicienData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du technicien:', error);
      throw error;
    }
  },

  // Mettre à jour un technicien
  update: async (id, technicienData) => {
    try {
      const response = await api.put(`/techniciens/${id}`, technicienData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du technicien ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un technicien
  delete: async (id) => {
    try {
      const response = await api.delete(`/techniciens/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du technicien ${id}:`, error);
      throw error;
    }
  }
};

export default techniciensService; 