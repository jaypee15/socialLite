import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import HomeLayout from './layouts/home';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import ProfilePage from './pages/ProfilePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/home',
      element: <HomeLayout />,
      children: [
        { element: <Navigate to="/home/app" />, index: true },
        { path: '/app', element: <HomePage /> },
        { path: '/profile', element: <ProfilePage /> },
        { path: '/products', element: <ProductsPage /> },
        { path: '/blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/Signin',
      element: <SigninPage />,
    },
    {
      path: '/SignUp',
      element: <SignupPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/home/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
