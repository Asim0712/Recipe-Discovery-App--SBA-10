import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaHeart } from 'react-icons/fa'
import { useState } from 'react'
import { useFavorites } from '../context/FavoritesContext'

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { favorites } = useFavorites()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`)
      setSearchTerm('')
    }
  }

  return (
    <nav className="bg-red-500 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-xl font-bold">Recipe Finder</Link>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 rounded border-none"
        />
        <button type="submit" className="bg-white px-4 py-1 rounded">
          <FaSearch className="text-gray-700" />
        </button>
      </form>
      
      <Link to="/favorites" className="flex items-center gap-2">
        <FaHeart /> {favorites.length}
      </Link>
    </nav>
  )
}

export default Navbar