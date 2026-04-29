import React, { useState } from 'react'
import {
  Archive,
  FileText,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Download,
  X
} from 'lucide-react'

// Tipos para los trámites de archivo
interface TramiteArchivo {
  id_tramite: string
  folios_afectados: string[]
  cantidad_documentos: number
  usuario_mesa: string
  division_asignada: string
}

// Datos simulados - Trámites que vienen de Mesa de Entrada
const TRAMITES_ARCHIVO_MOCK: TramiteArchivo[] = [
  {
    id_tramite: 'TE-2024-001',
    folios_afectados: ['Matrícula 88000', 'Matrícula 88001', 'Matrícula 88002'],
    cantidad_documentos: 8,
    usuario_mesa: 'Ana García',
    division_asignada: 'Folios'
  },
  {
    id_tramite: 'TE-2024-002',
    folios_afectados: ['Matrícula 88003'],
    cantidad_documentos: 5,
    usuario_mesa: 'Carlos López',
    division_asignada: 'Folios'
  },
  {
    id_tramite: 'TE-2024-004',
    folios_afectados: ['Matrícula 88006'],
    cantidad_documentos: 12,
    usuario_mesa: 'María Rodríguez',
    division_asignada: 'Folios'
  },
  {
    id_tramite: 'TE-2024-005',
    folios_afectados: ['Matrícula 88007', 'Matrícula 88008', 'Matrícula 88009', 'Matrícula 88010'],
    cantidad_documentos: 15,
    usuario_mesa: 'Juan Pérez',
    division_asignada: 'Folios'
  }
]

// Datos simulados para los documentos del modal
const DOCUMENTOS_ARCHIVO = [
  'Escritura_Escaneada.pdf',
  'DNI_Comprador.jpg',
  'DNI_Vendedor.jpg',
  'Matricula_Anterior.pdf',
  'Plano_Catastral.pdf'
]

interface FolioEstado {
  bloqueado: boolean
  digitalizado: boolean
}

interface ModalArchivoProps {
  tramite: TramiteArchivo
  onClose: () => void
  onSave: () => void
}

