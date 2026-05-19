  import { useState, useEffect } from 'react';
  import { Navigate, Route, BrowserRouter as Router, Routes, Outlet } from "react-router";

  import Home from './pages/Home';
  import Header from './components/layout/Header'; 
  import Footer from './components/layout/Footer';
  import UserList from './pages/admin/UsersList'; 
  import CreateArticle from './pages/CreateArticle';
  import Dashboard from './pages/admin/Dashboard';
  import AdminLayout from './components/admin/AdminLayout';
  import Gallery from "./pages/Gallery";
  import CommentSection from './components/comments/CommentSection'; 

  // 1. On crée un "Layout" uniquement pour les pages publiques qui ont besoin du Header/Footer
  function PublicLayout() {
    return (
      <>
        <Header />
        <div className="flex-grow w-full">
          <Outlet /> {/* C'est ici que s'afficheront Home, Gallery, etc. */}
        </div>
        <Footer />
      </>
    );
  }

  function AppRouter() {
    return (
      <Router>
        <Routes>
          
          {/* Pages publiques AVEC Header et Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explorer" element={<Gallery />} />
            <Route path="/comments" element={<CommentSection />} />
          </Route>

          {/* Page de création d'article SANS Header ni Footer */}
          <Route path="/creer" element={<CreateArticle />} />

          {/* Pages Admin SANS Header ni Footer généraux */}
          {/* (L'AdminLayout gère sa propre barre latérale d'administration) */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users-list' element={<UserList />} />
          </Route>

          {/* Route de secours (404) toujours tout en bas */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Router>
    );
  }

  export default AppRouter;