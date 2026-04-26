import { LogOut } from 'lucide-react'
import logo from '../assets/rp-Logo-nuevo.png'

interface HeaderProps {
  onLogout?: () => void
}

function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg border-b border-blue-800/30 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-inner">
              <img src={logo} alt="RPI Logo" className="w-12 h-12 object-contain" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-xs text-blue-200/80 px-3 py-1.5 bg-blue-950/50 rounded-full border border-blue-700/30">
              Sistema de Gestión de Folio Digital
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-200">Sistema Online</span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs font-medium text-red-200">Salir</span>
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button className="p-2 hover:bg-blue-800/50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
