import { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";


import Home from './pages/Home';
import Header from './components/layout/Header'; 
import Footer from './components/layout/Footer'; 
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';

function AppRouter() {
  return (
    <Router>
        <Header />
        <div className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='/admin'element={<AdminLayout/>}>
              <Route index element={<Dashboard/>}/>
              <Route path='dashboard' element={<Dashboard />}/>
            </Route>
           </Routes>
        </div>
        <Footer />
    </Router>
  );
}

export default AppRouter;