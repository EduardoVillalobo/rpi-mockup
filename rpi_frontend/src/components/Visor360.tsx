import { useEffect, useState } from 'react'
import { FileText, Search, ArrowDownToDot, Percent, Building2, Calendar, CheckCircle2, FileBadge, FileDigit, Plus, MapPin } from 'lucide-react'

type Nomenclatura = {
  departamento?: string
  distrito?: string
  seccion?: string
  parcela?: string
  manzana?: string
  plano?: string
  superficie_plano?: string
  fecha_apertura?: string
  descripcion?: string
}

type TitularidadDominio = {
  texto?: string
  proporcion?: string
  tipo_procedimiento?: string
}

type Superficiario = {
  superficie?: string
  porcentaje?: string
  unidad?: string
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
  superficiario?: Superficiario[]
  gravamenes?: Gravamen[]
  cancelaciones?: any[]
  observaciones?: string | string[]
  certificados?: Certificado[]
}

export default function Visor360() {
  const [folioData, setFolioData] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFolioData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/folios/88000/')
        if (response.ok) {
          const data = await response.json()
          setFolioData(data)
        }
      } catch (err) {
        console.warn('Error cargando datos del folio:', err)
      } finally {
        setLoading(false)
      }
    }

    loadFolioData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rpi-blue/30 border-t-rpi-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando visor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-6">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Botón Crear Nuevo - Navega a la vista de nuevo trámite */}
            <button
              onClick={() => alert('Navegar a búsqueda de folio digitalizado')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Buscar Folio digitalizado</span>
            </button>
          </div>
        </div>
        {/* Header principal */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-6 flex items-center justify-between rounded-t-2xl shadow-inner print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileBadge className="w-7 h-7 text-white/80" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Visor Folio Digital</h1>
              <p className="text-blue-100/80 text-sm">Folio Certificado Digitalmente</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm text-blue-100/70">
            <ArrowDownToDot className="w-4 h-4" />
            <span>Ver otro documento</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-b-xl shadow-inner border border-rpi-gray/20 border-t-0 print:border-t-rpi-gray/100">
          <div className="flex flex-col md:flex-row">
            {/* Panel Izquierdo: Información del folio */}
            <div className="w-full md:w-1/4 bg-gradient-to-br from-blue-50 to-white p-6 border-r border-rpi-gray/20 print:border-r-rpi-gray/100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-rpi-blue" />
                </div>
                <div>
                  <p className="text-xs text-rpi-gray/500 uppercase tracking-wide font-medium">Matricula</p>
                  <p className="text-gray-900 font-mono font-semibold">{folioData?.matricula || 'XXXXX'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-rpi-blue" />
                </div>
                <div>
                  <p className="text-xs text-rpi-gray/500 uppercase tracking-wide font-medium">Antecedente</p>
                  <p className="text-gray-900 font-mono font-semibold">{folioData?.antecedente_dominio || 'XXXXX'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-rpi-blue" />
                </div>
                <div>
                  <p className="text-xs text-rpi-gray/500 uppercase tracking-wide font-medium">Departamento</p>
                  <p className="text-gray-900 font-mono font-semibold">{folioData?.departamento_nombre || 'XXXXX'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-rpi-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-rpi-gray/500 uppercase tracking-wide font-medium">Superficie S/titulo</p>
                    <p className="text-gray-900 font-medium">{'XXXXXX'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-rpi-gray/500 uppercase tracking-wide font-medium">Estado</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <p className="text-gray-900 font-medium">Activo</p>
                    </div>
                  </div>
                </div>
              </div>

              {folioData?.superficiario && folioData.superficiario.length > 0 && (
                <div className="mt-6 pt-6 border-t border-rpi-gray/100 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Superficiales</h3>
                  <div className="space-y-2">
                    {folioData.superficiario.map((superficiario, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{index + 1}</span>
                        <span className="text-gray-700 font-medium">{superficiario?.superficie || 'No especificado'} {superficiario?.unidad || 'm²'}</span>
                        <span className="text-emerald-600 font-bold">{superficiario?.porcentaje}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {folioData?.gravamenes && folioData.gravamenes.length > 0 && (
                <div className="mt-6 pt-6 border-t border-rpi-gray/100">
                  <h3 className="text-sm font-semibold text-red-800 mb-3">Gravamenes</h3>
                  {folioData.gravamenes.map((gravamen, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-xs text-gray-500">{index + 1}</p>
                      <p className="text-xs text-red-700">{gravamen.texto || gravamen.tipo_procedimiento || ''}</p>
                    </div>
                  ))}
                </div>
              )}

              {folioData?.cancelaciones && folioData.cancelaciones.length > 0 && (
                <div className="mt-6 pt-6 border-t border-rpi-gray/100">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Cancelaciones</h3>
                  <div className="space-y-2">
                    {folioData.cancelaciones.map((cancelacion, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-gray-600">{cancelacion?.tipo_procedimiento || 'Cancelación'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* Panel Derecho: Visualización principal */}
            <div className="w-full md:w-3/4 p-6 overflow-hidden">

              {/* Header del visor */}
              <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-6 flex items-center justify-between rounded-lg shadow-inner mb-6 print:hidden">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <FileDigit className="w-7 h-7 text-white/80" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">MATRICULA {folioData?.matricula || 'XXXXXX'}</h2>
                    <p className="text-blue-100/70 text-sm">Antecedente de Dominio: {folioData?.antecedente_dominio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{folioData?.titularidad_dominio?.length || 0}</div>
                    <div className="text-xs text-blue-100/70">Asientos</div>
                  </div>
                </div>
              </div>

              {/* Panel de Informacion Catastral */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Información Catastral
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {/* Codigo Departamento */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Departamento
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.departamento || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>

                    {/* Codigo Distrito */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Distrito
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.distrito || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                    {/* Codigo Seccion */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sección
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.seccion || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>

                    {/* Codigo Parcela */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parcela
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.parcela || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                    {/* Codigo Manzana */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Manzana
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.manzana || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    {/* Plano */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Plano
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.plano || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>

                    {/* Superficie según Plano */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Superficie según Plano
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.superficie_plano || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>

                    {/* Fecha de apertura */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fecha de Apertura
                      </label>
                      <input
                        type="text"
                        value={folioData?.nomenclatura?.fecha_apertura || '0'}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción de Inmueble
                    </label>
                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex-1">
                      <p className="text-sm text-slate-700 leading-relaxed">{folioData?.nomenclatura?.descripcion || 'Sin descripción'}</p>
                      <p className="text-xs text-rpi-gray/600">{folioData?.nomenclatura?.descripcion?.substring(0, 100) || 'Sin descripción'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Asientos del folio */}
              {folioData?.titularidad_dominio && folioData.titularidad_dominio.length > 0 && (
                <div className="space-y-6">
                  {/* TITULARIDAD SOBRE EL DOMINIO */}
                  <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      TITULARIDAD SOBRE EL DOMINIO
                    </h3>
                    <div className="space-y-4">
                      {folioData.titularidad_dominio.map((asiento, index) => (
                        <div key={index} className="relative max-w-4xl mx-auto font-sans">
                          <div
                            className="absolute -top-6 right-8 z-50 flex items-center bg-white border border-slate-300 shadow-xl rounded-lg p-1.5 gap-1 print:hidden">

                            <div className="group relative">
                              <button className="p-2 hover:bg-blue-100 text-slate-600 hover:text-blue-700 rounded-md transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <span
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                Editar Asiento
                              </span>
                            </div>

                            <div className="w-px h-6 bg-slate-200 mx-1"></div>

                            <div className="group relative">
                              <button className="p-2 hover:bg-green-100 text-slate-600 hover:text-green-700 rounded-md transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </button>
                              <span
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                Asentar en Folio
                              </span>
                            </div>

                            <div className="w-px h-6 bg-slate-200 mx-1"></div>

                            <div className="group relative">
                              <button className="p-2 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-md transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                              <span
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-red-600 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                Eliminar Registro
                              </span>
                            </div>
                          </div>

                          <div className="bg-white rounded-[1rem] shadow-lg border border-slate-200 overflow-hidden py-5">
                            <div className="p-5">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-rpi-blue/10 to-blue-500/10 rounded-lg flex items-center justify-center group-hover:from-rpi-blue/20 group-hover:to-blue-500/20 transition-colors">
                                  <span className="text-xs font-bold text-rpi-blue">#{index + 1}</span>
                                </div>
                                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex-1">
                                  <p className="text-sm text-slate-700 leading-relaxed">{asiento?.texto || asiento.tipo_procedimiento || 'Asiento de titularidad'}</p>
                                  <p className="text-xs text-rpi-gray/600">{asiento?.tipo_procedimiento || asiento?.texto?.substring(0, 50) || 'Asiento de dominio'}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                {/* Proporción */}
                                <div className="space-y-2">
                                  <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">Proporción</label>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <Percent className="w-4 h-4 text-rpi-blue" />
                                      <span className="text-lg font-bold text-rpi-blue">{asiento?.proporcion || '100%'}</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-gradient-to-r from-rpi-gray/30 to-rpi-gray/20 rounded-full h-2 overflow-hidden">
                                    <div className="bg-gradient-to-r from-rpi-blue to-blue-600 h-2 rounded-full transition-all shadow-inner" style={{ width: '100%' }}></div>
                                  </div>
                                </div>

                                {/* Fecha */}
                                <div className="space-y-2">
                                  <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">Fecha de Inscripción</label>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-rpi-blue" />
                                    <span className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* GRAVAMENES, RESTRICCIONES E INTERDICCIONES */}
              {folioData?.gravamenes && folioData.gravamenes.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    GRAVAMENES, RESTRICCIONES E INTERDICCIONES
                  </h3>
                  <div className="space-y-4">
                    {folioData.gravamenes.map((gravamen, gravamenIndex) => (
                      <div key={gravamenIndex} className="relative max-w-4xl mx-auto font-sans">
                        <div
                          className="absolute -top-6 right-8 z-50 flex items-center bg-white border border-slate-300 shadow-xl rounded-lg p-1.5 gap-1 print:hidden">

                          <div className="group relative">
                            <button className="p-2 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-md transition-all">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <span
                              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                              Editar Gravamen
                            </span>
                          </div>

                          <div className="w-px h-6 bg-slate-200 mx-1"></div>

                          <div className="group relative">
                            <button className="p-2 hover:bg-green-100 text-slate-600 hover:text-green-700 rounded-md transition-all">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </button>
                            <span
                              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                              Asentar en Folio
                            </span>
                          </div>

                          <div className="w-px h-6 bg-slate-200 mx-1"></div>

                          <div className="group relative">
                            <button className="p-2 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-md transition-all">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            <span
                              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-red-600 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                              Eliminar Gravamen
                            </span>
                          </div>
                        </div>

                        <div className="bg-white rounded-[1rem] shadow-lg border border-slate-200 overflow-hidden py-5">
                          <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-500/10 rounded-lg flex items-center justify-center group-hover:from-red-200 group-hover:to-red-500/20 transition-colors">
                                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                              </div>
                              <div className="bg-red-50/50 p-4 rounded-lg border border-red-100 flex-1">
                                <p className="text-sm text-slate-700 leading-relaxed">{gravamen?.texto || gravamen?.tipo_procedimiento || 'Gravamen registral'}</p>
                                <p className="text-xs text-rpi-gray/600">{gravamen?.tipo_procedimiento || gravamen?.texto?.substring(0, 50) || 'Gravamen'}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Alcance */}
                              <div className="space-y-2">
                                <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">Alcance</label>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Percent className="w-4 h-4 text-red-600" />
                                    <span className="text-lg font-bold text-red-600">Total</span>
                                  </div>
                                </div>
                                <div className="w-full bg-gradient-to-r from-rpi-gray/30 to-red-100 rounded-full h-2 overflow-hidden">
                                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all shadow-inner" style={{ width: '100%' }}></div>
                                </div>
                              </div>

                              {/* Fecha */}
                              <div className="space-y-2">
                                <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">Fecha de Inscripción</label>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-red-600" />
                                  <span className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CANCELACIONES */}
              {folioData?.cancelaciones && folioData.cancelaciones.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    CANCELACIONES
                  </h3>
                  <div className="space-y-4">
                    {folioData.cancelaciones.map((cancelacion, cancelacionIndex) => (
                      <div key={cancelacionIndex} className="relative max-w-4xl mx-auto font-sans">
                        <div
                          className="absolute -top-6 right-8 z-50 flex items-center bg-white border border-slate-300 shadow-xl rounded-lg p-1.5 gap-1 print:hidden">

                          <div className="group relative">
                            <button className="p-2 hover:bg-blue-100 text-slate-600 hover:text-blue-700 rounded-md transition-all">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <span
                              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                              Editar Cancelación
                            </span>
                          </div>

                          <div className="w-px h-6 bg-slate-200 mx-1"></div>

                          <div className="group relative">
                            <button className="p-2 hover:bg-green-100 text-slate-600 hover:text-green-700 rounded-md transition-all">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </button>
                            <span
                              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                              Asentar en Folio
                            </span>
                          </div>

                          <div className="w-px h-6 bg-slate-200 mx-1"></div>

                          <div className="group relative">
                            <button className="p-2 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-md transition-all">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            <span
                              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-red-600 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                              Eliminar Cancelación
                            </span>
                          </div>
                        </div>

                        <div className="bg-white rounded-[1rem] shadow-lg border border-slate-200 overflow-hidden py-5">
                          <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-emerald-500/10 rounded-lg flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-500/20 transition-colors">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </div>
                              <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 flex-1">
                                <p className="text-sm text-slate-700 leading-relaxed">{cancelacion?.texto || cancelacion?.tipo_procedimiento || 'Cancelación de registro'}</p>
                                <p className="text-xs text-rpi-gray/600">{cancelacion?.tipo_procedimiento || cancelacion?.texto?.substring(0, 50) || 'Cancelación'}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Alcance */}
                              <div className="space-y-2">
                                <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">Alcance</label>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Percent className="w-4 h-4 text-emerald-600" />
                                    <span className="text-lg font-bold text-emerald-600">Total</span>
                                  </div>
                                </div>
                                <div className="w-full bg-gradient-to-r from-rpi-gray/30 to-emerald-100 rounded-full h-2 overflow-hidden">
                                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all shadow-inner" style={{ width: '100%' }}></div>
                                </div>
                              </div>

                              {/* Fecha */}
                              <div className="space-y-2">
                                <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">Fecha de Inscripción</label>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-emerald-600" />
                                  <span className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
