import { useState } from 'react'
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  PenLine,
  PenTool,
  Check,
  ArrowRight,
  FolderOpen,
  FileCheck2,
  X
} from 'lucide-react'

// Tipos de firma
type FirmaStatus = {
  asesor: boolean
  inscriptor: boolean
  verificador: boolean
}

// Tipo de folio afectado
type FolioAfectado = {
  matricula: string
  es_digitalizado: boolean
  fecha_digitalizacion: string | null
}

// Tipo de trámite completo (para la vista detalle)
type tramite = typeof mockTramites[0]

// Mock Data - Array de trámites asignados
const mockTramites: {
  id_tramite: number
  fecha_mesa_entrada: string
  usuario_anterior: string
  sellado: boolean
  firmas: FirmaStatus
  equipo_tecnico: { asesor: string; inscriptor: string; verificador: string }
  observaciones_direccion: string | null
  folios_afectados: FolioAfectado[]
  estado?: 'Pendiente' | 'En Proceso' | 'Completado' | 'Rechazado'
}[] = [
  {
    id_tramite: 88001,
    fecha_mesa_entrada: '2024-03-15',
    usuario_anterior: 'Juan Pérez (Expediente)',
    sellado: true,
    firmas: { asesor: true, inscriptor: false, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: 'Revisar documentación de dominio - Requiere firma verificación',
    folios_afectados: [
      { matricula: '0-001-12345', es_digitalizado: true, fecha_digitalizacion: '2024-03-14' },
      { matricula: '0-001-12346', es_digitalizado: false, fecha_digitalizacion: null },
    ],
    estado: 'Pendiente'
  },
  {
    id_tramite: 88002,
    fecha_mesa_entrada: '2024-03-14',
    usuario_anterior: 'María García (Asunto)',
    sellado: true,
    firmas: { asesor: true, inscriptor: true, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: 'Completar digitalización de folios pendientes',
    folios_afectados: [
      { matricula: '0-002-23456', es_digitalizado: true, fecha_digitalizacion: '2024-03-13' },
      { matricula: '0-002-23457', es_digitalizado: true, fecha_digitalizacion: '2024-03-13' },
      { matricula: '0-002-23458', es_digitalizado: false, fecha_digitalizacion: null },
    ],
    estado: 'En Proceso'
  },
  {
    id_tramite: 88003,
    fecha_mesa_entrada: '2024-03-13',
    usuario_anterior: 'Pedro Ruiz (Inscripción)',
    sellado: false,
    firmas: { asesor: false, inscriptor: false, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: null,
    folios_afectados: [
      { matricula: '0-003-34567', es_digitalizado: true, fecha_digitalizacion: '2024-03-12' },
    ],
    estado: 'Pendiente'
  },
  {
    id_tramite: 88004,
    fecha_mesa_entrada: '2024-03-12',
    usuario_anterior: 'Laura Martínez (Trámite)',
    sellado: true,
    firmas: { asesor: true, inscriptor: true, verificador: true },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: 'Trámite completo - Listo para emisión',
    folios_afectados: [
      { matricula: '0-004-45678', es_digitalizado: true, fecha_digitalizacion: '2024-03-11' },
      { matricula: '0-004-45679', es_digitalizado: true, fecha_digitalizacion: '2024-03-11' },
    ],
    estado: 'Completado'
  },
  {
    id_tramite: 88005,
    fecha_mesa_entrada: '2024-03-11',
    usuario_anterior: 'Esteban Díaz (Folio)',
    sellado: false,
    firmas: { asesor: true, inscriptor: false, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: 'Documentación incompleta - Solicitar al usuario',
    folios_afectados: [
      { matricula: '0-005-56789', es_digitalizado: false, fecha_digitalizacion: null },
    ],
    estado: 'Rechazado'
  },
  {
    id_tramite: 88006,
    fecha_mesa_entrada: '2024-03-10',
    usuario_anterior: 'Sofía Torres (Recurso)',
    sellado: true,
    firmas: { asesor: true, inscriptor: true, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: 'Revisar firmas digitales antes de emitir',
    folios_afectados: [
      { matricula: '0-006-67890', es_digitalizado: true, fecha_digitalizacion: '2024-03-09' },
      { matricula: '0-006-67891', es_digitalizado: true, fecha_digitalizacion: '2024-03-09' },
      { matricula: '0-006-67892', es_digitalizado: true, fecha_digitalizacion: '2024-03-09' },
    ],
    estado: 'En Proceso'
  },
  {
    id_tramite: 88007,
    fecha_mesa_entrada: '2024-03-09',
    usuario_anterior: 'Jorge Sánchez (Inscripción)',
    sellado: false,
    firmas: { asesor: false, inscriptor: false, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: null,
    folios_afectados: [
      { matricula: '0-007-78901', es_digitalizado: true, fecha_digitalizacion: '2024-03-08' },
      { matricula: '0-007-78902', es_digitalizado: true, fecha_digitalizacion: '2024-03-08' },
    ],
    estado: 'Pendiente'
  },
  {
    id_tramite: 88008,
    fecha_mesa_entrada: '2024-03-08',
    usuario_anterior: 'Natalia Romero (Trámite)',
    sellado: true,
    firmas: { asesor: true, inscriptor: false, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: 'Pendiente revisión inscriptor',
    folios_afectados: [
      { matricula: '0-008-89012', es_digitalizado: false, fecha_digitalizacion: null },
    ],
    estado: 'Pendiente'
  },
  {
    id_tramite: 88009,
    fecha_mesa_entrada: '2024-03-07',
    usuario_anterior: 'Diego Castillo (Folio)',
    sellado: true,
    firmas: { asesor: true, inscriptor: true, verificador: true },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: 'Trámite finalizado - Emitir certificado',
    folios_afectados: [
      { matricula: '0-009-90123', es_digitalizado: true, fecha_digitalizacion: '2024-03-06' },
    ],
    estado: 'Completado'
  },
  {
    id_tramite: 88010,
    fecha_mesa_entrada: '2024-03-06',
    usuario_anterior: 'Paula Medina (Asunto)',
    sellado: false,
    firmas: { asesor: false, inscriptor: false, verificador: false },
    equipo_tecnico: {
      asesor: 'Carlos Méndez',
      inscriptor: 'Ana López',
      verificador: 'Roberto Fernández'
    },
    observaciones_direccion: null,
    folios_afectados: [
      { matricula: '0-010-01234', es_digitalizado: true, fecha_digitalizacion: '2024-03-05' },
      { matricula: '0-010-01235', es_digitalizado: false, fecha_digitalizacion: null },
      { matricula: '0-010-01236', es_digitalizado: true, fecha_digitalizacion: '2024-03-05' },
    ],
    estado: 'Pendiente'
  },
]

export default function MisTramites() {
  const [tramiteActivo, setTramiteActivo] = useState<tramite | null>(null)
  const [modalAbierto, setModalAbierto] = useState<FolioAfectado | null>(null)

  // Función para obtener icono de firma según estado
  const getFirmaIcon = (firmado: boolean): React.ReactNode => {
    return firmado ? (
      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
    ) : (
      <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0" />
    )
  }

  // Función para obtener estado de trámite
  const getEstadoBadge = (estado: string): string => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'En Proceso':
        return 'bg-blue-100 text-blue-800'
      case 'Completado':
        return 'bg-green-100 text-green-800'
      case 'Rechazado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Manejo del cierre de detalle
  const handleCerrarDetalle = () => {
    setTramiteActivo(null)
    setModalAbierto(null)
  }

  // Manejo de modal
  const handleVerPDF = (folio: FolioAfectado) => {
    setModalAbierto(folio)
  }

  const handleCerrarModal = () => {
    setModalAbierto(null)
  }

  // Cálculo de progreso de trámites por estado
  const estadisticas: Record<string, number> = mockTramites.reduce((acc, tr) => {
    if (tr.estado) {
      (acc as Record<string, number>)[tr.estado] = ((acc as Record<string, number>)[tr.estado] || 0) + 1
    }
    return acc
  }, { Pendiente: 0, 'En Proceso': 0, Completado: 0, Rechazado: 0 })

  // Encontrar trámite por ID
  const encontrarTramite = (id: number) => mockTramites.find(t => t.id_tramite === id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-6 flex items-center justify-between shadow-inner print:hidden">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <FileText className="w-7 h-7 text-white/80" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mis Trámites</h1>
            <p className="text-blue-100/80 text-sm">Gestión del Equipo Técnico - Asesor, Inscriptor, Verificador</p>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="hidden lg:flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-blue-100/70">
            <Clock className="w-4 h-4" />
            <span>Trámites: {mockTramites.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-xl shadow-sm border border-rpi-gray/20 print:border-t-rpi-gray/100">
        {tramiteActivo && encontrarTramite(tramiteActivo.id_tramite) ? (
          /* VISTA DETALLE */
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Botón Volver */}
            <button
              onClick={handleCerrarDetalle}
              className="mb-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a lista de trámites
            </button>

            <div className="space-y-6">
              {/* STEPPER SUPERIOR */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-rpi-gray/20 print:border-r-rpi-gray/100">
                <div className="flex items-center justify-between relative">
                  {/* Línea conectora */}
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 -z-10"></div>

                  {/* Calificación - Asesor */}
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg min-w-[180px] transition-all duration-300 ${
                    tramiteActivo.firmas.asesor
                      ? 'bg-white shadow-sm border border-rpi-gray/20'
                      : tramiteActivo.firmas.asesor === false
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-white/50 border border-blue-200/30'
                  }`}>
                    <div className={`p-2 rounded-lg ${
                      tramiteActivo.firmas.asesor
                        ? 'bg-green-100 text-green-600'
                        : tramiteActivo.firmas.asesor === false
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <PenLine className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-0.5">Calificación</p>
                      <p className={`text-sm font-bold ${
                        tramiteActivo.firmas.asesor ? 'text-green-700' :
                        tramiteActivo.firmas.asesor === false ? 'text-red-700' : 'text-blue-700'
                      }`}>
                        {tramiteActivo.equipo_tecnico.asesor}
                      </p>
                    </div>
                    {tramiteActivo.firmas.asesor && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  {/* Flecha conectora */}
                  <div className="flex items-center">
                    {tramiteActivo.firmas.asesor ? (
                      <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    ) : tramiteActivo.firmas.asesor === false ? (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-blue-300 rotate-45" />
                      </div>
                    )}
                  </div>

                  {/* Inscripción - Inscriptor */}
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg min-w-[180px] transition-all duration-300 ${
                    tramiteActivo.firmas.inscriptor
                      ? 'bg-white shadow-sm border border-rpi-gray/20'
                      : tramiteActivo.firmas.inscriptor === false
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-white/50 border border-blue-200/30'
                  }`}>
                    <div className={`p-2 rounded-lg ${
                      tramiteActivo.firmas.inscriptor
                        ? 'bg-green-100 text-green-600'
                        : tramiteActivo.firmas.inscriptor === false
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <PenTool className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-0.5">Inscripción</p>
                      <p className={`text-sm font-bold ${
                        tramiteActivo.firmas.inscriptor ? 'text-green-700' :
                        tramiteActivo.firmas.inscriptor === false ? 'text-red-700' : 'text-blue-700'
                      }`}>
                        {tramiteActivo.equipo_tecnico.inscriptor}
                      </p>
                    </div>
                    {tramiteActivo.firmas.inscriptor && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  {/* Flecha conectora */}
                  <div className="flex items-center">
                    {tramiteActivo.firmas.inscriptor ? (
                      <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    ) : tramiteActivo.firmas.inscriptor === false ? (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-blue-300 rotate-45" />
                      </div>
                    )}
                  </div>

                  {/* Verificación - Verificador */}
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg min-w-[180px] transition-all duration-300 ${
                    tramiteActivo.firmas.verificador
                      ? 'bg-white shadow-sm border border-rpi-gray/20'
                      : tramiteActivo.firmas.verificador === false
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-white/50 border border-blue-200/30'
                  }`}>
                    <div className={`p-2 rounded-lg ${
                      tramiteActivo.firmas.verificador
                        ? 'bg-green-100 text-green-600'
                        : tramiteActivo.firmas.verificador === false
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-0.5">Verificación</p>
                      <p className={`text-sm font-bold ${
                        tramiteActivo.firmas.verificador ? 'text-green-700' :
                        tramiteActivo.firmas.verificador === false ? 'text-red-700' : 'text-blue-700'
                      }`}>
                        {tramiteActivo.equipo_tecnico.verificador}
                      </p>
                    </div>
                    {tramiteActivo.firmas.verificador && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna 1: Información Básica */}
                <div className="bg-white p-5 rounded-xl border border-rpi-gray/20 print:border-r-rpi-gray/100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rpi-blue" />
                    Información
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Usuario Anterior</p>
                      <p className="text-sm font-medium text-gray-900">{tramiteActivo.usuario_anterior}</p>
                    </div>
                    {tramiteActivo.observaciones_direccion && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-800 font-medium mb-1">Observaciones de Dirección</p>
                        <p className="text-sm text-yellow-900 italic">{tramiteActivo.observaciones_direccion}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500">Fecha Mesa de Entradas</p>
                      <p className="text-sm font-medium text-gray-900">{tramiteActivo.fecha_mesa_entrada}</p>
                    </div>
                  </div>
                </div>

                {/* Columna 2: Estado de Firmas (duplicado del stepper para detalle completo) */}
                <div className="bg-white p-5 rounded-xl border border-rpi-gray/20 print:border-r-rpi-gray/100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rpi-blue" />
                    Firma Digital - Equipo Técnico
                  </h3>
                  <div className="space-y-3">
                    {/* Asesor */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-rpi-gray/20 bg-rpi-blue/5">
                      <div className="flex items-center gap-2">
                        <PenLine className={`w-5 h-5 ${tramiteActivo.firmas.asesor ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className={`text-sm font-medium ${tramiteActivo.firmas.asesor ? 'text-gray-900' : 'text-gray-500'}`}>
                          Asesor
                        </span>
                      </div>
                      {getFirmaIcon(tramiteActivo.firmas.asesor)}
                    </div>

                    {/* Inscriptor */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-rpi-gray/20 bg-rpi-blue/5">
                      <div className="flex items-center gap-2">
                        <PenTool className={`w-5 h-5 ${tramiteActivo.firmas.inscriptor ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className={`text-sm font-medium ${tramiteActivo.firmas.inscriptor ? 'text-gray-900' : 'text-gray-500'}`}>
                          Inscriptor
                        </span>
                      </div>
                      {getFirmaIcon(tramiteActivo.firmas.inscriptor)}
                    </div>

                    {/* Verificador */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-rpi-gray/20 bg-rpi-blue/5">
                      <div className="flex items-center gap-2">
                        <Check className={`w-5 h-5 ${tramiteActivo.firmas.verificador ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className={`text-sm font-medium ${tramiteActivo.firmas.verificador ? 'text-gray-900' : 'text-gray-500'}`}>
                          Verificador
                        </span>
                      </div>
                      {getFirmaIcon(tramiteActivo.firmas.verificador)}
                    </div>
                  </div>
                </div>

                {/* Columna 3: Equipo Técnico Asignado */}
                <div className="bg-white p-5 rounded-xl border border-rpi-gray/20 print:border-r-rpi-gray/100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-rpi-blue" />
                    Equipo Técnico
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Asesor</span>
                      <span className="text-sm font-medium text-gray-900">{tramiteActivo.equipo_tecnico.asesor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Inscriptor</span>
                      <span className="text-sm font-medium text-gray-900">{tramiteActivo.equipo_tecnico.inscriptor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Verificador</span>
                      <span className="text-sm font-medium text-gray-900">{tramiteActivo.equipo_tecnico.verificador}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Folios Afectados */}
              <div className="bg-white p-5 rounded-xl border border-rpi-gray/20 print:border-r-rpi-gray/100">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-rpi-blue" />
                  Folios Afectados
                </h3>
                <div className="border border-rpi-gray/20 rounded-lg overflow-hidden">
                  {tramiteActivo.folios_afectados.map((folio: FolioAfectado) => (
                    <div
                      key={folio.matricula}
                      className="border-b border-rpi-gray/100 last:border-b-0 hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Matrícula {folio.matricula}</p>
                            <p className="text-xs text-gray-500">
                              {folio.es_digitalizado ? (
                                <span className="text-green-600">✓ Digitalizado el {folio.fecha_digitalizacion}</span>
                              ) : (
                                <span className="text-red-600">✗ Pendiente digitalización</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {folio.es_digitalizado && (
                            <button
                              onClick={() => handleVerPDF(folio)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                            >
                              <FileCheck2 className="w-3.5 h-3.5" />
                              Ver Digitalizado
                            </button>
                          )}
                          <button
                            onClick={() => handleVerPDF(folio)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            Ver PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Acciones */}
                {tramiteActivo.estado !== 'Completado' && (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => window.open('#', '_blank')}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Trabajar en Trámite
                    </button>
                  </div>
                )}
              </div>

              {/* Botón Volver duplicado en caso de que sea necesario */}
              <div className="flex justify-end">
                <button
                  onClick={handleCerrarDetalle}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver a la lista
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VISTA LISTADO */
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-rpi-gray/20 shadow-sm">
                <p className="text-xs text-rpi-gray/500 uppercase tracking-wide">Pendiente</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{estadisticas.Pendiente}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-rpi-gray/20 shadow-sm">
                <p className="text-xs text-rpi-gray/500 uppercase tracking-wide">En Proceso</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{estadisticas['En Proceso']}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-rpi-gray/20 shadow-sm">
                <p className="text-xs text-rpi-gray/500 uppercase tracking-wide">Completado</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{estadisticas.Completado}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-rpi-gray/20 shadow-sm">
                <p className="text-xs text-rpi-gray/500 uppercase tracking-wide">Rechazado</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{estadisticas.Rechazado}</p>
              </div>
            </div>

            {/* Tabla de Trámites */}
            <div className="bg-white rounded-xl border border-rpi-gray/20 overflow-hidden print:border-r-rpi-gray/100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-rpi-gray/20">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ingreso Mesa</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Usuario Anterior</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Sellado</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Firmas</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-rpi-gray/100">
                    {mockTramites.map((tr) => (
                      <tr
                        key={tr.id_tramite}
                        onClick={() => setTramiteActivo({ ...tr })}
                        className="hover:bg-blue-50/50 cursor-pointer transition-colors print:cursor-default"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 font-mono">{tr.id_tramite}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{tr.fecha_mesa_entrada}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-700 max-w-xs truncate" title={tr.usuario_anterior}>
                            {tr.usuario_anterior}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              tr.sellado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {tr.sellado && <CheckCircle2 className="w-3 h-3" />}
                            {tr.sellado ? 'Sí' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-1.5">
                            <div
                              className={`p-1 rounded-lg ${
                                tr.firmas.asesor
                                  ? 'bg-green-100'
                                  : tr.firmas.asesor === false
                                  ? 'bg-red-100'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <PenLine className={`w-4 h-4 ${tr.firmas.asesor ? 'text-green-600' : tr.firmas.asesor === false ? 'text-red-600' : 'text-gray-400'}`} />
                            </div>
                            <div
                              className={`p-1 rounded-lg ${
                                tr.firmas.inscriptor
                                  ? 'bg-green-100'
                                  : tr.firmas.inscriptor === false
                                  ? 'bg-red-100'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <PenTool className={`w-4 h-4 ${tr.firmas.inscriptor ? 'text-green-600' : tr.firmas.inscriptor === false ? 'text-red-600' : 'text-gray-400'}`} />
                            </div>
                            <div
                              className={`p-1 rounded-lg ${
                                tr.firmas.verificador
                                  ? 'bg-green-100'
                                  : tr.firmas.verificador === false
                                  ? 'bg-red-100'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <Check className={`w-4 h-4 ${tr.firmas.verificador ? 'text-green-600' : tr.firmas.verificador === false ? 'text-red-600' : 'text-gray-400'}`} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoBadge(tr.estado || 'Pendiente')}`}>
                            {tr.estado || 'Pendiente'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <button
                            onClick={() => setTramiteActivo({ ...tr })}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                          >
                            Trabajar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resumen de Trámites */}
              <div className="bg-gray-50 border-rpi-gray/20 px-4 py-3 text-xs text-gray-600 border-t print:border-t-r-rpi-gray/100">
                Total de trámites asignados: {mockTramites.length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para visualización de PDF */}
      {modalAbierto && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
          onClick={handleCerrarModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Documento: {modalAbierto.matricula}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {modalAbierto.es_digitalizado
                      ? `Digitalizado el ${modalAbierto.fecha_digitalizacion}`
                      : 'Pendiente digitalización'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCerrarModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-6 overflow-auto">
              {modalAbierto.es_digitalizado ? (
                <div className="w-full h-full min-h-[400px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      Contenedor del PDF digitalizado
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      (Placeholder para visualización del documento)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full min-h-[400px] bg-red-50 rounded-lg flex items-center justify-center border-2 border-dashed border-red-200">
                  <div className="text-center">
                    <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="text-red-700 font-medium">
                      DOCUMENTO PENDIENTE DIGITALIZACIÓN
                    </p>
                    <p className="text-red-600 text-sm mt-2">
                      Matrícula {modalAbierto.matricula} requiere ser digitalizado antes de visualizar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
