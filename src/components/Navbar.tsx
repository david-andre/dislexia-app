import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import logo from '@/assets/img/logo_dislexia_icono.svg'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav
      className="w-full px-4 sm:px-8 py-3 flex items-center justify-between"
      style={{ background: '#1e3a5f' }}
    >
      <Link to="/" aria-label="Inicio">
        <img src={logo} alt="Dislexia App" className="h-10 w-auto" />
      </Link>

      {user && (
        <div className="relative">
          <button
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 transition focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <User className="w-6 h-6 text-white" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-2xl shadow-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.97)', border: '2px solid rgba(255,255,255,0.6)' }}
              role="menu"
            >
              <Link
                to="/main-page"
                className="block px-5 py-3 text-sm font-luckiest-guy text-[#1e3a5f] hover:bg-blue-50 transition"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
              <div className="h-px bg-slate-100 mx-3" />
              <button
                type="button"
                className="w-full text-left px-5 py-3 text-sm font-luckiest-guy text-red-500 hover:bg-red-50 transition"
                role="menuitem"
                onClick={handleSignOut}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
