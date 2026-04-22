import { useEffect, useState } from 'react'
import { FileText, Building2, CheckCircle2, FileCheck, User, Calendar, Percent } from 'lucide-react'

interface Asiento {
  rubro: string
  fecha: string
  titular: string
  porcentaje: number
}

interface FolioData {
  matricula: string
  departamento: string
  estado: string
  asientos: Asiento[]
}

export default function FolioDigital() {
  const [folios, setFolios] = useState<FolioData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFolio, setSelectedFolio] = useState<FolioData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFolios = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/folios/88000/')
        if (!response.ok) throw new Error('Error al obtener folio')
        const data = await response.json()
        setFolios([data])
        setSelectedFolio(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchFolios()
  }, [])

  const formatFecha = (fecha: string) => {
    try {
      return new Date(fecha).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return fecha
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-rpi-blue border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Cargando reporte...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center">
          <FileText className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  if (!selectedFolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No se encontraron datos del folio</p>
        </div>
      </div>
    )
  }

  const getRubroLabel = (rubro: string): string => {
    const map: Record<string, string> = {
      'titularidad': 'Titularidad',
      'gravamen': 'Gravámenes',
      'compraventa': 'Compraventa',
      'constitucion-hipoteca': 'Constitución de Hipoteca',
      'permuta': 'Permuta',
      'renuncia': 'Renuncia',
      'donacion': 'Donación',
      'garantia': 'Garantía'
    }
    return map[rubro.toLowerCase()] || rubro.charAt(0).toUpperCase() + rubro.slice(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 print:bg-white">
      {/* Header Principal */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <FileText className="w-8 h-8 text-blue-200" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Folio Digital</h1>
                <p className="text-blue-200/80 mt-1">Asiento Registral</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <p className="text-sm text-blue-100">Matrícula:</p>
                <p className="text-xl font-bold text-white font-mono">{selectedFolio.matricula}</p>
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                <p className="text-xs text-emerald-200/80 uppercase">Estado</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-emerald-100">{selectedFolio.estado}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 print:py-4 print:px-0">
        <div className="flex flex-col lg:flex-row gap-6 print:block">
          {/* Sidebar - Sticky */}
          <div className="sticky top-4 h-fit lg:w-72 bg-white rounded-2xl shadow-lg border border-rpi-gray/20 print:hidden">
            <div className="p-5 border-b border-rpi-gray/100 bg-gradient-to-r from-rpi-blue/50 to-blue-50/30">
              <h2 className="text-lg font-bold text-gray-900">Índice del Documento</h2>
              <p className="text-sm text-rpi-gray/60 mt-1">{selectedFolio.asientos.length} secciones</p>
            </div>

            <nav className="p-4 space-y-1">
              <a
                href="#datos-generales"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-rpi-gray/100 hover:text-gray-900 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-rpi-blue/10 flex items-center justify-center group-hover:bg-rpi-blue/20 transition-colors">
                  <FileText className="w-4 h-4 text-rpi-blue" />
                </div>
                <span className="font-medium">Datos del Folio</span>
              </a>
              {selectedFolio.asientos.map((asiento, index) => (
                <a
                  key={index}
                  href={`#rubro-${asiento.rubro.toLowerCase().replace(/ /g, '-')}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-rpi-gray/100 hover:text-gray-900 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rpi-gray/10 flex items-center justify-center group-hover:bg-rpi-blue/10 transition-colors">
                    <span className="text-sm font-semibold text-rpi-blue">{index + 1}</span>
                  </div>
                  <span className="font-medium">{getRubroLabel(asiento.rubro)}</span>
                </a>
              ))}
            </nav>

            <div className="p-4 border-t border-rpi-gray/100 bg-rpi-gray/5">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <p className="text-xs text-rpi-gray/60">Sistema Online</p>
              </div>
              <p className="text-xs text-rpi-gray/50 mt-2 text-center">RPI Catamarca • v1.0</p>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="flex-1 min-w-0 print:sticky print:top-4 print:h-fit">
            {/* Header del contenido */}
            <div className="flex items-center gap-2 mb-6 print:hidden">
              <Building2 className="w-6 h-6 text-rpi-blue" />
              <h2 className="text-xl font-bold text-gray-900">
                Folio <span className="text-rpi-blue font-mono">{selectedFolio.matricula}</span>
              </h2>
            </div>

            {/* Sección de Datos Generales */}
            <section id="datos-generales" className="mb-8 print:mb-4">
              <div className="bg-white rounded-2xl shadow-sm border border-rpi-gray/20 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-rpi-blue to-blue-700">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    Datos del Folio
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                        Folio Registral
                      </label>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rpi-blue/60" />
                        <p className="text-gray-900 font-mono font-medium">{selectedFolio.matricula}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                        Departamento
                      </label>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-rpi-blue/60" />
                        <p className="text-gray-900 font-medium">{selectedFolio.departamento}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                        Estado
                      </label>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <p className="text-gray-900">{selectedFolio.estado}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                        Total Asientos
                      </label>
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-rpi-blue/60" />
                        <p className="text-gray-900 text-rpi-blue font-medium">{selectedFolio.asientos.length} asientos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Secciones por Rubro */}
            {selectedFolio.asientos.map((asiento, index) => {
              const label = getRubroLabel(asiento.rubro)
              return (
                <section
                  key={index}
                  id={`rubro-${asiento.rubro.toLowerCase().replace(/ /g, '-')}`}
                  className="mb-8 print:mb-4"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-rpi-gray/20 overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-rpi-blue to-blue-700">
                      <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="tracking-tight">{label}</span>
                      </h2>
                    </div>
                    <div className="p-6">
                      {/* Información del titular */}
                      <div className="flex items-start gap-4 mb-6 p-4 bg-rpi-gray/50 rounded-xl">
                        <div className="w-12 h-12 bg-gradient-to-br from-rpi-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide block mb-1">
                            Titularidad
                          </label>
                          <p className="text-gray-900 font-semibold text-lg">{asiento.titular}</p>
                        </div>
                      </div>

                      {/* Detalles del asiento */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gradient-to-br from-rpi-gray/50 to-rpi-gray/30 rounded-xl p-5 border border-rpi-gray/20">
                          <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide block mb-2">
                            Tipo de Acto
                          </label>
                          <p className="text-gray-900 font-medium text-base leading-relaxed">{asiento.rubro}</p>
                        </div>
                        <div className="bg-gradient-to-br from-rpi-gray/50 to-rpi-gray/30 rounded-xl p-5 border border-rpi-gray/20">
                          <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide block mb-2">
                            Fecha de Inscripción
                          </label>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-rpi-blue" />
                            <p className="text-gray-900 text-sm leading-relaxed">{formatFecha(asiento.fecha)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Porcentaje */}
                      <div className="bg-gradient-to-br from-rpi-gray/50 to-rpi-gray/30 rounded-xl p-5 border border-rpi-gray/20">
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide">
                            Porcentaje de Dominio
                          </label>
                          <div className="flex items-center gap-2">
                            <Percent className="w-5 h-5 text-rpi-blue" />
                            <p className="text-2xl font-bold text-rpi-blue">{asiento.porcentaje}%</p>
                          </div>
                        </div>
                        <div className="w-full bg-gradient-to-r from-rpi-gray/30 to-rpi-gray/20 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-rpi-blue to-blue-600 h-3 rounded-full transition-all shadow-inner"
                            style={{ width: `${asiento.porcentaje}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Información adicional */}
                      <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-800 flex items-start gap-2">
                          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>
                            Documento certificado digitalmente. Este asiento registral forma parte del registro de la propiedad de la Provincia de Catamarca.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )
            })}

            {/* Footer del contenido */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-2xl border border-blue-200/50 p-6 print:hidden">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-rpi-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Información del Sistema
                  </h3>
                  <p className="text-sm text-rpi-gray/70 leading-relaxed">
                    Este reporte ha sido generado automáticamente por el sistema RPI Catamarca. Todos los datos están protegidos y certificados.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-rpi-gray/500 uppercase tracking-wide">Versión</p>
                  <p className="text-sm font-semibold text-rpi-blue">1.0.0</p>
                  <p className="text-xs text-rpi-gray/500 mt-1">
                    Generado el {formatFecha(new Date().toISOString())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}