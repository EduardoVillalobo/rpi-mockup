import { useEffect, useState } from 'react'
import { FileText, Building2, CheckCircle2, FileCheck, Percent } from 'lucide-react'

type Nomenclatura = {
  departamento?: string
  distrito?: string
  seccion?: string
  parcela?: string
  manzana?: string
}

type TitularidadDominio = {
  texto?: string
  proporcion?: string
  tipo_procedimiento?: string
}

type Gravamen = {
  texto?: string
  tipo_procedimiento?: string
}

type Certificado = {
  texto?: string
  tipo_procedimiento?: string
}

type Document = {
  archivo?: string
  matricula?: string
  departamento_nombre?: string
  antecedente_dominio?: string
  nomenclatura?: Nomenclatura
  titulares_dni?: string[]
  titularidad_dominio?: TitularidadDominio[]
  superficiario?: any[]
  gravamenes?: Gravamen[]
  cancelaciones?: any[]
  observaciones?: string | string[]
  certificados?: Certificado[]
}

export default function FolioDigital() {
  const [folioData, setFolioData] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFolio = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/folios/88000/')
        if (!response.ok) throw new Error('Error al obtener folio')
        const data = await response.json()
        setFolioData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchFolio()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-rpi-blue border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Cargando folio...</p>
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

  if (!folioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No se encontraron datos del folio</p>
        </div>
      </div>
    )
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
                <p className="text-xl font-bold text-white font-mono">{folioData?.matricula || '---'}</p>
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                <p className="text-xs text-emerald-200/80 uppercase">Estado</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-emerald-100">{folioData?.departamento_nombre || 'Activo'}</p>
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
              <p className="text-sm text-rpi-gray/60 mt-1">{folioData?.titularidad_dominio?.length || 0} asientos registrales</p>
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
              {folioData?.titularidad_dominio?.map((asiento, index) => (
                <a
                  key={index}
                  href={`#rubro-${asiento.tipo_procedimiento?.toLowerCase().replace(/ /g, '-')}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-rpi-gray/100 hover:text-gray-900 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rpi-gray/10 flex items-center justify-center group-hover:bg-rpi-blue/10 transition-colors">
                    <span className="text-sm font-semibold text-rpi-blue">{index + 1}</span>
                  </div>
                  <span className="font-medium">{asiento?.tipo_procedimiento || asiento?.texto?.substring(0, 40) || 'Asiento'}</span>
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
                Folio <span className="text-rpi-blue font-mono">{folioData?.matricula || '---'}</span>
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
                        <p className="text-gray-900 font-mono font-medium">{folioData?.matricula || '---'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                        Departamento
                      </label>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-rpi-blue/60" />
                        <p className="text-gray-900 font-medium">{folioData?.nomenclatura?.departamento || '---'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                        Antecedente Dominio
                      </label>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <p className="text-gray-900">{folioData?.antecedente_dominio || '---'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                        Titulares DNI
                      </label>
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-rpi-blue/60" />
                        <p className="text-gray-900 text-rpi-blue font-medium">{folioData?.titulares_dni?.length || 0} titulares</p>
                      </div>
                    </div>
                    {folioData?.nomenclatura?.seccion && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                          Sección
                        </label>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-rpi-blue/60" />
                          <p className="text-gray-900 font-mono">{folioData.nomenclatura.seccion}</p>
                        </div>
                      </div>
                    )}
                    {folioData?.nomenclatura?.parcela && (
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-rpi-gray/60 uppercase tracking-wide">
                          Parcela
                        </label>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-rpi-blue/60" />
                          <p className="text-gray-900 font-mono">{folioData.nomenclatura.parcela}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Asientos registrales */}
            {folioData?.titularidad_dominio?.map((asiento, index) => {
              return (
                <section
                  key={index}
                  id={`rubro-${asiento.tipo_procedimiento?.toLowerCase().replace(/ /g, '-')}`}
                  className="mb-8 print:mb-4"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-rpi-gray/20 overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-rpi-blue to-blue-700">
                      <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="tracking-tight">{asiento?.tipo_procedimiento || asiento?.texto?.substring(0, 30) || 'Asiento'}</span>
                      </h2>
                    </div>
                    <div className="p-6">
                      {/* Descripción completa del asiento */}
                      <div className="mb-6 p-4 bg-rpi-gray/50 rounded-xl border border-rpi-gray/20">
                        <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide block mb-2">
                          Descripción
                        </label>
                        <p className="text-gray-900 font-medium text-sm leading-relaxed whitespace-pre-wrap">
                          {asiento?.texto || 'Sin descripción'}
                        </p>
                      </div>

                      {/* Proporción */}
                      {asiento?.proporcion && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide">
                              Proporción
                            </label>
                            <div className="flex items-center gap-2">
                              <Percent className="w-5 h-5 text-rpi-blue" />
                              <p className="text-2xl font-bold text-rpi-blue">{asiento?.proporcion}%</p>
                            </div>
                          </div>
                          <div className="w-full bg-gradient-to-r from-rpi-gray/30 to-rpi-gray/20 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-rpi-blue to-blue-600 h-3 rounded-full transition-all shadow-inner"
                              style={{ width: `${Math.min(parseFloat(asiento?.proporcion) || 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Información adicional */}
                      <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
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

            {/* Gravámenes */}
            {folioData?.gravamenes && folioData.gravamenes.length > 0 && (
              <section className="mb-8 print:mb-4">
                <div className="bg-white rounded-2xl shadow-sm border border-red-200/30 overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-red-800 to-red-900">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 12c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <span className="tracking-tight">Gravamenes</span>
                    </h2>
                  </div>
                  <div className="p-6">
                    {folioData.gravamenes.map((gravamen, index) => (
                      <div key={index} className="mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 12c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-red-900 mb-1">{gravamen?.tipo_procedimiento || 'Gravamen'}</p>
                            <p className="text-xs text-red-700 leading-relaxed whitespace-pre-wrap">
                              {gravamen?.texto || ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Observaciones */}
            {folioData?.observaciones && (
              <section className="mb-8 print:mb-4">
                <div className="bg-white rounded-2xl shadow-sm border border-blue-200/50 overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-900">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 10h12l3 2c2.254-2.63 1.95-6.574
" />
                        </svg>
                      </div>
                      <span className="tracking-tight">Observaciones</span>
                    </h2>
                  </div>
                  <div className="p-6">
                    {Array.isArray(folioData.observaciones) ? (
                      folioData.observaciones.map((obs, index) => (
                        <p key={index} className="text-sm text-gray-700 bg-blue-50 rounded-lg p-3 border border-blue-100 mb-3 whitespace-pre-wrap">
                          {obs}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-700 bg-blue-50 rounded-lg p-3 border border-blue-100 whitespace-pre-wrap">
                        {folioData.observaciones}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Certificados */}
            {folioData?.certificados && folioData.certificados.length > 0 && (
              <section className="mb-8 print:mb-4">
                <div className="bg-white rounded-2xl shadow-sm border border-blue-200/50 overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-900">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="tracking-tight">Certificados</span>
                    </h2>
                  </div>
                  <div className="p-6">
                    {folioData.certificados.map((cert, index) => (
                      <div key={index} className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-blue-900 mb-1">Cert. {cert?.texto?.split('Cert. nº')[1]?.split('-')[0] || index + 1}</p>
                            <p className="text-xs text-blue-700 leading-relaxed whitespace-pre-wrap">
                              {cert?.texto || ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

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
                    Generado el {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
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