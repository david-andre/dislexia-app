import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import logo from '@/assets/img/logo_dislexia_icono.svg'
import '@/views/game1.css'

const schema = z.object({
  username: z.string().min(1, 'Campo requerido'),
  password: z.string().min(1, 'Campo requerido'),
})

type FormData = z.infer<typeof schema>

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false)
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (data: FormData) => {
    // TODO: wire up real API calls
    setUser({ id: 'dev-user', username: data.username })
    reset()
    navigate('/children', { replace: true })
  }

  return (
    <div className="g1 min-h-full flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-6"
        style={{
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          border: '2px solid rgba(255,255,255,0.7)',
        }}
      >
        {/* Logo */}
        <img src={logo} alt="Dislexia App" className="h-16 w-auto" />

        {/* Title */}
        <h1 className="font-luckiest-guy text-3xl text-[#1e3a5f] text-center leading-tight">
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </h1>

        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#a8d4f0] bg-white text-[#1e3a5f] placeholder-slate-400 focus:outline-none focus:border-[#5b9bd5] transition text-sm"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-red-500 text-xs pl-1">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#a8d4f0] bg-white text-[#1e3a5f] placeholder-slate-400 focus:outline-none focus:border-[#5b9bd5] transition text-sm"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-luckiest-guy text-white text-xl tracking-wide transition"
            style={{ background: '#f59e0b' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#d97706')}
            onMouseLeave={e => (e.currentTarget.style.background = '#f59e0b')}
          >
            {isRegister ? 'Registrar' : 'Entrar'}
          </button>
        </form>

        {/* Demo shortcut */}
        <button
          type="button"
          className="w-full py-3 rounded-2xl font-luckiest-guy text-white text-xl tracking-wide transition"
          style={{ background: '#5b9bd5' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1e3a5f')}
          onMouseLeave={e => (e.currentTarget.style.background = '#5b9bd5')}
          onClick={() => {
            setUser({ id: 'dev-user', username: 'demo' })
            navigate('/children', { replace: true })
          }}
        >
          Modo Demo
        </button>

        {/* Toggle */}
        <p className="text-sm text-slate-500 text-center">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            type="button"
            className="font-luckiest-guy text-[#5b9bd5] hover:text-[#1e3a5f] transition"
            onClick={() => { setIsRegister(!isRegister); reset() }}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  )
}
