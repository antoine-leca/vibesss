import { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";


import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';
import Header from './components/layout/Header'; // 1. On importe ton Header 

function AppRouter() {
  return (
    <Router>
      {/* 2. On place le Header ici pour qu'il soit visible sur TOUTES les pages */}
      <Header />
      
      <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path='/admin'element={<AdminLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='dashboard' element={<Dashboard />}/>
          </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;