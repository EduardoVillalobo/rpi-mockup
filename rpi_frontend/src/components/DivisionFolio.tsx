import React, { useState } from 'react'
import {
  FileText,
  Lock,
  Eye,
  ArrowLeft,
  CheckCircle2,
  Gavel,
  Search,
  ClipboardCheck,
  UserCheck
} from 'lucide-react'

// Tipos
interface Folio {
  folio: string
  estado: string
}

interface Documento {
  nombre: string
  pagina: number
}

interface Firma {
  rol: string
  nombre: string
  fecha: string
}

interface TramiteDivision {
  n_orden: string
  fecha_ingreso_division: string
  fecha_ingreso_mesa: string
  folios: Folio[]
  tipo_tramite: string
  ep_n: string
  solicitante: string
  titular: string
  escribania: string
  documentos: Documento[]
  estado: 'En Asignación' | 'Calificación' | 'Verificación' | 'Inscripción' | 'Finalizado'
  firmas: Firma[]
  sellado: boolean
  ultimo_usuario: string
  ultimo_movimiento: string
}

// Datos simulados para la Bandeja de División Folios
const tramites_division: TramiteDivision[] = [
  {
    n_orden: 'DIV-2024-001',
    fecha_ingreso_division: '2024-01-20 09:15',
    fecha_ingreso_mesa: '2024-01-15 14:30',
    folios: [
      { folio: 'MAT-88000', estado: 'Bloqueado' },
      { folio: 'MAT-88001', estado: 'Bloqueado' },
      { folio: 'MAT-88002', estado: 'Bloqueado' }
    ],
    tipo_tramite: 'Compraventa',
    ep_n: '12345',
    solicitante: 'Juan Pérez',
    titular: 'María García',
    escribania: 'Notaría Pública No. 15',
    documentos: [
      { nombre: 'Escritura_Publica.pdf', pagina: 12 },
      { nombre: 'Matricula_Anterior.pdf', pagina: 1 },
      { nombre: 'Plano_Catastral.pdf', pagina: 8 }
    ],
    estado: 'En Asignación',
    firmas: [],
    sellado: false,
    ultimo_usuario: 'Sistema',
    ultimo_movimiento: '2024-01-20 09:15'
  },
  {
    n_orden: 'DIV-2024-002',
    fecha_ingreso_division: '2024-01-21 10:30',
    fecha_ingreso_mesa: '2024-01-16 11:00',
    folios: [
      { folio: 'MAT-88003', estado: 'Bloqueado' }
    ],
    tipo_tramite: 'Certificado de Dominio',
    ep_n: '23456',
    solicitante: 'Carlos López',
    titular: 'Empresa López SA de CV',
    escribania: 'Notaría Pública No. 42',
    documentos: [
      { nombre: 'Escritura_Publica.pdf', pagina: 8 },
      { nombre: 'Domicilio_Conocido.pdf', pagina: 2 }
    ],
    estado: 'Calificación',
    firmas: [
      { rol: 'Asesor', nombre: 'Roberto Méndez', fecha: '2024-01-21 11:20' }
    ],
    sellado: false,
    ultimo_usuario: 'R. Méndez',
    ultimo_movimiento: '2024-01-21 11:20'
  },
  {
    n_orden: 'DIV-2024-003',
    fecha_ingreso_division: '2024-01-22 08:45',
    fecha_ingreso_mesa: '2024-01-17 15:45',
    folios: [
      { folio: 'MAT-88006', estado: 'Bloqueado' },
      { folio: 'MAT-88007', estado: 'Bloqueado' }
    ],
    tipo_tramite: 'Compraventa',
    ep_n: '34567',
    solicitante: 'Ana Torres',
    titular: 'Ferretería Torres',
    escribania: 'Notaría Pública No. 28',
    documentos: [
      { nombre: 'Escritura_Publica.pdf', pagina: 15 },
      { nombre: 'Matricula_Anterior.pdf', pagina: 3 },
      { nombre: 'Contrato_Arrendamiento.pdf', pagina: 5 }
    ],
    estado: 'Verificación',
    firmas: [
      { rol: 'Asesor', nombre: 'Roberto Méndez', fecha: '2024-01-22 09:00' },
      { rol: 'Inscriptor', nombre: 'Laura Fernández', fecha: '2024-01-22 10:15' }
    ],
    sellado: true,
    ultimo_usuario: 'L. Fernández',
    ultimo_movimiento: '2024-01-22 10:15'
  }
]

interface ModalDetalleProps {
  tramite: TramiteDivision
  onClose: () => void
  onGuardar: () => void
}

