import React, { useState } from 'react'
import {
  FileCheck2,
  CheckCircle2,
  Lock,
  FileText,
  TrendingUp,
  Search,
  Plus,
  AlertCircle
} from 'lucide-react'

// Tipos para los trámites
interface Tramite {
  id_tramite: string
  matriculas: string[]
  fecha_ingreso: string
  tipo_tramite: string
  estado: string
  usuario_actual: string
}

// Datos simulados (Mock Data) - 5 trámites
const TRAMITES_MOCK: Tramite[] = [
  {
    id_tramite: 'TE-2024-001',
    matriculas: ['88000', '88001', '88002'],
    fecha_ingreso: '2024-01-15',
    tipo_tramite: 'Compraventa',
    estado: 'En Revisión Formal',
    usuario_actual: 'Mesa de Entrada'
  },
  {
    id_tramite: 'TE-2024-002',
    matriculas: ['88003'],
    fecha_ingreso: '2024-01-16',
    tipo_tramite: 'Certificado de Dominio',
    estado: 'Esperando Archivo',
    usuario_actual: 'Mesa de Entrada'
  },
  {
    id_tramite: 'TE-2024-003',
    matriculas: ['88004', '88005'],
    fecha_ingreso: '2024-01-17',
    tipo_tramite: 'Constitución de Hipoteca',
    estado: 'En Proceso',
    usuario_actual: 'Archivo'
  },
  {
    id_tramite: 'TE-2024-004',
    matriculas: ['88006'],
    fecha_ingreso: '2024-01-18',
    tipo_tramite: 'Libertación',
    estado: 'En Revisión Legal',
    usuario_actual: 'Mesa de Entrada'
  },
  {
    id_tramite: 'TE-2024-005',
    matriculas: ['88007', '88008', '88009', '88010'],
    fecha_ingreso: '2024-01-19',
    tipo_tramite: 'Compartimentación',
    estado: 'Pendiente de Firma',
    usuario_actual: 'Mesa de Entrada'
  }
]

// Métricas simuladas
const metrics = {
  ingresadosHoy: 45,
  finalizadosAnual: 12450,
  foliosBloqueados: 89
}

// Mapeo de estados a colores
const STATUS_COLORS: Record<string, string> = {
  'En Revisión Formal': 'bg-amber-100 text-amber-800 border-amber-300',
  'Esperando Archivo': 'bg-blue-100 text-blue-800 border-blue-300',
  'En Proceso': 'bg-purple-100 text-purple-800 border-purple-300',
  'En Revisión Legal': 'bg-red-100 text-red-800 border-red-300',
  'Pendiente de Firma': 'bg-emerald-100 text-emerald-800 border-emerald-300'
}

// Mapeo de tipos de trámite a íconos
const TIPO_ICONS: Record<string, React.ElementType> = {
  'Compraventa': FileCheck2,
  'Certificado de Dominio': FileText,
  'Constitución de Hipoteca': Lock,
  'Libertación': FileText,
  'Compartimentación': FileCheck2
}

