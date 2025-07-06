import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import Navbar from './components/NavBar'
import Home from './pages/Home'
import Category from './pages/Category'
import RecipeDetail from './pages/RecipeDetail'
import Favorites from './pages/Favorites'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <FavoritesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
    </FavoritesProvider>
  )
}

export default App