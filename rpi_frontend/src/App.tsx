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
                <Header onLogout={logoutFunc} />
                <div className="flex min-h-screen">
                  <Sidebar onLogout={logoutFunc} />
                  <main className="flex-1">
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
