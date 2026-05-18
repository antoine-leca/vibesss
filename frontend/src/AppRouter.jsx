import { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";


import Home from './pages/Home';
import Header from './components/layout/Header'; 
import Footer from './components/layout/Footer'; 
import Dashboard from './pages/admin/Dashboard';
import UserList from './pages/admin/UsersList'; 
import AdminLayout from './components/admin/AdminLayout';
import Gallery from "./pages/Gallery";
import CommentSection from './components/comments/CommentSection'; 

function AppRouter() {
  return (
    <Router>
      <Header />
      <div className="flex-grow w-full">
        <Routes>
          {/* Routes principales */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/explorer" element={<Gallery />} />
          
             
          {/* Routes temporaires */}
          <Route path="/comments" element={<CommentSection />} /> {/* Route principale en dehors de l'admin */}

          {/* Routes admin */}
          <Route path='/admin' element={<AdminLayout />}>
             <Route index element={<Dashboard />} />
             <Route path='dashboard' element={<Dashboard />} />
             <Route path='users-list' element={<UserList />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default AppRouter;