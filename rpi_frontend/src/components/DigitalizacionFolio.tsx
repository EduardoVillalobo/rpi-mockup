import { useState } from 'react'
import { ScanText, ArrowLeft, MonitorUp, Save, FileText, Building2 } from 'lucide-react'

// Tipos de datos basados en la estructura JSON real del API
type Nomenclatura = {
  departamento?: string
  distrito?: string
  seccion?: string
  parcela?: string
  manzana?: string
}

type TitularidadDominio = {
  asiento?: number
  titulares?: string
  descripcion?: string
  proporcion?: string
  tipo_procedimiento?: string
  texto?: string
}

type SuperficieData = {
  titulo?: string
  plano?: string
  este?: string
  oeste?: string
  norte?: string
  sur?: string
}

type Gravamen = {
  asiento?: number
  descripcion?: string
}

type Certificado = {
  asiento?: number
  descripcion?: string
}

type Document = {
  archivo?: string
  matricula?: string
  departamento_nombre?: string
  antecedente_dominio?: string
  fecha_apertura?: string
  estado?: string
  nomenclatura?: Nomenclatura
  titularidad_dominio?: TitularidadDominio[]
  superficiario?: SuperficieData[]
  gravamenes?: Gravamen[]
  cancelaciones?: any[]
  certificados?: Certificado[]
  observaciones?: string | string[]
}

