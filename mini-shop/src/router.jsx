
import { createBrowserRouter } from 'react-router'
import MainLayout from './layouts/MainLayout/MainLayout.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'
import CatalogPage from './pages/CatalogPage/CatalogPage.jsx'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import ProductPage from './pages/ProductPage/ProductPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
