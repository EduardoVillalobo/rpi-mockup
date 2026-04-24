import React, { useState } from 'react'
import {
  ArrowLeft,
  FileCheck2,
  FileText,
  Calendar,
  File,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react'

// Tipos
interface Matricula {
  id: string
  valor: string
}

interface NuevoTramiteProps {
  onCancel: () => void
  onSubmit: (datos: any) => void
}

const NuevoTramite: React.FC<NuevoTramiteProps> = ({ onCancel, onSubmit }) => {
  // Paso 1: Estado para el tipo de trámite (iniciado en 'Compra Venta')
  const [tramiteTipo, setTramiteTipo] = useState<string>('Compra Venta')
  const [matriculas, setMatriculas] = useState<Matricula[]>([])
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null)

  // Estado para los campos del formulario
  const [fechaIngreso, setFechaIngreso] = useState<string>(new Date().toISOString().split('T')[0])
  const [numeroOrden, setNumeroOrden] = useState<string>('ORD-2026-0001')
  const [prioridad, setPrioridad] = useState<string>('Normal')
  const [escrituraPublica, setEscrituraPublica] = useState<string>('')
  const [fechaEscritura, setFechaEscritura] = useState<string>('')
  const [escribania, setEscribania] = useState<string>('')
  const [titular, setTitular] = useState<string>('')
  const [solicitante, setSolicitante] = useState<string>('')
  const [divisionInterviniente, setDivisionInterviniente] = useState<string>('División Folio')

  // Paso 2: Cabecera y Selector Principal
  const tiposTramite = [
    'Compra Venta',
    'Certificado de Dominio',
    'Constitución de Hipoteca',
    'Libertación',
    'Compartimentación',
    'Embargo',
    'Exención de Gravamen'
  ]

  // Paso 3: Formulario 'Compra Venta' con 3 bloques
  if (tramiteTipo === 'Compra Venta') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Cabecera */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={onCancel}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-bold">Crear Nuevo Trámite</h1>
                  <p className="text-blue-200 text-sm">Alta de Trámite Registral</p>
                </div>
              </div>

              <div className="px-4 py-2 bg-white/20 rounded-lg text-sm">
                <Clock className="w-4 h-4 inline mr-2" />
                {new Date().toLocaleTimeString('es-ES')}
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 py-6">
          {/* Selector Principal de Tipo de Trámite */}
          <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Trámite
            </label>
            <div className="relative">
              <select
                value={tramiteTipo}
                onChange={(e) => setTramiteTipo(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                style={{ backgroundImage: 'none', paddingLeft: '44px' }}
              >
                {tiposTramite.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Mensaje si no es Compra Venta */}
          {tramiteTipo !== 'Compra Venta' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-amber-800 font-medium">Formulario en desarrollo</p>
                <p className="text-amber-700 text-sm mt-1">
                  El formulario para el tipo de trámite <strong>{tramiteTipo}</strong> aún está siendo desarrollado.
                  Por favor, selecciona <strong>"Compra Venta"</strong> para completar el trámite.
                </p>
              </div>
            </div>
          )}

          {/* Formulario 'Compra Venta' */}
          {tramiteTipo === 'Compra Venta' && (
            <div className="space-y-6">
              {/* Bloque A: Datos de Control */}
              <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Datos de Control
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Fecha de Ingreso */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Ingreso
                    </label>
                    <input
                      type="datetime-local"
                      value={fechaIngreso}
                      onChange={(e) => setFechaIngreso(e.target.value)}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  {/* N° de Orden */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      N° de Orden
                    </label>
                    <input
                      type="text"
                      value={numeroOrden}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  {/* Prioridad */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <div className="relative">
                      <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="Normal">Normal</option>
                        <option value="Urgente">Urgente</option>
                        <option value="Despacho Especial">Despacho Especial</option>
                      </select>
                      <Zap className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque B: Datos del Documento y Sujetos */}
              <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Datos del Documento y Sujetos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Escritura Pública N° */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Escritura Pública N°
                    </label>
                    <input
                      type="text"
                      value={escrituraPublica}
                      onChange={(e) => setEscrituraPublica(e.target.value)}
                      placeholder="Ej: 12345"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Fecha Escritura */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha Escritura
                    </label>
                    <input
                      type="date"
                      value={fechaEscritura}
                      onChange={(e) => setFechaEscritura(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Escribanía */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Escribanía
                    </label>
                    <input
                      type="text"
                      value={escribania}
                      onChange={(e) => setEscribania(e.target.value)}
                      placeholder="Ej: Notaría N° 5"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Titular */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Titular
                    </label>
                    <input
                      type="text"
                      value={titular}
                      onChange={(e) => setTitular(e.target.value)}
                      placeholder="Nombre completo del titular"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Solicitante */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Solicitante
                    </label>
                    <input
                      type="text"
                      value={solicitante}
                      onChange={(e) => setSolicitante(e.target.value)}
                      placeholder="Nombre del solicitante"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Bloque C: Vinculación, Asignación y Adjuntos */}
              <div className="bg-white rounded-xl shadow-sm border border-rpi-gray/20 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-600" />
                  Vinculación, Asignación y Adjuntos
                </h3>

                <div className="space-y-6">
                  {/* Matrícula(s) de Folio Real */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Matrícula(s) de Folio Real <span className="text-gray-400 font-normal">(Opcional)</span>
                    </label>

                    <div className="flex flex-col md:flex-row gap-3 mb-4">
                      <input
                        type="text"
                        placeholder="Ingrese matrícula (ej: 88000)"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector(
                            'input[type="text"][placeholder*="matrícula"]'
                          ) as HTMLInputElement
                          if (input && input.value) {
                            setMatriculas([...matriculas, { id: Date.now().toString(), valor: input.value }])
                            input.value = ''
                          }
                        }}
                        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Agregar
                      </button>
                    </div>

                    {/* Chips de matrículas agregadas */}
                    <div className="flex flex-wrap gap-2">
                      {matriculas.map((matricula) => (
                        <div
                          key={matricula.id}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer group"
                          onClick={() =>
                            setMatriculas(matriculas.filter((m) => m.id !== matricula.id))
                          }
                        >
                          <FileText className="w-4 h-4" />
                          <span>{matricula.valor}</span>
                          <button
                            className="p-1 hover:bg-blue-200 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              setMatriculas(matriculas.filter((m) => m.id !== matricula.id))
                            }}
                          >
                            <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Asignar División Interviniente */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Asignar División Interviniente
                    </label>
                    <div className="relative">
                      <select
                        value={divisionInterviniente}
                        onChange={(e) => setDivisionInterviniente(e.target.value)}
                        className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="División Folio">División Folio</option>
                        <option value="División Calificación">División Calificación</option>
                        <option value="División Archivo">División Archivo</option>
                      </select>
                      <FileCheck2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
                    </div>
                  </div>

                  {/* Área de carga de archivos */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Archivos/Documentos
                    </label>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-1">
                        Haz clic para subir archivos o arrástralos aquí
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        Formatos admitidos: .ZIP, .PDF (máx. 10MB)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".zip,.pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setArchivoSeleccionado(e.target.files[0])
                          }
                        }}
                        className="hidden"
                      />
                      <button
                        onClick={() => document.querySelector('input[type="file"]')?.click()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Seleccionar Archivo
                      </button>
                      {archivoSeleccionado && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-blue-700">
                          <File className="w-5 h-5" />
                          <span className="text-sm font-medium">{archivoSeleccionado.name}</span>
                          <button
                            onClick={() => setArchivoSeleccionado(null)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer con acciones */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-rpi-gray/20 px-6 py-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Botón Cancelar */}
            <button
              onClick={onCancel}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancelar
            </button>

            {/* Botón Generar Trámite */}
            <button
              onClick={() => onSubmit({
                tipo: tramiteTipo,
                fechaIngreso,
                numeroOrden,
                prioridad,
                escrituraPublica,
                fechaEscritura,
                escribania,
                titular,
                solicitante,
                divisionInterviniente,
                matriculas,
                archivo: archivoSeleccionado
              })}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Generar Trámite
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Fallback (si el tipo no es 'Compra Venta')
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Formulario en desarrollo
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          El formulario para el tipo de trámite seleccionado aún está siendo desarrollado.
          Por favor, contacte a soporte técnico.
        </p>
        <button
          onClick={onCancel}
          className="mt-6 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-colors"
        >
          Volver
        </button>
      </div>
    </div>
  )
}

export default NuevoTramite
