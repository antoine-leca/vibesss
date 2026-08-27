import { useEffect } from "react";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes, useLocation } from "react-router";
import { useAuth } from './services/AuthContext';

import AdminLayout from './components/admin/AdminLayout';
import CommentSection from './components/comments/CommentSection';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Dashboard from './pages/admin/Dashboard';
import ReportsList from './pages/admin/ReportsList';
import UserList from './pages/admin/UsersList';
import AuthForm from './pages/auth/AuthForm';
import BlogSpace from './pages/blog/BlogSpace';
import CreateArticle from './pages/CreateArticle';
import CreateBlog from './pages/CreateBlog';
import Gallery from "./pages/Gallery";
import Home from './pages/Home';
import Profile from './pages/Profile';

// Layout pour les pages publiques avec Header/Footer
function PublicLayout() {
  return (
    <>
      <Header />
      <div className="flex-grow w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

// Composant de protection hybride (supporte role_id numérique ou libellé string)
function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAdmin } = useAuth();

  // Si pas connecté -> login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Vérification de rôle (compatible role_id, role textuel et raccourci isAdmin)
  if (allowedRoles) {
    const hasRole = allowedRoles.some((role) => {
      if (role === 'admin') return isAdmin || user.role_id === 2 || user.role === 'admin';
      if (role === 'user') return user.role_id === 1 || user.role === 'user' || user.role_id === 2 || user.role === 'admin';
      if (typeof role === 'number') return user.role_id === role;
      return user.role === role;
    });

    if (!hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children || <Outlet />;
}

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Vibesss";

    if (path === "/") {
      title = "Accueil - Vibesss";
    } else if (path === "/explorer") {
      title = "Explorer - Vibesss";
    } else if (path === "/comments") {
      title = "Commentaires - Vibesss";
    } else if (path === "/auth/login") {
      title = "Connexion - Vibesss";
    } else if (path === "/auth/register") {
      title = "Inscription - Vibesss";
    } else if (path === "/create/blog") {
      title = "Créer un Blog - Vibesss";
    } else if (path === "/create/article") {
      title = "Créer un Article - Vibesss";
    } else if (path === "/create/mes-blogs") {
      title = "Mes Blogs - Vibesss";
    } else if (path === "/create/mon-blog") {
      title = "Gérer mon Blog - Vibesss";
    } else if (path.startsWith("/admin")) {
      title = "Administration - Vibesss";
    } else if (path === "/a-propos") {
      title = "À propos - Vibesss";
    }

    document.title = title;
  }, [location]);

  return null;
}

function AppRouter() {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        
        {/* ROUTES PUBLIQUES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Gallery />} />
          <Route path="/blogs/:id" element={<BlogSpace isOwner={false} />} />
          <Route path="/comments" element={<CommentSection />} />
          <Route path="/auth/register" element={<AuthForm />} />
          <Route path="/auth/login" element={<AuthForm />} />
          <Route path="/blogs/:blogId" element={<BlogSpace isOwner={false} />} />
          <Route path="/profile/:pseudo" element={<Profile />} />
        </Route>

        {/* ROUTES UTILISATEURS CONNECTÉS (User connecté ou admin) */}
        <Route path="/create" element={<ProtectedRoute allowedRoles={['user', 'admin']}/>}>
          <Route path='blog' element={<CreateBlog />} />
          <Route path='blogs/:blogId/article' element={<CreateArticle />} />
          <Route path='mon-blog/:blogId' element={<BlogSpace isOwner={true} />} />
        </Route>

        {/* ROUTES UTILISATEURS CONNECTÉS */}
        <Route path="/blog" element={<ProtectedRoute allowedRoles={['user', 'admin']}/>}>
          <Route path=':id' element={<BlogSpace isOwner={true} />} />
        </Route>

        {/* ROUTES ADMIN */}
        <Route path='/admin' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users-list' element={<UserList />} />
          <Route path='reports' element={<ReportsList />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default AppRouter;