const MesaEntrada: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredTramite, setHoveredTramite] = useState<string | null>(null)

  // Filtro de trámites basado en búsqueda
  const filteredTramites = TRAMITES_MOCK.filter(
    (tramite) =>
      tramite.id_tramite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tramite.matriculas.some((matricula) =>
        matricula.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Mesa de Entradas</h1>
                <p className="text-blue-200 text-sm">Control de Trámites Registrales</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p>Estado del Sistema</p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-200">Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Sección de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Métrica 1: Trámites Ingresados (Hoy) */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FileCheck2 className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                Hoy
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.ingresadosHoy}
              </p>
              <p className="text-sm text-gray-600 font-medium">Trámites Ingresados</p>
            </div>
          </div>

          {/* Métrica 2: Trámites Finalizados (Anual) */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                Anual
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.finalizadosAnual.toLocaleString('es-ES')}
              </p>
              <p className="text-sm text-gray-600 font-medium">Trámites Finalizados</p>
            </div>
          </div>

          {/* Métrica 3: Folios Bloqueados (Activos) */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                Activos
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.foliosBloqueados}
              </p>
              <p className="text-sm text-gray-600 font-medium">Folios Bloqueados</p>
            </div>
          </div>
        </div>

        {/* Barra de Herramientas */}
        <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Input de Búsqueda */}
            <div className="relative flex-1 w-full md:w-auto">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por ID o Matrícula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Botón Crear Nuevo */}
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Crear Nuevo Trámite</span>
            </button>
          </div>
        </div>

        {/* Tabla de Trámites en Proceso */}
        <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-rpi-gray/20 bg-gray-50/50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Trámites en Proceso</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {filteredTramites.length} registros
            </span>
          </div>

          {filteredTramites.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-rpi-gray/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      ID Trámite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Matrícula
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Fecha de Ingreso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Tipo de Trámite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Usuario Actual
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rpi-gray/100">
                  {filteredTramites.map((tramite) => {
                    const IconComponent = TIPO_ICONS[tramite.tipo_tramite] || FileText
                    const statusColor = STATUS_COLORS[tramite.estado] || 'bg-gray-100 text-gray-800 border-gray-300'

                    return (
                      <tr
                        key={tramite.id_tramite}
                        className="hover:bg-blue-50/30 transition-colors duration-200"
                      >
                        {/* ID Trámite */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
                              <span className="text-blue-700 font-bold text-sm">
                                {tramite.id_tramite.split('-').pop() || ''}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {tramite.id_tramite}
                              </p>
                              <p className="text-xs text-gray-500">
                                {tramite.fecha_ingreso}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Matrícula con Tooltip */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative group">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono text-gray-900 font-medium">
                                {tramite.matriculas[0]}
                              </span>
                              {tramite.matriculas.length > 1 && (
                                <span
                                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium cursor-help hover:bg-blue-200 transition-colors"
                                  onClick={() =>
                                    setHoveredTramite(
                                      hoveredTramite === tramite.id_tramite ? null : tramite.id_tramite
                                    )
                                  }
                                >
                                  <span className="sr-only">
                                    Ver {tramite.matriculas.length - 1} más
                                  </span>
                                  +{tramite.matriculas.length - 1}
                                </span>
                              )}
                            </div>

                            {/* Tooltip con todas las matrículas */}
                            {hoveredTramite === tramite.id_tramite && (
                              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-rpi-gray/20 p-4 z-50">
                                <div className="flex items-center gap-2 mb-3 border-b border-rpi-gray/100 pb-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <p className="text-xs font-semibold text-gray-700">
                                    Matrículas del Trámite
                                  </p>
                                  <button
                                    onClick={() => setHoveredTramite(null)}
                                    className="ml-auto text-gray-400 hover:text-gray-600"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <div className="space-y-1">
                                  {tramite.matriculas.map((matricula, index) => (
                                    <div
                                      key={matricula}
                                      className="flex items-center justify-between px-2 py-1.5 bg-gray-50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                                      onClick={() => setHoveredTramite(null)}
                                    >
                                      <span className="text-sm font-mono text-gray-700">
                                        {matricula}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {index + 1} de {tramite.matriculas.length}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-2 pt-2 border-t border-rpi-gray/100 flex justify-between items-center">
                                  <p className="text-xs text-gray-500">
                                    Total: {tramite.matriculas.length} matrículas
                                  </p>
                                  <button
                                    onClick={() => setHoveredTramite(null)}
                                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                                  >
                                    Cerrar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Fecha de Ingreso */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {new Date(tramite.fecha_ingreso).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </span>
                        </td>

                        {/* Tipo de Trámite */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-900">
                              {tramite.tipo_tramite}
                            </span>
                          </div>
                        </td>

                        {/* Estado con Badge */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColor}`}
                          >
                            <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
                            {tramite.estado}
                          </span>
                        </td>

                        {/* Usuario Actual */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {tramite.usuario_actual.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <span className="text-sm text-gray-600">
                              {tramite.usuario_actual}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">No se encontraron trámites</p>
              <p className="text-sm text-gray-500">
                Intenta ajustar los términos de búsqueda
              </p>
            </div>
          )}
        </div>
      </main>

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
    </div>
  )
}

export default MesaEntrada