import { useEffect, useState } from 'react'
import { FileText, ChevronLeft, ChevronRight, RotateCw, Upload, Percent, User, Building2, CheckCircle2, Calendar } from 'lucide-react'

export default function Visor360() {
  const [documentType, setDocumentType] = useState('')
  const [loading, setLoading] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [document, setDocument] = useState<{
    matricula: string
    asientos: Array<{
      rubro: string
      fecha: string
      titular: string
      porcentaje: number
      descripcion?: string
      titulo?: string
    }>
    dominio?: string
    departamento?: string
    codigo_departamento?: string
    distrito?: string
    unidad_funcional?: string
    manzana?: string
    lote?: string
    seccion?: string
    parcela?: string
    padron?: string
    plano?: string
    fecha_apertura?: string
    descripcion_inmueble?: string
    descripcion_parcela?: string
    observaciones?: string
  } | null>(null)

  // Datos de prueba para visualización
  const sampleData = {
    dominio: 'MFR 3.0260',
    departamento: 'TINOGASTA',
    codigo_departamento: '21',
    distrito: 'TINOGASTA',
    unidad_funcional: 'UNIDAD CENTRAL',
    manzana: 'A-12',
    lote: 'L-045',
    seccion: '44',
    parcela: '7931',
    padron: 'P-2019',
    plano: 'PL-2019-044',
    fecha_apertura: '15/03/2019',
    descripcion_inmueble: 'INmueble ubicado sobre calle principal N° 1234, esquina con avenida San Martín. Construcción de dos (2) niveles, techado a dos aguas. Fachada en ladrillo visto con puertas de acceso metálicas de doble hoja. Área de construcción aproximada de 180m².',
    descripcion_parcela: 'Terreno urbano con dimensiones aproximadas de 25m x 36m. Topografía plana. Ubicado en zona de alta densidad urbana con servicios básicos completos (agua, luz, cloacas, gas natural).',
    observaciones: 'Se tomó Razon de E.P. n° 344, del 30.06.05 RECTIFICATORIA de E.P. n° 237/04- Pres. el 11.08.05-Orden n° 9352.- INscrita con fecha 28.04.05',
    asientos: [
      {
        rubro: 'titularidad',
        fecha: '2024-01-15',
        titular: 'JUAN PÉREZ',
        porcentaje: 50,
        descripcion: 'Titularidad: JUAN PÉREZ - 50% (Matrícula del dominio)'
      },
      {
        rubro: 'titularidad',
        fecha: '2024-01-15',
        titular: 'MARÍA GARCÍA',
        porcentaje: 25,
        descripcion: 'Titularidad: MARÍA GARCÍA - 25% (Conyugalidad)'
      },
      {
        rubro: 'titularidad',
        fecha: '2024-01-15',
        titular: 'LUIS RODRÍGUEZ',
        porcentaje: 25,
        descripcion: 'Titularidad: LUIS RODRÍGUEZ - 25% (Testamento)'
      },
      {
        rubro: 'gravamen',
        fecha: '2024-02-20',
        titular: 'BANCO HIPOTECARIO NACIONAL S.A.',
        porcentaje: 0,
        descripcion: 'Hipoteca convencional por $5,500,000 ARS - Documentación completa adjunta'
      },
      {
        rubro: 'constitucion-hipoteca',
        fecha: '2024-02-20',
        titular: 'BANCO HIPOTECARIO NACIONAL S.A.',
        porcentaje: 0,
        descripcion: 'Constitución de Hipoteca - Folio del gravamen: 88001'
      },
      {
        rubro: 'compraventa',
        fecha: '2024-03-10',
        titular: 'OPERACIÓN DE VENTA',
        porcentaje: 0,
        descripcion: 'Contrato de compraventa formalizado ante escribano. Precio pactado: $6,200,000 ARS.'
      }
    ]
  }

  useEffect(() => {
    // Simulación de carga del documento
    const loadDocument = async () => {
      try {
        // Intentar cargar de la API
        const response = await fetch('http://localhost:8000/api/folios/88000/')
        if (response.ok) {
          const data = await response.json()
          const docData = data[0] || {}

          // Extraer los campos adicionales del documento (priorizar datos reales sobre datos de prueba)
          setDocument({
            matricula: docData.matricula || '88000',
            asientos: (docData.asientos || []).map(asiento => ({
              ...asiento,
              titular: asiento.titular || '',
              titulo: asiento.titulo || '',
              descripcion: asiento.descripcion || ''
            })),
            // Datos de prueba por defecto (se sobrescriben si la API devuelve datos)
            dominio: docData.dominio || sampleData.dominio,
            departamento: docData.departamento || sampleData.departamento,
            codigo_departamento: docData.codigo_departamento || sampleData.codigo_departamento,
            distrito: docData.distrito || sampleData.distrito,
            unidad_funcional: docData.unidad_funcional || sampleData.unidad_funcional,
            manzana: docData.manzana || sampleData.manzana,
            lote: docData.lote || sampleData.lote,
            seccion: docData.seccion || sampleData.seccion,
            parcela: docData.parcela || sampleData.parcela,
            padron: docData.padron || sampleData.padron,
            plano: docData.plano || sampleData.plano,
            fecha_apertura: docData.fecha_apertura || sampleData.fecha_apertura,
            descripcion_inmueble: docData.descripcion_inmueble || sampleData.descripcion_inmueble,
            descripcion_parcela: docData.descripcion_parcela || sampleData.descripcion_parcela,
            observaciones: docData.observaciones || sampleData.observaciones
          })
        } else {
          // API no disponible - usar datos de prueba
          setDocument({
            matricula: '88000',
            asientos: sampleData.asientos,
            dominio: sampleData.dominio,
            departamento: sampleData.departamento,
            codigo_departamento: sampleData.codigo_departamento,
            distrito: sampleData.distrito,
            unidad_funcional: sampleData.unidad_funcional,
            manzana: sampleData.manzana,
            lote: sampleData.lote,
            seccion: sampleData.seccion,
            parcela: sampleData.parcela,
            padron: sampleData.padron,
            plano: sampleData.plano,
            fecha_apertura: sampleData.fecha_apertura,
            descripcion_inmueble: sampleData.descripcion_inmueble,
            descripcion_parcela: sampleData.descripcion_parcela,
            observaciones: sampleData.observaciones
          })
        }
      } catch (err) {
        console.warn('No se pudo cargar el documento:', err)
        // Error - usar datos de prueba
        setDocument({
          matricula: '88000',
          asientos: sampleData.asientos,
          dominio: sampleData.dominio,
          departamento: sampleData.departamento,
          codigo_departamento: sampleData.codigo_departamento,
          distrito: sampleData.distrito,
          unidad_funcional: sampleData.unidad_funcional,
          manzana: sampleData.manzana,
          lote: sampleData.lote,
          seccion: sampleData.seccion,
          parcela: sampleData.parcela,
          padron: sampleData.padron,
          plano: sampleData.plano,
          fecha_apertura: sampleData.fecha_apertura,
          descripcion_inmueble: sampleData.descripcion_inmueble,
          descripcion_parcela: sampleData.descripcion_parcela,
          observaciones: sampleData.observaciones
        })
      } finally {
        setLoading(false)
      }
    }

    loadDocument()
  }, [])

  const simulateUpload = (progress: number) => {
    setUploadProgress(progress)
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
    return map[rubro.toLowerCase()] || rubro
  }

  if (loading) {
    return (
      <div className="flex h-screen">
        {/* Panel Izquierdo: Pantalla de carga */}
        <div className="w-1/2 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center relative overflow-hidden">
          {/* Fondo con patrón sutil */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zOCAyMmwtMTQtMTRIMTR6IiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtb3BhY2l0eTowLjUiLz48cGF0aCBkPSJNMCAzMThsMTQgMTR6IiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtb3BhY2l0eTowLjUiLz48L2c+PC9zdmc+')]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="mb-8">
              <div className="relative inline-flex">
                <div className="animate-spin rounded-full h-24 w-24 border-4 border-rpi-blue border-t-transparent"></div>
                <FileText className="absolute inset-0 m-auto text-white/20 h-24 w-24" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Visor Documental Registral
            </h2>
            <p className="text-blue-200/80 max-w-md mx-auto leading-relaxed">
              Cargando información del folio registral. Por favor, espere un momento...
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rpi-blue to-blue-400 transition-all duration-500 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-blue-200/60 mt-3 font-medium">
              {uploadProgress === 100 ? 'Cargando...' : `Sincronizando ${uploadProgress}%`}
            </p>
          </div>
        </div>

        {/* Panel Derecho: Visualización del documento */}
        <div className="w-1/2 bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-rpi-blue via-blue-800 to-blue-900 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <RotateCw className="w-7 h-7 text-white/80" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Visor 360°</h1>
                <p className="text-blue-100/80 text-sm">Visualización de asientos registrales</p>
              </div>
            </div>

            {/* Botón de carga */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-blue-100/70">
              <Upload className="w-4 h-4" />
              <span>Cargar otro documento</span>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 p-6 overflow-hidden">
            {document ? (
              <>
                {/* Datos del documento */}
                <div className="bg-white rounded-2xl shadow-sm border border-rpi-gray/20 p-6 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-8 h-8 text-rpi-blue" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Folio <span className="text-rpi-blue font-mono">{document.matricula}</span>
                      </h2>
                      <p className="text-sm text-rpi-gray/60">Departamento: {document?.asientos.length > 0 ? document.asientos[0].rubro : 'General'}</p>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-600">
                      Estado: <span className="font-semibold">{document?.asientos.length > 0 ? document.asientos[0].rubro : 'Inactivo'}</span>
                    </span>
                  </div>

                  {/* Contador de asientos */}
                  <div className="flex items-center gap-2 text-sm text-rpi-gray/60">
                    <FileText className="w-4 h-4 text-rpi-blue" />
                    <span>{document?.asientos.length || 0} asientos registrales</span>
                  </div>
                </div>

                {/* Lista de asientos */}
                <div className="space-y-4">
                  {document.asientos.map((asiento, index) => {
                    const label = getRubroLabel(asiento.rubro)
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden hover:border-rpi-blue/30 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-4 flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide">
                                {label}
                              </span>
                              <span className="px-2 py-0.5 bg-rpi-gray/100 rounded text-xs text-rpi-gray/600">
                                #{index + 1}
                              </span>
                            </div>
                            <p className="text-gray-800 font-medium">{asiento.rubro}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Porcentaje */}
                            <div className="min-w-[100px]">
                              <p className="text-xs text-rpi-gray/500 uppercase tracking-wide mb-1">
                                Porcentaje
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Percent className="w-4 h-4 text-rpi-blue" />
                                  <span className="text-2xl font-bold text-rpi-blue">{asiento.porcentaje}%</span>
                                </div>
                              </div>
                              <div className="mt-2 w-full bg-gradient-to-r from-rpi-gray/30 to-rpi-gray/20 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-rpi-blue to-blue-600 h-2 rounded-full transition-all shadow-inner"
                                  style={{ width: `${asiento.porcentaje}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Fecha */}
                            <div className="text-right">
                              <p className="text-xs text-rpi-gray/500 uppercase tracking-wide">Fecha</p>
                              <p className="text-sm text-gray-700 font-mono">
                                {new Date(asiento.fecha).toLocaleDateString('es-AR')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-rpi-blue/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-12 h-12 text-rpi-blue/60" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Documento no disponible</h3>
                <p className="text-gray-500 max-w-md">
                  No se pudo cargar el documento. Verifique la conexión a la base de datos o intente nuevamente más tarde.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-2 bg-rpi-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Recargar
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white p-4 text-center">
            <p className="text-sm text-white/60">
              RPI Catamarca • Sistema de Gestión Registral • v1.0.0
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Panel Izquierdo: Información del documento */}
      <div className="w-1/2 bg-gray-50 border-r border-rpi-gray/20 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-rpi-blue via-blue-800 to-blue-900 text-white p-6 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileText className="w-7 h-7 text-white/80" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Visor Documental</h1>
              <p className="text-blue-100/80 text-sm">Datos registrales completos</p>
            </div>
          </div>

          <button className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Datos principales */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-rpi-blue" />
              Información del Folio
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-rpi-blue" />
                </div>
                <div>
                  <p className="text-xs text-rpi-gray/500 uppercase tracking-wide font-medium">Folio Registral</p>
                  <p className="text-gray-900 font-mono font-semibold">{document?.matricula}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-rpi-blue" />
                </div>
                <div>
                  <p className="text-xs text-rpi-gray/500 uppercase tracking-wide font-medium">Departamento</p>
                  <p className="text-gray-900 font-medium">{document?.asientos.length > 0 ? document.asientos[0].rubro : 'General'}</p>
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
                    <p className="text-gray-900 font-medium">{document?.asientos.length > 0 ? document.asientos[0].rubro : 'Inactivo'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-rpi-gray/100 flex items-center gap-2 text-sm text-rpi-gray/60">
              <FileText className="w-4 h-4" />
              <span>{document?.asientos.length || 0} asientos registrales</span>
            </div>
          </div>

          {/* Lista de asientos */}
          <div className="space-y-4">
            {document?.asientos.map((asiento, index) => {
              const label = getRubroLabel(asiento.rubro)
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden hover:border-rpi-blue/30 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-rpi-blue/10 to-blue-500/10 rounded-lg flex items-center justify-center group-hover:from-rpi-blue/20 group-hover:to-blue-500/20 transition-colors">
                        <span className="text-xs font-bold text-rpi-blue">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{label}</p>
                        <p className="text-xs text-rpi-gray/600">{asiento.rubro}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Porcentaje */}
                      <div className="space-y-2">
                        <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">
                          Porcentaje de Dominio
                        </label>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-rpi-blue" />
                            <span className="text-lg font-bold text-rpi-blue">{asiento.porcentaje}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gradient-to-r from-rpi-gray/30 to-rpi-gray/20 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-rpi-blue to-blue-600 h-2 rounded-full transition-all shadow-inner"
                            style={{ width: `${asiento.porcentaje}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Fecha */}
                      <div className="space-y-2">
                        <label className="text-xs text-rpi-gray/500 uppercase tracking-wide block">
                          Fecha de Inscripción
                        </label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-rpi-blue" />
                          <span className="text-sm font-medium text-gray-700">
                            {new Date(asiento.fecha).toLocaleDateString('es-AR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Panel Derecho: Visualización principal */}
      <div className="w-1/2 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-y-auto">
        {/* Header principal */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-6 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <RotateCw className="w-7 h-7 text-white/80" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Visor 360°</h1>
              <p className="text-blue-100/80 text-sm">Visualización de asientos registrales</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm text-blue-100/70">
            <Upload className="w-4 h-4" />
            <span>Cargar otro documento</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          {document ? (
            <>
              {/* Header del documento */}
              <div className="bg-white rounded-2xl shadow-sm border border-rpi-gray/20 overflow-hidden mb-6">
                <div className="p-6 bg-gradient-to-r from-rpi-blue to-blue-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Folio <span className="font-mono">{document.matricula}</span>
                        </h2>
                        <p className="text-blue-100/80 text-sm mt-0.5">Departamento: {document?.asientos.length > 0 ? document.asientos[0].rubro : 'General'}</p>
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                      <p className="text-xs text-emerald-200/80 uppercase">Estado</p>
                      <p className="text-sm font-medium text-emerald-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        {document?.asientos.length > 0 ? document.asientos[0].rubro : 'Inactivo'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-rpi-gray/60 mb-4">
                    Total de asientos registrales: <span className="text-rpi-blue font-semibold">{document?.asientos.length || 0}</span>
                  </p>

                  {/* Botón de impresión */}
                  <button className="w-full py-3 bg-gradient-to-r from-rpi-blue to-blue-700 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimir Documento
                  </button>
                </div>
              </div>

              {/* Formulario Folio Digital - Registro de la Propiedad Inmobiliaria */}
              <div className="bg-white rounded-2xl shadow-sm border border-rpi-gray/20 overflow-hidden mb-6">
                <div className="p-4 bg-gradient-to-r from-rpi-blue to-blue-800 text-white">
                  <h2 className="text-xl font-bold">Registro de la Propiedad Inmobiliaria</h2>
                  <p className="text-blue-100 text-sm mt-0.5">Formulario Folio Digital</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Fila superior: Dominio, Departamento, Matrícula */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-rpi-gray/600 uppercase tracking-wide mb-1">
                        Dominio
                      </label>
                      <input
                        type="text"
                        value={document.dominio || ''}
                        disabled
                        className="w-full px-3 py-2.5 bg-rpi-gray/50 border border-rpi-gray/200 rounded-lg text-gray-700 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-rpi-gray/600 uppercase tracking-wide mb-1">
                        Departamento
                      </label>
                      <input
                        type="text"
                        value={document.departamento || ''}
                        disabled
                        className="w-full px-3 py-2.5 bg-rpi-gray/50 border border-rpi-gray/200 rounded-lg text-gray-700 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-rpi-gray/600 uppercase tracking-wide mb-1">
                        Matrícula
                      </label>
                      <input
                        type="text"
                        value={document.matricula || ''}
                        disabled
                        className="w-full px-3 py-2.5 bg-rpi-gray/50 border border-rpi-gray/200 rounded-lg text-gray-700 font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Fila segunda: Código Departamento, Distrito, Unidad Funcional */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-rpi-gray/600 uppercase tracking-wide mb-1">
                        Código Departamento
                      </label>
                      <input
                        type="text"
                        value={document.codigo_departamento || ''}
                        disabled
                        className="w-full px-3 py-2.5 bg-rpi-gray/50 border border-rpi-gray/200 rounded-lg text-gray-700 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-rpi-gray/600 uppercase tracking-wide mb-1">
                        Distrito
                      </label>
                      <input
                        type="text"
                        value={document.distrito || ''}
                        disabled
                        className="w-full px-3 py-2.5 bg-rpi-gray/50 border border-rpi-gray/200 rounded-lg text-gray-700 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-rpi-gray/600 uppercase tracking-wide mb-1">
                        Unidad Funcional
                      </label>
                      <input
                        type="text"
                        value={document.unidad_funcional || ''}
                        disabled
                        className="w-full px-3 py-2.5 bg-rpi-gray/50 border border-rpi-gray/200 rounded-lg text-gray-700 font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Sección Datos Catastrales con fondo verde */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-5 border border-emerald-200">
                    <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Datos Catastrales
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          Manzana
                        </label>
                        <input
                          type="text"
                          value={document.manzana || ''}
                          disabled
                          className="w-full px-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-700 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          Lote
                        </label>
                        <input
                          type="text"
                          value={document.lote || ''}
                          disabled
                          className="w-full px-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-700 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          Sección
                        </label>
                        <input
                          type="text"
                          value={document.seccion || ''}
                          disabled
                          className="w-full px-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-700 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          Parcela
                        </label>
                        <input
                          type="text"
                          value={document.parcela || ''}
                          disabled
                          className="w-full px-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-700 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          Padrón
                        </label>
                        <input
                          type="text"
                          value={document.padron || ''}
                          disabled
                          className="w-full px-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-700 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          Plano
                        </label>
                        <input
                          type="text"
                          value={document.plano || ''}
                          disabled
                          className="w-full px-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-700 font-mono text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                          Fecha de Apertura
                        </label>
                        <input
                          type="text"
                          value={document.fecha_apertura || 'dd/mm/aaaa'}
                          disabled
                          placeholder="dd/mm/aaaa"
                          className="w-full px-3 py-2.5 bg-white border border-emerald-200 rounded-lg text-gray-700 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Descripción del Inmueble y Descripción de la Parcela */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50/50 rounded-xl border border-amber-100 p-4">
                      <label className="block text-xs font-semibold text-amber-900 uppercase tracking-wide mb-2">
                        Descripción del Inmueble
                      </label>
                      <textarea
                        disabled
                        className="w-full h-32 px-3 py-2.5 bg-white border border-amber-200 rounded-lg text-gray-700 font-mono text-sm resize-none"
                      />
                    </div>
                    <div className="bg-amber-50/50 rounded-xl border border-amber-100 p-4">
                      <label className="block text-xs font-semibold text-amber-900 uppercase tracking-wide mb-2">
                        Descripción de la Parcela
                      </label>
                      <textarea
                        disabled
                        className="w-full h-32 px-3 py-2.5 bg-white border border-amber-200 rounded-lg text-gray-700 font-mono text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Sección de Observaciones */}
                  <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4">
                    <h3 className="text-sm font-bold text-blue-900 mb-3">Observaciones</h3>
                    <div className="bg-white rounded-lg border border-blue-200 p-4 h-48 flex items-center justify-center text-gray-500 text-sm">
                      {document.observaciones ? (
                        <p className="whitespace-pre-wrap text-gray-800">{document.observaciones}</p>
                      ) : (
                        <span className="text-sm text-gray-400">Sin observaciones registradas</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de asientos */}
              <div className="space-y-4">
                {document.asientos.map((asiento, index) => {
                  const label = getRubroLabel(asiento.rubro)
                  return (
                    <div
                      key={index}
                      id={`rubro-${asiento.rubro.toLowerCase().replace(/ /g, '-')}`}
                      className="bg-white rounded-2xl shadow-sm border border-rpi-gray/20 overflow-hidden hover:border-rpi-blue/30 hover:shadow-lg transition-all duration-200 group print:shadow-none print:border-rpi-gray/100"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-rpi-blue/10 to-blue-500/10 rounded-xl flex items-center justify-center group-hover:from-rpi-blue/20 group-hover:to-blue-500/20 transition-colors print:bg-rpi-gray/50 print:group-hover:print:bg-rpi-gray/50">
                            <FileText className="w-6 h-6 text-rpi-blue group-hover:text-rpi-blue print:text-rpi-gray/600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-gray-900">{label}</h3>
                              <span className="px-2 py-0.5 bg-rpi-gray/100 rounded text-xs font-medium text-rpi-gray/600">
                                #{index + 1}
                              </span>
                            </div>
                            <p className="text-sm text-rpi-gray/600">{asiento.rubro}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Información del titular */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-rpi-blue/60" />
                              <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide">
                                Titularidad
                              </label>
                            </div>
                            <p className="text-gray-900 font-medium">{asiento.titular}</p>
                          </div>

                          {/* Descripción del asiento */}
                          {asiento.descripcion && (
                            <div className="space-y-2">
                              <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide block">
                                Descripción del Asiento
                              </label>
                              <p className="text-sm text-gray-700 italic bg-gray-50 rounded-lg p-3 border border-gray-200">
                                {asiento.descripcion}
                              </p>
                            </div>
                          )}

                          {/* Porcentaje */}
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide block">
                              Porcentaje de Dominio
                            </label>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Percent className="w-5 h-5 text-rpi-blue" />
                                <span className="text-2xl font-bold text-rpi-blue">{asiento.porcentaje}%</span>
                              </div>
                            </div>
                            <div className="w-full bg-gradient-to-r from-rpi-gray/30 to-rpi-gray/20 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-rpi-blue to-blue-600 h-3 rounded-full transition-all shadow-inner"
                                style={{ width: `${asiento.porcentaje}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Fecha */}
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-rpi-gray/500 uppercase tracking-wide block">
                              Fecha de Inscripción
                            </label>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-rpi-blue" />
                              <span className="text-gray-700 font-mono">{new Date(asiento.fecha).toLocaleDateString('es-AR')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Información adicional */}
                        <div className="mt-5 p-4 bg-blue-50/50 rounded-xl border border-blue-100 print:bg-rpi-gray/50">
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
                  )
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-rpi-blue/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-12 h-12 text-rpi-blue/60" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Documento no disponible</h3>
              <p className="text-gray-500 max-w-md">
                No se pudo cargar el documento. Verifique la conexión a la base de datos o intente nuevamente más tarde.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-rpi-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Recargar
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white p-4 text-center print:hidden">
          <p className="text-sm text-white/60">
            RPI Catamarca • Sistema de Gestión Registral • v1.0.0
          </p>
        </div>
      </div>
    </div>
  )
}