import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import { useFavorites } from '../context/FavoritesContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function RecipeDetail() {
  const { recipeId } = useParams()
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  )
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  const recipe = data?.meals?.[0]

  if (!recipe) {
    return <ErrorMessage message="Recipe not found" />
  }

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal)
    } else {
      addFavorite(recipe.idMeal)
    }
  }

  // Extract ingredients and measurements
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`]
      })
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
            <button 
              onClick={handleFavoriteClick}
              className={`text-2xl ${isFavorite(recipe.idMeal) ? 'text-red-500' : 'text-gray-400'}`}
            >
              {isFavorite(recipe.idMeal) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <p className="text-gray-600 mb-4">{recipe.strCategory} - {recipe.strArea}</p>
          
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="mb-6">
            {ingredients.map((item, index) => (
              <li key={index} className="mb-1">
                {item.measure} {item.ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <div className="prose max-w-none">
          {recipe.strInstructions.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail