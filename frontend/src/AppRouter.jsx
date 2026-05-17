import { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";

import Home from './pages/Home';
import Header from './components/layout/Header'; 
import Footer from './components/layout/Footer'; 

function AppRouter() {
  return (
    <Router>
      <div>

        <Header />
        <div className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
        <Footer />
        
      </div>
    </Router>
  );
}

export default AppRouter;