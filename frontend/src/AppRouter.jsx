import { useState, useEffect } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";


import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';

function AppRouter() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path='/admin'element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='dashboard' element={<Dashboard />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter