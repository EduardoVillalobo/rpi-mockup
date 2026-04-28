import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Visor360 from './components/Visor360'
import FolioDigital from './components/FolioDigital'
import Practices from './components/Practices'
import Settings from './components/Settings'
import WorkflowFolio from './components/WorkflowFolio'
import MesaEntrada from './components/MesaEntrada'
import Archivo from './components/Archivo'
import DivisionFolio from './components/DivisionFolio'
import NuevoTramite from './components/nuevoTramite'
import DigitalizacionFolio from './components/DigitalizacionFolio'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Cargar estado inicial desde localStorage
    const storedSession = localStorage.getItem('rpi_session')
    return storedSession === 'true'
  })

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogin = () => {
    localStorage.setItem('rpi_session', 'true')
    setIsAuthenticated(true)
    setIsLoggingOut(false)
  }

  const handleLogout = () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    localStorage.removeItem('rpi_session')
    setIsAuthenticated(false)
    // Navegar al login después de un breve delay
    setTimeout(() => {
      window.location.href = '/login'
    }, 300)
  }

  // Efecto para sincronizar autenticación en componentes hijos
  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/login') {
      window.location.href = '/dashboard'
    }
  }, [isAuthenticated])

  const handleCancelTramite = () => {
    window.location.href = '/mesa-entrada'
  }

  const handleSubmitTramite = (datos: any) => {
    console.log('Trámite creado:', datos)
    window.location.href = '/mesa-entrada'
  }

  // Valor seguro para handleLogout (si no está en context, devuelve undefined)
  const logoutFunc = typeof handleLogout === 'function' ? handleLogout : undefined

  // Estado del Sidebar responsivo
  // - Inicia como true en escritorio (pantallas grandes)
  // - Inicia como false en móviles (CSS lo oculta)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = localStorage.getItem('rpi_sidebar_open')
    if (stored !== null) {
      return stored === 'true'
    }
    // Inicia como true y usaré CSS para ocultarlo en móvil
    return window.innerWidth >= 1024
  })

  // Ajustar el estado del sidebar cuando cambia el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // En escritorio, volver al estado anterior
        setIsSidebarOpen(() => {
          const stored = localStorage.getItem('rpi_sidebar_open')
          return stored === 'true'
        })
      } else {
        // En móvil, el sidebar debe estar cerrado (false)
        setIsSidebarOpen(false)
        localStorage.setItem('rpi_sidebar_open', 'false')
      }
    }

    window.addEventListener('resize', handleResize)

    // Escuchar cambios en la URL para sincronizar en SPA
    window.addEventListener('popstate', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('popstate', handleResize)
    }
  }, [])

  // Persistir el estado del sidebar en localStorage
  useEffect(() => {
    localStorage.setItem('rpi_sidebar_open', isSidebarOpen.toString())
  }, [isSidebarOpen])

  // Toggle del sidebar para localStorage
  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      // En móvil, solo abrir o cerrar
      setIsSidebarOpen(prev => !prev)
    } else {
      // En escritorio, abrir/cerrar manualmente
      setIsSidebarOpen(prev => !prev)
    }
  }

  // Función para cerrar sidebar en móvil (usada por el overlay)
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }

  // Clases dinámicas para el main content
  const mainClasses = `flex-1 transition-all duration-300 ease-in-out ${
    isSidebarOpen && window.innerWidth >= 1024 ? 'ml-64' : 'ml-0'
  }`

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <div className="min-h-screen bg-gray-50">
                <Header onLogout={logoutFunc} toggleSidebar={toggleSidebar} />
                {/* Overlay para móvil */}
                {isSidebarOpen && window.innerWidth < 1024 && (
                  <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={closeSidebarOnMobile}
                  />
                )}
                <div className="flex min-h-screen">
                  <Sidebar onLogout={logoutFunc} isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                  <main className={mainClasses}>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/visor-360" element={<Visor360 />} />
                      <Route path="/folio" element={<FolioDigital />} />
                      <Route path="/digitalizacion" element={<DigitalizacionFolio />} />
                      <Route path="/practices" element={<Practices />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/workflow" element={<WorkflowFolio />} />
                      <Route path="/mesa-entrada" element={<MesaEntrada />} />
                      <Route path="/archivo" element={<Archivo />} />
                      <Route path="/division" element={<DivisionFolio />} />
                      <Route
                        path="/nuevo-tramite"
                        element={
                          <NuevoTramite
                            onCancel={handleCancelTramite}
                            onSubmit={handleSubmitTramite}
                          />
                        }
                      />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
