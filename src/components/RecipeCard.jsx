import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useFavorites } from '../context/FavoritesContext'

function RecipeCard({ recipe }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal)
    } else {
      addFavorite(recipe.idMeal)
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-transform hover:transform hover:-translate-y-1 hover:shadow-md">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold mb-2">{recipe.strMeal}</h3>
        <button 
          onClick={handleFavoriteClick}
          className={`text-xl ${isFavorite(recipe.idMeal) ? 'text-red-500' : 'text-gray-400'}`}
        >
          {isFavorite(recipe.idMeal) ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  )
}

export default RecipeCard