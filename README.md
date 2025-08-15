# 🚗 Application Garage Full Stack

Application de gestion de garage développée avec **React** (frontend) et **Laravel** (backend API).

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **PHP** (version 8.1 ou supérieure)
- **Composer** (gestionnaire de dépendances PHP)
- **MySQL** ou **MariaDB** (base de données)
- **Git** (pour cloner le projet)

## 🚀 Installation et Démarrage

### 1. Cloner le projet

```bash
git clone <URL_DU_REPO_GITHUB>
cd APP_GARAGE_FULL_STACK
```

### 2. Configuration du Backend (Laravel)

#### 2.1 Installer les dépendances PHP

```bash
cd server
composer install
```

#### 2.2 Configuration de l'environnement

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate
```

#### 2.3 Configuration de la base de données

Éditez le fichier `.env` et configurez votre base de données :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=garage_db
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

#### 2.4 Créer la base de données

```bash
# Créer la base de données (via phpMyAdmin ou ligne de commande)
mysql -u root -p -e "CREATE DATABASE garage_db;"
```

#### 2.5 Exécuter les migrations et seeders

```bash
# Créer les tables
php artisan migrate

# Remplir avec des données de test (optionnel)
php artisan db:seed
```

#### 2.6 Démarrer le serveur Laravel

```bash
php artisan serve
```

Le serveur Laravel sera accessible sur : **http://localhost:8000**

### 3. Configuration du Frontend (React)

#### 3.1 Installer les dépendances Node.js

```bash
# Retourner à la racine du projet
cd ..

# Aller dans le dossier client
cd client

# Installer les dépendances
npm install
```

#### 3.2 Démarrer le serveur de développement React

```bash
npm run dev
```

Le serveur React sera accessible sur : **http://localhost:5173**

## 🌐 URLs d'accès

- **Frontend React** : http://localhost:5173
- **Backend Laravel API** : http://localhost:8000
- **Documentation API** : http://localhost:8000/api

## 📁 Structure du projet

```
APP_GARAGE_FULL_STACK/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── services/       # Services API
│   │   └── ...
│   └── package.json
├── server/                 # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/Api/  # Contrôleurs API
│   │   └── Models/                # Modèles Eloquent
│   ├── database/migrations/       # Migrations
│   └── routes/api.php            # Routes API
└── docu/                  # Documentation
```

## 🔧 Fonctionnalités

### Gestion des Véhicules
- ✅ Liste des véhicules
- ✅ Création d'un nouveau véhicule
- ✅ Modification d'un véhicule
- ✅ Suppression d'un véhicule

### Gestion des Techniciens
- ✅ Liste des techniciens
- ✅ Création d'un nouveau technicien
- ✅ Modification d'un technicien
- ✅ Suppression d'un technicien

### Gestion des Réparations
- ✅ Liste des réparations
- ✅ Création d'une nouvelle réparation
- ✅ Modification d'une réparation
- ✅ Suppression d'une réparation
- ✅ Liaison véhicule-technicien

## 🛠️ Commandes utiles

### Backend (Laravel)

```bash
cd server

# Démarrer le serveur
php artisan serve

# Voir les routes disponibles
php artisan route:list

# Vider le cache
php artisan cache:clear

# Redémarrer les migrations
php artisan migrate:fresh --seed
```

### Frontend (React)

```bash
cd client

# Démarrer en mode développement
npm run dev

# Construire pour la production
npm run build

# Lancer les tests
npm test
```

## 🔍 API Endpoints

### Véhicules
- `GET /api/vehicules` - Liste des véhicules
- `POST /api/vehicules` - Créer un véhicule
- `GET /api/vehicules/{id}` - Détails d'un véhicule
- `PUT /api/vehicules/{id}` - Modifier un véhicule
- `DELETE /api/vehicules/{id}` - Supprimer un véhicule

### Techniciens
- `GET /api/techniciens` - Liste des techniciens
- `POST /api/techniciens` - Créer un technicien
- `GET /api/techniciens/{id}` - Détails d'un technicien
- `PUT /api/techniciens/{id}` - Modifier un technicien
- `DELETE /api/techniciens/{id}` - Supprimer un technicien

### Réparations
- `GET /api/reparations` - Liste des réparations
- `POST /api/reparations` - Créer une réparation
- `GET /api/reparations/{id}` - Détails d'une réparation
- `PUT /api/reparations/{id}` - Modifier une réparation
- `DELETE /api/reparations/{id}` - Supprimer une réparation

## 🐛 Dépannage

### Problèmes courants

#### Erreur de connexion à la base de données
```bash
# Vérifier que MySQL est démarré
# Vérifier les paramètres dans .env
# Tester la connexion
php artisan tinker
DB::connection()->getPdo();
```

#### Erreur de dépendances PHP
```bash
cd server
composer install --ignore-platform-reqs
```

#### Erreur de dépendances Node.js
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

#### Port déjà utilisé
```bash
# Changer le port Laravel
php artisan serve --port=8001

# Changer le port React
npm run dev -- --port=3000
```

## 📚 Ressources

- [Documentation Laravel](https://laravel.com/docs)
- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/)

## 👥 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

**🎯 Prêt à démarrer ? Suivez les étapes d'installation ci-dessus !** 