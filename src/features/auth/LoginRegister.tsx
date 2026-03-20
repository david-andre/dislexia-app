import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
// import { api } from '@/lib/api' // TODO: Re-enable when backend is ready

const loginSchema = z.object({
  username: z.string().min(1, 'Campo requerido'),
  password: z.string().min(1, 'Campo requerido'),
})

type LoginForm = z.infer<typeof loginSchema>

const registerSchema = loginSchema

type RegisterForm = z.infer<typeof registerSchema>

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false)
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', password: '' },
  })

  const onLogin = async (data: LoginForm) => {
    // TODO: Re-enable when backend is running at VITE_API_URL
    // try {
    //   await api.post('/api/user/supervisor/login', data)
    //   const res = await api.get<{ id?: string; username?: string }>(
    //     '/api/user/supervisor'
    //   )
    //   const user = res?.id ? { id: res.id, username: res.username ?? '' } : null
    //   if (user) {
    //     setUser(user)
    //     navigate('/main-page', { replace: true })
    //   }
    // } catch (err) {
    //   console.error(err)
    //   loginForm.setError('root', { message: 'Error al iniciar sesión' })
    // }
    setUser({ id: 'dev-user', username: data.username })
    navigate('/main-page', { replace: true })
  }

  const onRegister = async (data: RegisterForm) => {
    // TODO: Re-enable when backend is running at VITE_API_URL
    // try {
    //   await api.post('/api/user/supervisor/register', data)
    //   setIsRegister(false)
    //   registerForm.reset()
    // } catch (err) {
    //   console.error(err)
    //   registerForm.setError('root', { message: 'Error al registrar' })
    // }
    setUser({ id: 'dev-user', username: data.username })
    setIsRegister(false)
    registerForm.reset()
    navigate('/main-page', { replace: true })
  }

  const formClass = isRegister
    ? {
        title: 'Crea una cuenta',
        link: 'Inicia sesión',
        footerClass: 'hidden',
        button: 'Registrar',
      }
    : {
        title: 'Inicia sesión con tu cuenta',
        link: 'Crea tu cuenta',
        footerClass: 'flex items-center justify-between',
        button: 'Iniciar Sesión',
      }

  return (
    <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {formClass.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            o{' '}
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setIsRegister(!isRegister)}
            >
              {formClass.link}
            </button>
          </p>
        </div>

        {isRegister ? (
          <form
            className="mt-8 space-y-6"
            onSubmit={registerForm.handleSubmit(onRegister)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="reg-email" className="sr-only">
                  Correo
                </label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="Correo Electrónico"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...registerForm.register('username')}
                />
                {registerForm.formState.errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="reg-password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="reg-password"
                  type="password"
                  placeholder="Contraseña"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...registerForm.register('password')}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {registerForm.formState.errors.root && (
              <p className="text-red-500 text-sm">
                {registerForm.formState.errors.root.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {formClass.button}
            </button>
          </form>
        ) : (
          <form
            className="mt-8 space-y-6"
            onSubmit={loginForm.handleSubmit(onLogin)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="login-email" className="sr-only">
                  Correo
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Correo Electrónico"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...loginForm.register('username')}
                />
                {loginForm.formState.errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="login-password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Contraseña"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...loginForm.register('password')}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className={formClass.footerClass}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recordar Cuenta
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
            {loginForm.formState.errors.root && (
              <p className="text-red-500 text-sm">
                {loginForm.formState.errors.root.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {formClass.button}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
