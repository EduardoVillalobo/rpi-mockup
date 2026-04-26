import { useState } from 'react'
import { Landmark, User, Lock, ExternalLink } from 'lucide-react'

interface LoginProps {
  onLogin?: () => void
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onLogin) {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cabecera de la tarjeta */}
        <div className="p-8 text-center border-b border-slate-100">
          <div className="w-16 h-16 bg-gradient-to-br from-rpi-blue to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
            <Landmark className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Registro de la Propiedad Inmobiliaria
          </h1>
          <p className="text-sm text-slate-500">Provincia de Catamarca</p>
        </div>

        {/* Formulario de Acceso */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Input Nombre de Usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpi-blue focus:border-transparent transition-all"
                placeholder="Ingrese su nombre de usuario"
              />
            </div>
          </div>

          {/* Input Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpi-blue focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Enlace Olvidó contraseña */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-rpi-blue hover:underline"
            >
              ¿Olvidó su contraseña?
            </a>
          </div>

          {/* Botón Ingresar */}
          <button
            type="submit"
            className="w-full bg-rpi-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Ingresar
          </button>
        </form>

        {/* Enlaces externos */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-center gap-2">
            <div className="w-px h-px bg-slate-300"></div>
            <span className="text-slate-300 text-xs">o</span>
            <div className="w-px h-px bg-slate-300"></div>
          </div>
          <a
            href="https://www.mensuraonline.gob.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 border border-rpi-blue/30 rounded-lg text-rpi-blue hover:bg-rpi-blue/5 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Ir al Sistema de Catastro: Mensura Online
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
