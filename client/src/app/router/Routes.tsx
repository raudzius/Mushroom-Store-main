import { ContactPage } from '@mui/icons-material';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import LoginPage from '../../features/account/LoginPage';
import RegisterPage from '../../features/account/RegisterPage';
import BasketPage from '../../features/basket/BasketPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import HomePage from '../../features/home/HomePage';
import Root from '../layout/Root';
import RequireAuth from './RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { element: <RequireAuth />, children: [{ path: '/checkout', element: <CheckoutPage /> }] },
      { path: '/', element: <HomePage /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/catalog/:id', element: <ProductDetails /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/basket', element: <BasketPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);
