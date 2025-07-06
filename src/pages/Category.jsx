import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

function Category() {
  const { categoryName } = useParams()
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  )

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">{categoryName} Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.meals?.map(meal => (
          <RecipeCard key={meal.idMeal} recipe={meal} />
        ))}
      </div>
    </div>
  )
}

export default Category