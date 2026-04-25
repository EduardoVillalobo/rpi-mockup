import { useEffect, useState } from 'react'
import { LayoutDashboard, FileText, Settings, File, Library, ArrowRight, FileCheck2, Archive, FileCheck } from 'lucide-react'
import logo from '../assets/rp-Logo-nuevo.png'

function Sidebar() {
  const [activePath, setActivePath] = useState('')

  useEffect(() => {
    // Actualizar activePath cada vez que cambia la ruta
    const handlePathChange = () => {
      setActivePath(window.location.pathname)
    }

    // Establecer la ruta inicial
    handlePathChange()

    // Escuchar cambios en la URL
    window.addEventListener('popstate', handlePathChange)

    return () => {
      window.removeEventListener('popstate', handlePathChange)
    }
  }, [])

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: 0 },
    { icon: FileText, label: 'Mesa de Entradas', path: '/mesa-entrada' },
    { icon: Archive, label: 'Archivo', path: '/archivo' },
<<<<<<< HEAD
    { icon: FileCheck, label: 'División Folios', path: '/division' },
=======
    { icon: Library, label: 'Folio Digital', path: '/folio' },
    { icon: File, label: 'Visor Folio', path: '/visor-360' },
    { icon: ArrowRight, label: 'Workflow Folio', path: '/workflow' },    
>>>>>>> 9d13dfaf94a6952fccd9f5db78a4cedc72686a40
    { icon: FileCheck2, label: 'Mis Prácticas', path: '/practices' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
  ]

  const getIconColor = (path: string): string => {
    if (path === activePath) return 'text-white'
    return 'text-rpi-gray'
  }

  const getBgColor = (path: string): string => {
    if (path === activePath) return 'bg-gradient-to-r from-rpi-blue to-blue-700 text-white shadow-lg shadow-blue-900/20'
    return 'bg-rpi-gray/10 text-gray-700 group-hover:bg-rpi-gray/20 group-hover:text-gray-900'
  }

  const isActive = (path: string) => path === activePath

  return (
    <aside className="w-64 bg-white border-r border-rpi-gray/20 flex-shrink-0 print:hidden">
      {/* Header del Sidebar */}
      <div className="p-5 border-b border-rpi-gray/100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br  rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            {/* Colocar imagen institucional de src/assets/rp-Logo-nuevo.png */}
            <img src={logo} alt="RPI Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">RPI Catamarca</h2>
            <p className="text-xs text-rpi-gray/60">Gestión Registral</p>
          </div>
        </div>
        <p className="text-xs text-rpi-gray/50 ml-1">Sistema de Folio Digital</p>
      </div>

      {/* Navegación */}
      <nav className="p-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                item.path === '/dashboard' ? 'shadow-sm' : ''
              } ${getBgColor(item.path)}`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive(item.path) ? getBgColor(item.path) : ''
                }`}>
                  <item.icon className={`w-5 h-5 ${getIconColor(item.path)} transition-colors`} />
                </div>
                <span className={`text-sm font-medium ${isActive(item.path) ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors`}>
                  {item.label}
                </span>
              </div>
              {item.badge && item.badge > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-rpi-gray/100 bg-rpi-gray/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <p className="text-xs text-rpi-gray/70">Sistema operativo</p>
        </div>
        <p className="text-xs text-rpi-gray/50 mt-2 text-center">v1.0.0</p>
      </div>
    </aside>
  )
}

export default Sidebar
