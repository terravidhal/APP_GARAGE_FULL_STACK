import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// Importation des composants Home
import HomePage from "./components/Home/HomePage";

// Importation des composants Vehicules
import VehiculesList from "./components/Vehicules/VehiculesList";
import CreateVehicule from "./components/Vehicules/CreateVehicule";
import UpdateVehicule from "./components/Vehicules/UpdateVehicule";

// Importation des composants Techniciens
import TechniciensList from "./components/Techniciens/TechniciensList";
import CreateTechnicien from "./components/Techniciens/CreateTechnicien";
import UpdateTechnicien from "./components/Techniciens/UpdateTechnicien";

// Importation des composants Reparations
import ReparationsList from "./components/Reparations/ReparationsList";
import CreateReparation from "./components/Reparations/CreateReparation";
import UpdateReparation from "./components/Reparations/UpdateReparation";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Route par défaut - redirection vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
          {/* Page d'accueil */}
          <Route path="/" element={<HomePage />} />
          
          {/* Routes Véhicules */}
          <Route path="/vehicules" element={<VehiculesList />} />
          <Route path="/vehicules/create" element={<CreateVehicule />} />
          <Route path="/vehicules/:id/edit" element={<UpdateVehicule />} />
          
          {/* Routes Techniciens */}
          <Route path="/techniciens" element={<TechniciensList />} />
          <Route path="/techniciens/create" element={<CreateTechnicien />} />
          <Route path="/techniciens/:id/edit" element={<UpdateTechnicien />} />
          
          {/* Routes Reparations */}
          <Route path="/reparations" element={<ReparationsList />} />
          <Route path="/reparations/create" element={<CreateReparation />} />
          <Route path="/reparations/:id/edit" element={<UpdateReparation />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;