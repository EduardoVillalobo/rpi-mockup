import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Visor360 from './components/Visor360'
import FolioDigital from './components/FolioDigital'
import Practices from './components/Practices'
import Settings from './components/Settings'
import WorkflowFolio from './components/WorkflowFolio'
import MesaEntrada from './components/MesaEntrada'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<div className="text-gray-500">Dashboard</div>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/visor-360" element={<Visor360 />} />
              <Route path="/folio" element={<FolioDigital />} />
              <Route path="/practices" element={<Practices />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/workflow" element={<WorkflowFolio />} />
              <Route path="/mesa-entrada" element={<MesaEntrada />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
