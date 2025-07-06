import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'
import { useFavorites } from '../context/FavoritesContext'

function Favorites() {
  const { favorites } = useFavorites()
  const { data, loading, error } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + favorites.join(',')
  )

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven't added any favorites yet. Browse recipes and click the heart icon to add some!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.meals?.map(meal => (
            <RecipeCard key={meal.idMeal} recipe={meal} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites