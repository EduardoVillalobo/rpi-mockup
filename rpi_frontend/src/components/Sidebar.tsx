import { useEffect, useState } from 'react'
import { LayoutDashboard, FileText, Archive, FileCheck, LogOut, ScanText, File, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import logo from '../assets/rp-Logo-nuevo.png'

interface SidebarProps {
  onLogout?: () => void
  isOpen?: boolean
  setIsSidebarOpen?: (open: boolean) => void
}

function Sidebar({ onLogout, isOpen, setIsSidebarOpen }: SidebarProps) {
  const [activePath, setActivePath] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    const handlePathChange = () => {
      setActivePath(window.location.pathname)
    }
    handlePathChange()
    window.addEventListener('popstate', handlePathChange)
    return () => {
      window.removeEventListener('popstate', handlePathChange)
    }
  }, [])

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: 5 },
    { icon: FileText, label: 'Mesa de Entradas', path: '/mesa-entrada' },
    { icon: Archive, label: 'Archivo', path: '/archivo' },
    { icon: ScanText, label: 'Digitalización de Folio', path: '/digitalizacion' },
    { icon: FileCheck, label: 'División Folios', path: '/division' },
    { icon: File, label: 'Visor Folio', path: '/visor-360' },
    { icon: ArrowRight, label: 'Workflow Folio', path: '/workflow' },
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

  // Clases dinámicas para el Sidebar
  const sidebarClasses = `fixed lg:fixed inset-y-0 z-50 h-screen transition-all duration-300 ease-in-out flex flex-col print:hidden ${
    isMobile ? '-translate-x-full' : ''
  } ${isMobile ? 'translate-x-0' : (isOpen ? 'lg:w-64 w-64' : 'lg:w-20 w-20')}
    bg-white
    ${isOpen ? 'border-r border-rpi-gray/20' : ''}`

  const headerClasses = isMobile ? '' : (isOpen ? 'px-5 pb-5 border-b border-rpi-gray/100' : 'px-4 pb-5 border-b border-rpi-gray/100')

  const navClasses = isMobile ? 'p-3' : (isOpen ? 'px-4 py-4' : 'px-2 py-4')

  return (
    <aside className={sidebarClasses}>
      <div className={headerClasses}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-rpi-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <img src={logo} alt="RPI Logo" className="w-6 h-6 object-contain" />
          </div>
          {(isOpen || isMobile) && (
            <>
              <div>
                <h2 className="text-base font-bold text-gray-900">RPI Catamarca</h2>
                <p className="text-xs text-rpi-gray/60">MOCKUP EN DESARROLLO</p>
              </div>
              <p className="text-xs text-rpi-gray/50 ml-1">Sistema de Folio Digital</p>
            </>
          )}
        </div>
      </div>

      <nav className={navClasses}>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center justify-between gap-3 rounded-lg transition-all duration-200 group ${
                item.path === '/dashboard' ? 'shadow-sm' : ''
              } ${getBgColor(item.path)}`}
            >
              <div className={`flex items-center gap-3 flex-1 min-w-0 ${!isMobile && !isOpen ? 'hidden' : ''}`}>
                <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                  isActive(item.path) ? getBgColor(item.path) : ''
                }`}>
                  <item.icon className={`w-5 h-5 ${getIconColor(item.path)} transition-colors`} />
                </div>
                {(isOpen || isMobile) && (
                  <span className={`text-sm font-medium truncate whitespace-nowrap transition-colors ${
                    isActive(item.path) ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {item.label}
                  </span>
                )}
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

      {isMobile ? null : (
        <div className="px-2 py-4 border-t border-gray-200">
          <div className="border-t border-gray-200 my-3"></div>
          {!isMobile && (
            <div className="flex items-center justify-center px-2">
              {isOpen && (
                <button
                  onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
                  title="Ocultar menú"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Ocultar Menú</span>
                </button>
              )}
              {!isOpen && (
                <button
                  onClick={() => setIsSidebarOpen && setIsSidebarOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
                  title="Mostrar menú"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>Mostrar Menú</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className={`p-4 border-t border-rpi-gray/100 bg-rpi-gray/20 flex-shrink-0 ${!isOpen && !isMobile ? 'hidden' : ''}`}>
        <div className="flex items-center gap-2">
          <p className="text-xs text-rpi-gray/70">Dirección Provincial de Tecnologías</p>
        </div>
        <p className="text-xs text-rpi-gray/50 mt-2 text-center">Mockup v0.1.0</p>
        {isMobile && isOpen && (
          <button
            onClick={() => window.location.reload()}
            className="mt-3 w-full text-xs text-center text-rpi-blue/60 hover:text-rpi-blue/80 hover:bg-rpi-blue/10 rounded-lg px-2 py-1 transition-colors"
          >
            ← Cerrar menú
          </button>
        )}
        {isOpen && onLogout && !isMobile && (
          <button
            onClick={onLogout}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-rpi-blue hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        )}
      </div>
    </aside>
  )
}

export default Sidebar