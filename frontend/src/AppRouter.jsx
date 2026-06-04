import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router";
import { useAuth } from './services/AuthContext';

import AdminLayout from './components/admin/AdminLayout';
import CommentSection from './components/comments/CommentSection';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Dashboard from './pages/admin/Dashboard';
import ReportsList from './pages/admin/ReportsList';
import UserList from './pages/admin/UsersList';
import AuthForm from './pages/auth/AuthForm';
import CreateArticle from './pages/CreateArticle';
import CreateBlog from './pages/CreateBlog';
import Gallery from "./pages/Gallery";
import Home from './pages/Home';
import BlogSpace from './pages/blog/BlogSpace';
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

// Composant de protection
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Si pas connecté -> login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Si rôle spécifique requis et non possédé -> home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        
        {/* ROUTES PUBLIQUES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Gallery />} />
          <Route path="/comments" element={<CommentSection />} />
          <Route path="/auth/register" element={<AuthForm />} />
          <Route path="/auth/login" element={<AuthForm />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        {/* ROUTES UTILISATEURS CONNECTÉS (User connecté ou admin)*/}
        <Route path="/create" element={<ProtectedRoute allowedRoles={['user', 'admin']}/>}>
          <Route path='blog' element={<CreateBlog />} />
          <Route path='article' element={<CreateArticle />} />
          <Route path='mon-blog' element={<BlogSpace  isOwner={true} />} />
        </Route>


        {/* ROUTES ADMIN (Protège le layout et tous ses enfants) */}
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

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        
      </Routes>
    </Router>
  );
}

export default AppRouter;