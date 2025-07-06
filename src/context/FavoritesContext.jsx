import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  const addFavorite = (recipeId) => {
    if (!favorites.includes(recipeId)) {
      setFavorites([...favorites, recipeId])
    }
  }

  const removeFavorite = (recipeId) => {
    setFavorites(favorites.filter(id => id !== recipeId))
  }

  const isFavorite = (recipeId) => favorites.includes(recipeId)

  return (
    <FavoritesContext.Provider 
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}