import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  const menuClassName = menuOpen
    ? 'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
    : 'hidden'

  const handleSignOut = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <span className="text-white font-bold text-xl">Dislexia App</span>
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              {user && (
                <>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <User className="h-10 w-10 text-indigo-500" />
                  </button>
                  <div
                    className={menuClassName}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <Link
                      to="/main-page"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => setMenuOpen(false)}
                    >
                      Inicio
                    </Link>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleSignOut}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
