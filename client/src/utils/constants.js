// Constantes pour l'application Garage

// Types de carrosserie
export const CARROSSERIE_TYPES = [
  'Berline',
  'Break',
  'Cabriolet',
  'Coupé',
  'SUV',
  'Monospace',
  'Pick-up',
  'Utilitaire'
];

// Types d'énergie
export const ENERGIE_TYPES = [
  'Essence',
  'Diesel',
  'Électrique',
  'Hybride',
  'GPL',
  'GNV'
];

// Types de boîte de vitesse
export const BOITE_TYPES = [
  'Manuelle',
  'Automatique',
  'Semi-automatique'
];

// Couleurs communes
export const COULEUR_TYPES = [
  'Blanc',
  'Noir',
  'Gris',
  'Rouge',
  'Bleu',
  'Vert',
  'Jaune',
  'Orange',
  'Marron',
  'Beige',
  'Argent',
  'Autre'
];

// Spécialités des techniciens
export const SPECIALITE_TYPES = [
  'Mécanique générale',
  'Électricité automobile',
  'Carrosserie',
  'Peinture',
  'Diagnostic électronique',
  'Climatisation',
  'Suspension et freinage',
  'Moteur',
  'Transmission',
  'Autre'
];

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  NOT_FOUND: 'Ressource non trouvée',
  VALIDATION_ERROR: 'Erreur de validation des données',
  SERVER_ERROR: 'Erreur serveur',
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite'
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  CREATED: 'Élément créé avec succès',
  UPDATED: 'Élément mis à jour avec succès',
  DELETED: 'Élément supprimé avec succès'
};

// Configuration des tableaux
export const TABLE_CONFIG = {
  ITEMS_PER_PAGE: 10,
  SORTABLE: true,
  SEARCHABLE: true
};

// Routes de l'application
export const ROUTES = {
  HOME: '/',
  VEHICULES: '/vehicules',
  VEHICULES_CREATE: '/vehicules/create',
  VEHICULES_EDIT: '/vehicules/:id/edit',
  TECHNICIENS: '/techniciens',
  TECHNICIENS_CREATE: '/techniciens/create',
  TECHNICIENS_EDIT: '/techniciens/:id/edit',
  REPARATIONS: '/reparations',
  REPARATIONS_CREATE: '/reparations/create',
  REPARATIONS_EDIT: '/reparations/:id/edit'
}; 