const ModalArchivo: React.FC<ModalArchivoProps> = ({ tramite, onClose, onSave }) => {
  // Estado global del trámite
  const [estadoRegistralGlobal, setEstadoRegistralGlobal] = useState<'Libre' | 'Bloqueado'>('Libre')
  const [digitalizadoGlobal, setDigitalizadoGlobal] = useState(false)

  // Estado por folio
  const [folios, setFolios] = useState<Record<number, FolioEstado>>(() => {
    const estados: Record<number, FolioEstado> = {}
    tramite.folios_afectados.forEach((_, index) => {
      estados[index] = {
        bloqueado: false,
        digitalizado: Math.random() < 0.3 // Simular algunos ya digitalizados
      }
    })
    return estados
  })

  // Manejar cambio de estado registral global
  const handleEstadoGlobalChange = (estado: 'Libre' | 'Bloqueado') => {
    setEstadoRegistralGlobal(estado)
    if (estado === 'Bloqueado') {
      setDigitalizadoGlobal(true)
    }
  }

  // Manejar cambio de bloqueo por folio
  const handleBloqueoChange = (index: number, bloqueado: boolean) => {
    setFolios((prev) => ({
      ...prev,
      [index]: { ...prev[index], bloqueado }
    }))
  }

  // Manejar cambio de digitalización por folio
  const handleDigitalizadoChange = (index: number, digitalizado: boolean) => {
    setFolios((prev) => ({
      ...prev,
      [index]: { ...prev[index], digitalizado }
    }))
    // Si todos están digitalizados, marcar global como true
    const todosDigitalizados = Object.values(folios).every(f => f.digitalizado)
    setDigitalizadoGlobal(todosDigitalizados)
  }

  // Manejar guardado
  const handleGuardar = () => {
    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-4 flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Archive className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Gestión de Archivo</h2>
              <p className="text-blue-200 text-sm">ID Trámite: {tramite.id_tramite}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Estado Registral Global */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Estado Registral del Trámite
              </label>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${estadoRegistralGlobal === 'Libre'
                ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                : 'bg-red-100 text-red-700 border-red-300'
                }`}>
                {estadoRegistralGlobal === 'Libre' ? 'Folio Libre' : 'Folio Bloqueado'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleEstadoGlobalChange('Libre')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${estadoRegistralGlobal === 'Libre'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Libre
                </div>
              </button>
              <button
                onClick={() => handleEstadoGlobalChange('Bloqueado')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${estadoRegistralGlobal === 'Bloqueado'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Bloqueado
                </div>
              </button>
            </div>
            {estadoRegistralGlobal === 'Bloqueado' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">
                  El folio está congelado y requiere atención prioritaria por parte de la división de Folios.
                </p>
              </div>
            )}
          </div>

          {/* Listado de Folios */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Listado de Folios
              </label>
              <span className="text-xs text-gray-500">
                {tramite.folios_afectados.length} folios en este trámite
              </span>
            </div>
            <div className="space-y-3">
              {tramite.folios_afectados.map((folio, index) => {
                const folioEstado = folios[index]

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all ${folioEstado.bloqueado
                      ? 'bg-red-50 border-red-300'
                      : estadoRegistralGlobal === 'Libre'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-gray-900">
                            {folio}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${folioEstado.digitalizado
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-600'
                            }`}>
                            {folioEstado.digitalizado ? 'Digitalizado' : 'Pendiente'}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                          {/* Bloqueo por folio */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">Bloqueo:</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={folioEstado.bloqueado}
                                onChange={(e) => handleBloqueoChange(index, e.target.checked)}
                                className="sr-only"
                              />
                              <div className={`w-10 h-6 rounded-full transition-colors ${folioEstado.bloqueado ? 'bg-red-500' : 'bg-gray-300'
                                }`}></div>
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${folioEstado.bloqueado ? 'translate-x-5' : 'translate-x-1'
                                }`}></div>
                            </label>
                          </div>

                          {/* Digitalización por folio */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">Digitalizado:</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={folioEstado.digitalizado}
                                onChange={(e) => handleDigitalizadoChange(index, e.target.checked)}
                                className="sr-only"
                              />
                              <div className={`w-10 h-6 rounded-full transition-colors ${folioEstado.digitalizado ? 'bg-emerald-500' : 'bg-gray-300'
                                }`}></div>
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${folioEstado.digitalizado ? 'translate-x-5' : 'translate-x-1'
                                }`}></div>
                            </label>
                          </div>

                          {/* Checkbox para digitalizar urgente */}
                          {!folioEstado.digitalizado && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDigitalizadoChange(index, true)}
                                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs rounded-lg flex items-center gap-1 transition-colors"
                              >
                                <AlertCircle className="w-3 h-3" />
                                Marcar Urgente
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Estado de Digitalización Global */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Estado Global de Digitalización
              </label>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${digitalizadoGlobal
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600'
                }`}>
                {digitalizadoGlobal ? 'Todos Digitalizados' : 'Pendiente de Digitalización'}
              </span>
            </div>
            <div className="flex gap-3">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  checked={digitalizadoGlobal}
                  onChange={() => setDigitalizadoGlobal(true)}
                  className="sr-only"
                />
                <div className="relative px-4 py-3 bg-emerald-100 text-emerald-800 rounded-xl border-2 border-emerald-500 font-medium">
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Digitalizado
                  </span>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  checked={!digitalizadoGlobal}
                  onChange={() => setDigitalizadoGlobal(false)}
                  className="sr-only"
                />
                <div className="relative px-4 py-3 bg-gray-100 text-gray-700 rounded-xl border-2 border-gray-300 hover:border-gray-400 font-medium">
                  <span className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Pendiente
                  </span>
                </div>
              </label>
            </div>
            {!digitalizadoGlobal && (
              <button
                onClick={() => setDigitalizadoGlobal(true)}
                className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <AlertCircle className="w-5 h-5" />
                Marcar Todos para Digitalización Urgente
              </button>
            )}
          </div>

          {/* División Asignada */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              División Asignada
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-600 font-medium">
              <span className="flex items-center justify-center gap-2">
                <Archive className="w-5 h-5 text-gray-400" />
                División Folios
              </span>
            </div>
            <p className="text-xs text-gray-500">Campo informativo - No modificable</p>
          </div>

          {/* Documentación */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Documentación Adjunta
              </label>
              <span className="text-xs text-gray-500">
                {DOCUMENTOS_ARCHIVO.length} archivos
              </span>
            </div>
            <div className="space-y-2">
              {DOCUMENTOS_ARCHIVO.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{doc}</span>
                  </div>
                  <button className="p-2 hover:bg-blue-200 rounded-lg transition-colors text-blue-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer del Modal */}
        <div className="px-6 py-4 bg-gray-50 border-t border-rpi-gray/20 flex items-center justify-end gap-3 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Guardar y Enviar a División Folios
          </button>
        </div>
      </div>
    </div>
  )
}

const Archivo: React.FC = () => {
  const [selectedTramite, setSelectedTramite] = useState<TramiteArchivo | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)

  // Manejar clic en botón de gestionar
  const handleGestionar = (tramite: TramiteArchivo) => {
    setSelectedTramite(tramite)
    setMostrarModal(true)
  }

  // Manejar cerrar modal
  const handleCloseModal = () => {
    setMostrarModal(false)
    setTimeout(() => {
      setSelectedTramite(null)
    }, 300)
  }

  // Manejar guardado
  const handleGuardar = () => {
    // Simular guardado y remoción del trámite
    console.log('Trámite guardado:', selectedTramite)
    handleCloseModal()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Archive className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Gestión de Archivo</h1>
                <p className="text-blue-200 text-sm">Control de Documentos y Folios</p>
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
        {/* Métricas de Archivo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Archive className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                Activos
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">24</p>
              <p className="text-sm text-gray-600 font-medium">Trámites en Archivo</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                Mes Actual
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">486</p>
              <p className="text-sm text-gray-600 font-medium">Documentos Procesados</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                Eficiencia
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">98%</p>
              <p className="text-sm text-gray-600 font-medium">Tasa de Compleción</p>
            </div>
          </div>
        </div>

        {/* Tabla de Trámites para Archivo */}
        <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-rpi-gray/20 bg-gray-50/50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Trámites en Espera de Archivo</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {TRAMITES_ARCHIVO_MOCK.length} registros
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-rpi-gray/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    ID Trámite
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Folios Afectados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Cant. Documentos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Usuario Mesa de Entrada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rpi-gray/100">
                {TRAMITES_ARCHIVO_MOCK.map((tramite) => (
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
                            {tramite.cantidad_documentos} documentos
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Folios Afectados */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {tramite.folios_afectados.map((folio, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200"
                          >
                            {folio}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Cantidad de Documentos */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {tramite.cantidad_documentos}
                        </span>
                      </div>
                    </td>

                    {/* Usuario Mesa de Entrada */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {tramite.usuario_mesa
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <span className="text-sm text-gray-600">
                          {tramite.usuario_mesa}
                        </span>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleGestionar(tramite)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <MoreVertical className="w-4 h-4" />
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Footer */}
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



      {/* Modal de Detalle */}
      {mostrarModal && selectedTramite && (
        <ModalArchivo
          tramite={selectedTramite}
          onClose={handleCloseModal}
          onSave={handleGuardar}
        />
      )}
    </div>
  )
}

export default Archivo