const ModalDetalle: React.FC<ModalDetalleProps> = ({ tramite, onClose, onGuardar }) => {
  const [asesor, setAsesor] = useState('')
  const [inscriptor, setInscriptor] = useState('')
  const [verificador, setVerificador] = useState('')
  const [observaciones, setObservaciones] = useState('')

  const nombresFicticios = {
    asesores: ['Roberto Méndez', 'Carlos Sánchez', 'Elena Ruiz', 'Miguel Ángel Torres', 'Patricia López'],
    inscriptores: ['Laura Fernández', 'Diego Martínez', 'Sofía Ramírez', 'Jorge Herrera', 'Andrea Castillo'],
    verificadores: ['Andrés Vega', 'Monica Flores', 'Sebastián Morales', 'Natalia Cruz', 'Fernando Jiménez']
  }

  const asesorOptions = ['Seleccionar...', ...nombresFicticios.asesores.map(n => n.replace(/ /g, '|'))]
  const inscriptorOptions = ['Seleccionar...', ...nombresFicticios.inscriptores.map(n => n.replace(/ /g, '|'))]
  const verificadorOptions = ['Seleccionar...', ...nombresFicticios.verificadores.map(n => n.replace(/ /g, '|'))]

  const handleSeleccionar = () => {
    onGuardar()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-4 flex items-center justify-between sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h2 className="text-xl font-bold">Detalle del Trámite</h2>
              <p className="text-blue-200 text-sm">Orden: {tramite.n_orden}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 space-y-6">
          {/* Estado del Trámite */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div>
              <p className="text-sm text-blue-700 uppercase tracking-wide font-semibold">Estado Actual</p>
              <p className="text-2xl font-bold text-blue-900">{tramite.estado}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">Folios Bloqueados</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">{tramite.folios.length} folios afectados</p>
            </div>
          </div>

          {/* Filtros de búsqueda simulados */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Buscar por folio, tipo de trámite..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors">
                Filtrar
              </button>
            </div>
          </div>

          {/* Grid de Tarjetas de Información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta: Fechas */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Fechas Importantes</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ingreso a Mesa de Entradas:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.fecha_ingreso_mesa}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ingreso a División:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.fecha_ingreso_division}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Último Movimiento:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.ultimo_movimiento}</span>
                </div>
              </div>
            </div>

            {/* Tarjeta: Datos del Acto */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Datos del Acto</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tipo de Trámite:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.tipo_tramite}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">EP N°:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.ep_n}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Escribanía:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.escribania}</span>
                </div>
              </div>
            </div>

            {/* Tarjeta: Solicitante y Titular */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Partes Interesadas</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Solicitante:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.solicitante}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Titular:</span>
                  <span className="text-sm font-medium text-gray-900">{tramite.titular}</span>
                </div>
              </div>
            </div>

            {/* Tarjeta: Auditores */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Estado del Proceso</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avance en Proceso:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {tramite.firmas.length > 0 ? 'En Calificación/Verificación/Inscripción' : 'Pendiente de asignación'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Último Operador:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {tramite.ultimo_usuario
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{tramite.ultimo_usuario}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sellado:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      tramite.sellado
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                        : 'bg-gray-100 text-gray-600 border-gray-300'
                    }`}
                  >
                    {tramite.sellado ? 'Sí' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Documentación */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Documentación Adjunta</p>
              <span className="text-xs text-gray-500">{tramite.documentos.length} documentos</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tramite.documentos.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.nombre}</p>
                      <p className="text-xs text-gray-500">Página {doc.pagina}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    PDF
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Folios Afectados (enlaces) */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">Folios Afectados</p>
            <div className="flex flex-wrap gap-2">
              {tramite.folios.map((folio, index) => (
                <a
                  key={index}
                  href={`#/visor-360?folio=${folio.folio}`}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium border border-blue-200 hover:border-blue-300 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {folio.folio}
                </a>
              ))}
            </div>
          </div>

          {/* Firmas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Firmas Realizadas</p>
              <span className="text-xs text-gray-500">
                {tramite.firmas.length} de {tramite.firmas.length + 3}
              </span>
            </div>
            <div className="space-y-2">
              {tramite.firmas.length > 0 ? (
                tramite.firmas.map((firma, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl border border-emerald-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{firma.nombre}</p>
                        <p className="text-xs text-gray-500">Rol: {firma.rol}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{firma.fecha}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic text-center py-3">
                  Aún no se han realizado firmas. Es necesario asignar el equipo técnico.
                </p>
              )}
            </div>
          </div>

          {/* Panel de Asignación de Equipo Técnico */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-300 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900">Asignación de Equipo Técnico</h3>
                <p className="text-sm text-blue-700">
                  Seleccione los operadores para avanzar en el trámite
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-2">
                    Asignar Asesor
                  </label>
                  <select
                    value={asesor}
                    onChange={(e) => setAsesor(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 font-medium"
                  >
                    {asesorOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option === 'Seleccionar...' ? 'Seleccionar Asesor...' : option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-2">
                    Asignar Inscriptor
                  </label>
                  <select
                    value={inscriptor}
                    onChange={(e) => setInscriptor(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 font-medium"
                  >
                    {inscriptorOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option === 'Seleccionar...' ? 'Seleccionar Inscriptor...' : option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-2">
                    Asignar Verificador
                  </label>
                  <select
                    value={verificador}
                    onChange={(e) => setVerificador(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 font-medium"
                  >
                    {verificadorOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option === 'Seleccionar...' ? 'Seleccionar Verificador...' : option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-2">
                  Observaciones Internas de División
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Escriba aquí cualquier observación interna sobre el trámite..."
                  className="w-full px-4 py-3 bg-white rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 font-medium resize-none min-h-[100px]"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-xl border border-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSeleccionar}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Guardar Asignación e Iniciar Trámite
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-rpi-gray/20 flex items-center justify-between text-xs text-gray-500 sticky bottom-0">
          <div>División Folios - Sistema RPI v1.0.0</div>
          <div>{new Date().toLocaleTimeString('es-ES')}</div>
        </div>
      </div>
    </div>
  )
}

const DivisionFolio: React.FC = () => {
  const [selectedTramite, setSelectedTramite] = useState<TramiteDivision | null>(null)

  // Manejar clic en botón de ver detalle
  const handleVerDetalle = (tramite: TramiteDivision) => {
    setSelectedTramite(tramite)
  }

  // Manejar cerrar modal
  const handleCloseModal = () => {
    setSelectedTramite(null)
  }

  // Manejar guardado
  const handleGuardar = () => {
    handleCloseModal()
    alert('¡Trámite iniciado con éxito!')
  }

  // Si no hay trámite seleccionado, mostrar tabla
  if (!selectedTramite) {
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
                  <h1 className="text-xl font-bold">Bandeja de División Folios</h1>
                  <p className="text-blue-200 text-sm">Gestión y Asignación de Trámites</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="flex items-center justify-end gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-emerald-200">Conectado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-6">
          {/* Métricas de División */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  En Asignación
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
                <p className="text-sm text-gray-600 font-medium">Trámites Pendientes</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Gavel className="w-6 h-6 text-purple-600" />
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                  Mes Actual
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
                <p className="text-sm text-gray-600 font-medium">Firmas Realizadas</p>
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
                <p className="text-3xl font-bold text-gray-900 mb-1">92%</p>
                <p className="text-sm text-gray-600 font-medium">Tasa de Avance</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Lock className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                  Bloqueados
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">9</p>
                <p className="text-sm text-gray-600 font-medium">Folios Congelados</p>
              </div>
            </div>
          </div>

          {/* Tabla de Trámites */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden">
            <div className="px-6 py-4 border-b border-rpi-gray/20 bg-gray-50/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Trámites en Bandeja</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {tramites_division.length} registros
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-rpi-gray/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      N° Orden
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Fecha Ingreso División
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Folios Afectados
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rpi-gray/100">
                  {tramites_division.map((tramite) => (
                    <tr
                      key={tramite.n_orden}
                      className="hover:bg-blue-50/30 transition-colors duration-200"
                    >
                      {/* N° Orden */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
                            <span className="text-blue-700 font-bold text-sm">
                              {tramite.n_orden.split('-').pop() || ''}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {tramite.n_orden}
                            </p>
                            <p className="text-xs text-gray-500">{tramite.tipo_tramite}</p>
                          </div>
                        </div>
                      </td>

                      {/* Fecha Ingreso División */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {new Date(tramite.fecha_ingreso_division).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                      </td>

                      {/* Folios Afectados */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-red-500" />
                          <div className="flex flex-wrap gap-1.5">
                            {tramite.folios.map((folio, index) => (
                              <span
                                key={index}
                                className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200"
                              >
                                {folio.folio}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Acciones */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleVerDetalle(tramite)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-6 bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Sistema de Registro de la Propiedad Inmobiliaria</span>
            </div>
            <div className="flex items-center gap-4">
              <span>División Folios</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </footer>

      </div>
    )
  }

  // Si hay trámite seleccionado, mostrar solo el modal
  return (
    <ModalDetalle
      tramite={selectedTramite}
      onClose={handleCloseModal}
      onGuardar={handleGuardar}
    />
  )
}

export default DivisionFolio
