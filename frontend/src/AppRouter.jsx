import { useState, useEffect } from 'react';
// Correction de l'import pour react-router-dom
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from './pages/Home';
import Header from './components/layout/Header'; // 1. On importe ton Header 

function AppRouter() {
  return (
    <Router>
      {/* 2. On place le Header ici pour qu'il soit visible sur TOUTES les pages */}
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Tu pourras ajouter tes autres routes ici (ex: /explore, /login...) */}
      </Routes>
    </Router>
  );
}

export default AppRouter;