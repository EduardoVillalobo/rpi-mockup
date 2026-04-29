import { useEffect, useState } from 'react'
import { LayoutDashboard, FileText, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

interface Tramite {
  id: number
  folio: string
  tramite: string
  estado: string
  semaforo: string
  vencimiento_dias: number
  fecha_ingreso?: string
  fecha_inicio?: string
}

export default function Dashboard() {
  const [tramites, setTramites] = useState<Tramite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTramites = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/tramites/')
        if (!response.ok) throw new Error('Error al obtener trámites')
        const data = await response.json()
        setTramites(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchTramites()
  }, [])

  const getSemaforoLabel = (vencimiento: number): string => {
    if (vencimiento <= 2) return 'Vence pronto'
    if (vencimiento <= 5) return 'En proceso'
    return 'En curso'
  }

  const getStatusIcon = (semaforo: string) => {
    switch (semaforo) {
      case 'rojo': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'amarillo': return <Clock className="w-4 h-4 text-amber-500" />
      case 'verde': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      default: return <CheckCircle2 className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (semaforo: string) => {
    switch (semaforo) {
      case 'rojo': return 'bg-red-50 text-red-700 border-red-200'
      case 'amarillo': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'verde': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-rpi-blue border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando trámites...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-800 font-medium">{error}</p>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Trámites en Proceso</h1>
                <p className="text-blue-200 text-sm">Gestión de trámites registral</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="px-4 py-2 bg-white rounded-lg border border-rpi-gray/20 shadow-sm">
                <p className="text-2xl font-bold text-rpi-blue">{tramites.length}</p>
                <p className="text-xs text-rpi-gray/60 uppercase font-medium">Trámites Activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 border border-blue-200/50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-200/50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Información del Sistema</p>
              <p>
                Haz clic en cada fila para ver los detalles del trámite. Los trámites se ordenan automáticamente por prioridad de vencimiento. Las alertas de colores indican el estado de cada trámite.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-4 border border-red-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-800 font-medium mb-1">Vence Pronto</p>
                <p className="text-3xl font-bold text-red-900">2</p>
              </div>
              <div className="w-12 h-12 bg-red-200/50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-800 font-medium mb-1">En Proceso</p>
                <p className="text-3xl font-bold text-amber-900">1</p>
              </div>
              <div className="w-12 h-12 bg-amber-200/50 rounded-lg flex items-center justify-center">
                <Clock className="w-7 h-7 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 border border-emerald-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-800 font-medium mb-1">En Curso</p>
                <p className="text-3xl font-bold text-emerald-900">2</p>
              </div>
              <div className="w-12 h-12 bg-emerald-200/50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Trámites */}
        <div className="bg-white rounded-xl shadow-lg border border-rpi-gray/20 overflow-hidden mt-6">
          <div className="px-6 py-4 border-b border-rpi-gray/20 bg-gray-50/50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Lista de Trámites</h2>
            
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-rpi-gray/100">
              <thead className="bg-rpi-gray/5">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wider">
                    N° Trámite
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wider">
                    Matrícula
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wider">
                    Fecha Ingreso
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wider">
                    Estado
                  </th>
                  
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wider">
                    Prioridad
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rpi-gray/100">
                {tramites.map((tramite) => (
                  <tr
                    key={tramite.id}
                    className="hover:bg-rpi-gray/50 cursor-pointer transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rpi-blue/10 text-rpi-blue font-semibold text-sm group-hover:bg-rpi-blue/20 transition-colors">
                          {tramite.id}
                        </span>
                        <span className="text-sm font-medium text-gray-900 group-hover:text-rpi-blue transition-colors">
                          Ver trámite
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-mono font-medium">
                        {tramite.folio}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {tramite.tramite}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tramite.fecha_inicio ? new Date(tramite.fecha_inicio).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${getStatusColor(tramite.semaforo)}`}>
                        {getStatusIcon(tramite.semaforo)}
                        {getSemaforoLabel(tramite.vencimiento_dias)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tramite.estado}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tramite.vencimiento_dias} días
                    </td>
                  </tr>
                ))}
              </tbody>
              {tramites.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FileText className="w-12 h-12 mb-3 opacity-50" />
                        <p className="text-sm font-medium">No hay trámites registrados</p>
                        <p className="text-xs mt-1">El sistema está actualizado</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>

        {/* Nota informativa */}
        {/* Footer con información */}
        <footer className="mt-6 bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Sistema de Registro de la Propiedad Inmobiliaria</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Última actualización: {new Date().toLocaleTimeString('es-ES')}</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
