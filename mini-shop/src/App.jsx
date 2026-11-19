
import { RouterProvider } from 'react-router'
import CartProvider from './context/CartProvider.jsx'
import FavoritesProvider from './context/FavoritesProvider.jsx'
import { router } from './router.jsx'

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </CartProvider>
  )
}

export default App
