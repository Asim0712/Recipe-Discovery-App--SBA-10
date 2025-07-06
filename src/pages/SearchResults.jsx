import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  )

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Search Results for "{query}"
      </h1>
      {data?.meals ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.meals.map(meal => (
            <RecipeCard key={meal.idMeal} recipe={meal} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No recipes found for "{query}"
        </div>
      )}
    </div>
  )
}

export default SearchResults