import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

function Home() {
  const { data, loading, error } = useFetch('https://www.themealdb.com/api/json/v1/1/categories.php')

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.categories.map(category => (
          <RecipeCard 
            key={category.idCategory}
            recipe={{
              idMeal: category.idCategory,
              strMeal: category.strCategory,
              strMealThumb: category.strCategoryThumb
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Home