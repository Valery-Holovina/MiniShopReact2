
import { useEffect, useState } from 'react'
import { FavoritesContext } from './favorites-context.js'

const STORAGE_KEY = 'mini-shop-favorites'

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
    }
  }, [favorites])

  function toggleFavorite(product) {
    setFavorites((prevFavorites) => {
      const alreadyFavorite = prevFavorites.some(
        (item) => item.id === product.id,
      )

      if (alreadyFavorite) {
        return prevFavorites.filter((item) => item.id !== product.id)
      }

      return [...prevFavorites, product]
    })
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id)
  }

  function removeFavorite(id) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id),
    )
  }

  const value = {
    favorites,
    favoritesCount: favorites.length,
    toggleFavorite,
    isFavorite,
    removeFavorite,
  }

  return (
    <FavoritesContext value={value}>
      {children}
    </FavoritesContext>
  )
}

export default FavoritesProvider