export default function DigitalizacionFolio() {
  // Estado de folio seleccionado
  const [folioSeleccionado, setFolioSeleccionado] = useState<any | null>(null)

  // Estado de datos extraÃ­dos (null = no cargados o error)
  const [datosExtraidos, setDatosExtraidos] = useState<Document | null>(null)

  // Estado de carga
  const [cargando, setCargando] = useState(false)

  // Datos simulados de folios pendientes
  const folios_pendientes = [
    {
      matricula: '88000',
      matricula_catastral: '01-25-2525-S/D',
      usuario_solicitante: 'Mesa de Entrada - J. PÃ©rez'
    },
    {
      matricula: '87950',
      matricula_catastral: '02-25-3100-N/E',
      usuario_solicitante: 'Mesa de Entrada - M. GarcÃ­a'
    },
    {
      matricula: '88100',
      matricula_catastral: '03-25-1800-P/O',
      usuario_solicitante: 'Mesa de Entrada - L. MartÃ­nez'
    },
    {
      matricula: '87920',
      matricula_catastral: '04-25-4200-R/T',
      usuario_solicitante: 'Mesa de Entrada - A. RodrÃ­guez'
    },
    {
      matricula: '88050',
      matricula_catastral: '05-25-3300-Q/U',
      usuario_solicitante: 'Mesa de Entrada - C. LÃ³pez'
    }
  ]

  // FunciÃ³n para simular fetch al backend
  const handleDigitalizar = async (folio: any) => {

    setCargando(true)
    try {
      // Simulamos una llamada al API (en producciÃ³n serÃ­a real)
      // const response = await fetch(`http://localhost:8000/api/folios/${folio.matricula}/`)

      // Para demo, usamos datos mockeados basados en la matrÃ­cula
      const matriculaNum = parseInt(folio.matricula.replace(/\D/g, ''))
      const mockData: Document = {
        archivo: `folio_${folio.matricula}.pdf`,
        matricula: folio.matricula,
        departamento_nombre: 'General',
        antecedente_dominio: 'ConstituciÃ³n por TÃ­tulo Privado',
        fecha_apertura: '2025-03-15',
        estado: 'Activo',
        nomenclatura: {
          departamento: 'General',
          distrito: 'Centro',
          seccion: `${(matriculaNum % 10) + 1}`,
          parcela: `${matriculaNum % 100}`,
          manzana: `${matriculaNum % 50}`
        },
        titularidad_dominio: [
          {
            asiento: 1,
            titulares: 'Juan PÃ©rez - Documento 123456',
            descripcion: 'Compra-venta con escritura pÃºblica',
            proporcion: '100%',
            tipo_procedimiento: 'AdquisiciÃ³n por compra-venta'
          },
          {
            asiento: 2,
            titulares: 'MarÃ­a GarcÃ­a - Documento 789012',
            descripcion: 'DonaciÃ³n entre parientes',
            proporcion: '100%',
            tipo_procedimiento: 'AdquisiciÃ³n por donaciÃ³n'
          }
        ],
        superficiario: [
          {
            titulo: 'SegÃºn TÃ­tulo',
            plano: 'SegÃºn Plano Oficial',
            este: '12.5 m',
            oeste: '15.3 m',
            norte: '18.2 m',
            sur: '14.8 m'
          }
        ],
        gravamenes: [
          {
            asiento: 1,
            descripcion: 'Hipoteca constituida a favor del Banco X por valor de $500,000'
          }
        ],
        cancelaciones: [],
        certificados: [
          {
            asiento: 1,
            descripcion: 'Cert. nÂº 1 - No existen gravÃ¡menes reales adicionales'
          },
          {
            asiento: 2,
            descripcion: 'Cert. nÂº 2 - No existen servidumbres urbanas'
          }
        ],
        observaciones: 'Folio regular sin observaciones'
      }

      // Guardar el folio seleccionado para mostrar el formulario en una nueva "pantalla"
      setFolioSeleccionado(folio)
      setDatosExtraidos(mockData)
    } catch (error) {
      console.error('Error extrayendo datos:', error)
    } finally {
      setCargando(false)
    }
  }

  // Manejar cambio en inputs del formulario
  const handleInputChange = (field: string, value: string) => {
    if (!datosExtraidos) return
    const newData = { ...datosExtraidos }

    // Manejar arrays de titularidad, gravÃ¡menes, certificados
    if (field.startsWith('titularidad[')) {
      const asiento = parseInt(field.split('[')[1].replace(']', ''))
      if (asiento) {
        newData.titularidad_dominio = (newData.titularidad_dominio || []).map((t: any, i: number) => {
          if (i === asiento - 1) {
            // Crear el objeto con los valores actualizados
            const parsedField = field.replace('titularidad[', '').replace(']', '')
            const subfield = parsedField.split('.')[0]
            return {
              ...t,
              [subfield]: value
            }
          }
          return t
        })
      }
    }

    // Guardar en el estado (en producciÃ³n, esto serÃ­a optimizado)
    // Para este demo, simplificamos guardando solo el valor directamente
    // El backend real manejarÃ­a la validaciÃ³n
  }

  // Manejar guardado
  const handleGuardar = () => {
    if (!datosExtraidos) return

    alert(`Folio ${datosExtraidos.matricula} digitalizado con Ã©xito!`)

    // Resetear a la lista de pendientes
    setFolioSeleccionado(null)
    setDatosExtraidos(null)
    setCargando(false)
  }

  // Estado: Cargando datos del folio
  if (cargando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header principal */}
          <div className="mb-8 print:hidden">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-rpi-blue/10 rounded-xl flex items-center justify-center">
                <ScanText className="w-7 h-7 text-rpi-blue" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Folios Pendientes de DigitalizaciÃ³n</h1>
                <p className="text-gray-600 text-sm">Seleccione un folio para comenzar el proceso de digitalizaciÃ³n</p>
              </div>
            </div>
          </div>

          {/* Tabla de folios pendientes */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden print:shadow-none print:border-rpi-gray/100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rpi-gray/50 border-b border-rpi-gray/100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      MatrÃ­cula
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      MatrÃ­cula Catastral
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      Usuario Solicitante
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rpi-gray/100">
                  {folios_pendientes.map((folio) => (
                    <tr
                      key={folio.matricula}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rpi-blue/10 to-blue-500/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-rpi-blue" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 font-mono">
                            {folio.matricula}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700 font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                          {folio.matricula_catastral}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{folio.usuario_solicitante}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDigitalizar(folio)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-rpi-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                        >
                          <ScanText className="w-4 h-4" />
                          Digitalizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer informativo */}
          <div className="mt-6 print:hidden">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">InformaciÃ³n del mÃ³dulo</p>
                  <p className="text-blue-700">
                    Este mÃ³dulo permite la digitalizaciÃ³n de folios registrales mediante escaneo de PDFs y
                    procesamiento OCR para extraer automÃ¡ticamente la informaciÃ³n del asiento registral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Vista: Lista de folios pendientes
  if (!folioSeleccionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header principal */}
          <div className="mb-8 print:hidden">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-rpi-blue/10 rounded-xl flex items-center justify-center">
                <ScanText className="w-7 h-7 text-rpi-blue" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Folios Pendientes de Digitalización</h1>
                <p className="text-gray-600 text-sm">Seleccione un folio para comenzar el proceso de digitalización</p>
              </div>
            </div>
          </div>

          {/* Tabla de folios pendientes */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden print:shadow-none print:border-rpi-gray/100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rpi-gray/50 border-b border-rpi-gray/100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      Matrícula
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      Matrícula Catastral
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      Usuario Solicitante
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-rpi-gray/700 uppercase tracking-wide">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rpi-gray/100">
                  {folios_pendientes.map((folio) => (
                    <tr
                      key={folio.matricula}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rpi-blue/10 to-blue-500/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-rpi-blue" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 font-mono">
                            {folio.matricula}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700 font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                          {folio.matricula_catastral}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{folio.usuario_solicitante}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDigitalizar(folio)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-rpi-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                        >
                          <ScanText className="w-4 h-4" />
                          Digitalizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer informativo */}
          <div className="mt-6 print:hidden">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Información del módulo</p>
                  <p className="text-blue-700">
                    Este módulo permite la digitalización de folios registrales mediante escaneo de PDFs y
                    procesamiento OCR para extraer automáticamente la información del asiento registral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Vista: Formulario de edición
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header con botón Volver */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setFolioSeleccionado(null)
                setDatosExtraidos(null)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-rpi-gray/20 rounded-lg text-rpi-blue hover:bg-rpi-blue/10 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Volver al listado</span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-rpi-blue">
            <MonitorUp className="w-5 h-5" />
            <span className="text-sm font-semibold">MÃ³dulo de DigitalizaciÃ³n</span>
          </div>
        </div>

        {/* Estado de carga */}
        {cargando ? (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="w-16 h-16 border-4 border-rpi-blue/30 border-t-rpi-blue rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Extrayendo datos del PDF histÃ³rico...</p>
          </div>
        ) : datosExtraidos ? (
          /* Formulario completo */
          <form className="space-y-6">
            {/* Tarjeta 1: Datos Generales e IdentificaciÃ³n */}
            <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-rpi-gray/100 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-rpi-blue" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Datos Generales e IdentificaciÃ³n</h2>
                    <p className="text-xs text-rpi-gray/600">InformaciÃ³n bÃ¡sica del folio</p>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">MatrÃ­cula</label>
                  <input
                    type="text"
                    value={datosExtraidos.matricula || ''}
                    onChange={(e) => handleInputChange('matricula', e.target.value)}
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-mono text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departamento</label>
                  <input
                    type="text"
                    value={datosExtraidos.departamento_nombre || ''}
                    onChange={(e) => handleInputChange('departamento_nombre', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Antecedente Dominio</label>
                  <input
                    type="text"
                    value={datosExtraidos.antecedente_dominio || ''}
                    onChange={(e) => handleInputChange('antecedente_dominio', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Apertura</label>
                  <input
                    type="date"
                    value={datosExtraidos.fecha_apertura || ''}
                    onChange={(e) => handleInputChange('fecha_apertura', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                  <input
                    type="text"
                    value={datosExtraidos.estado || ''}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Catastro y Superficie */}
            <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-rpi-gray/100 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-rpi-blue" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Catastro y Superficie</h2>
                    <p className="text-xs text-rpi-gray/600">Datos catastrales y de linderos</p>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Distrito</label>
                  <input
                    type="text"
                    value={datosExtraidos.nomenclatura?.distrito || ''}
                    onChange={(e) => handleInputChange('nomenclatura.distrito', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SecciÃ³n</label>
                  <input
                    type="text"
                    value={datosExtraidos.nomenclatura?.seccion || ''}
                    onChange={(e) => handleInputChange('nomenclatura.seccion', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Parcela</label>
                  <input
                    type="text"
                    value={datosExtraidos.nomenclatura?.parcela || ''}
                    onChange={(e) => handleInputChange('nomenclatura.parcela', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Manzana</label>
                  <input
                    type="text"
                    value={datosExtraidos.nomenclatura?.manzana || ''}
                    onChange={(e) => handleInputChange('nomenclatura.manzana', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900 font-mono text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PadrÃ³n</label>
                  <input
                    type="text"
                    value={datosExtraidos.nomenclatura?.parcela || ''}
                    onChange={(e) => handleInputChange('nomenclatura.parcela', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900 font-mono text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Superficie segÃºn TÃ­tulo (mÂ²)</label>
                  <input
                    type="text"
                    value={datosExtraidos.superficiario?.[0]?.titulo || ''}
                    onChange={(e) => handleInputChange('superficiario[0].titulo', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Superficie segÃºn Plano (mÂ²)</label>
                  <input
                    type="text"
                    value={datosExtraidos.superficiario?.[0]?.plano || ''}
                    onChange={(e) => handleInputChange('superficiario[0].plano', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Linderos</label>
                  <textarea
                    value={`${datosExtraidos.superficiario?.[0]?.este || ''} (E) | ${datosExtraidos.superficiario?.[0]?.oeste || ''} (O) | ${datosExtraidos.superficiario?.[0]?.norte || ''} (N) | ${datosExtraidos.superficiario?.[0]?.sur || ''} (S)`}
                    onChange={(e) => handleInputChange('superficiario[0]', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue transition-all text-gray-900 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Tarjeta 3: Titularidad sobre el Dominio */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md border-2 border-blue-300 overflow-hidden">
              <div className="px-6 py-4 border-b border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <ScanText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Titularidad sobre el Dominio</h2>
                    <p className="text-xs text-blue-100">InformaciÃ³n crÃ­tica de los asientos registrales</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {datosExtraidos.titularidad_dominio?.map((asiento: TitularidadDominio, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-5 border border-blue-100 shadow-inner">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-700">{index + 1}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
                            Asiento NÂ°
                          </label>
                          <input
                            type="number"
                            value={asiento.asiento || index + 1}
                            onChange={(e) => handleInputChange(`titularidad[${index}].asiento`, e.target.value)}
                            className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
                            Titular/es
                          </label>
                          <input
                            type="text"
                            value={asiento.titulares || ''}
                            onChange={(e) => handleInputChange(`titularidad[${index}].titulares`, e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
                            DescripciÃ³n/Causa de AdquisiciÃ³n
                          </label>
                          <textarea
                            value={asiento.descripcion || asiento.tipo_procedimiento || ''}
                            onChange={(e) => handleInputChange(`titularidad[${index}].descripcion`, e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
                            ProporciÃ³n (%)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={asiento.proporcion || '100%'}
                              onChange={(e) => handleInputChange(`titularidad[${index}].proporcion`, e.target.value)}
                              className="w-full px-3 py-2 bg-blue-600 border border-blue-400 rounded-lg text-white font-bold text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 text-sm">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarjeta 4: Otros Rubros */}
            <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-rpi-gray/100 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rpi-blue/10 rounded-lg flex items-center justify-center">
                    <MonitorUp className="w-5 h-5 text-rpi-blue" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Otros Rubros</h2>
                    <p className="text-xs text-rpi-gray/600">GravÃ¡menes, cancelaciones y certificados</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* GravÃ¡menes */}
                {datosExtraidos.gravamenes && datosExtraidos.gravamenes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">GravÃ¡menes</h3>
                    {datosExtraidos.gravamenes.map((gravamen: Gravamen, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-red-700">{index + 1}</span>
                          </div>
                          <div className="flex-1 w-full">
                            <input
                              type="number"
                              placeholder="NÂ° de Asiento"
                              value={gravamen.asiento || index + 1}
                              onChange={(e) => handleInputChange(`gravamenes[${index}].asiento`, e.target.value)}
                              className="w-20 px-2 py-1.5 bg-white border border-gray-300 rounded text-sm font-mono"
                            />
                            <textarea
                              value={gravamen.descripcion || ''}
                              onChange={(e) => handleInputChange(`gravamenes[${index}].descripcion`, e.target.value)}
                              rows={2}
                              className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                              placeholder="DescripciÃ³n del gravamen..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cancelaciones */}
                {datosExtraidos.cancelaciones && datosExtraidos.cancelaciones.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Cancelaciones</h3>
                    {datosExtraidos.cancelaciones.map((cancelacion: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-emerald-700">âœ“</span>
                          </div>
                          <div className="flex-1 w-full">
                            <input
                              type="number"
                              placeholder="NÂ° de Asiento"
                              value={cancelacion.asiento || index + 1}
                              onChange={(e) => handleInputChange(`cancelaciones[${index}].asiento`, e.target.value)}
                              className="w-20 px-2 py-1.5 bg-white border border-gray-300 rounded text-sm font-mono"
                            />
                            <textarea
                              value={cancelacion.descripcion || 'CancelaciÃ³n de gravamen'}
                              onChange={(e) => handleInputChange(`cancelaciones[${index}].descripcion`, e.target.value)}
                              rows={2}
                              className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certificados */}
                {datosExtraidos.certificados && datosExtraidos.certificados.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Certificados</h3>
                    {datosExtraidos.certificados.map((certificado: Certificado, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-700">{index + 1}</span>
                          </div>
                          <div className="flex-1 w-full">
                            <input
                              type="number"
                              placeholder="NÂ° de Asiento"
                              value={certificado.asiento || index + 1}
                              onChange={(e) => handleInputChange(`certificados[${index}].asiento`, e.target.value)}
                              className="w-20 px-2 py-1.5 bg-white border border-gray-300 rounded text-sm font-mono"
                            />
                            <textarea
                              value={certificado.descripcion || ''}
                              onChange={(e) => handleInputChange(`certificados[${index}].descripcion`, e.target.value)}
                              rows={2}
                              className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Observaciones */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Observaciones Generales</h3>
                  <textarea
                    value={datosExtraidos.observaciones || ''}
                    onChange={(e) => handleInputChange('observaciones', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rpi-blue focus:border-rpi-blue resize-none"
                    placeholder="Agregue observaciones adicionales si es necesario..."
                  />
                </div>
              </div>
            </div>
          </form>
        ) : null}

        {/* Panel inferior - BotÃ³n Guardar (siempre visible cuando hay datos) */}
        {datosExtraidos && !cargando && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-rpi-gray/20 px-6 py-4 shadow-lg z-10 print:hidden">
            <button
              onClick={handleGuardar}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-rpi-blue text-white text-base font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/30"
            >
              <Save className="w-5 h-5" />
              <span>Guardar Digitalizado</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


