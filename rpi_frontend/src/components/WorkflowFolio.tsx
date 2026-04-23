import React from 'react'
import {
  FileText,
  Archive,
  Building2,
  UserCheck,
  Gavel,
  Edit3,
  Search,
  CheckCircle2,
  PenTool,
  FileCheck,
  Send,
  ArrowLeft,
  ArrowRight,
  RotateCcw
} from 'lucide-react'

// Tipos para los pasos del workflow
interface WorkflowStep {
  id: number
  phase: string
  rol: string
  descripcion: string
}

// Array de objetos constante con los 11 pasos estructurados por fase
export const WORKFLOW_STEPS: WorkflowStep[] = [
  // FASE 1: Ingesta y Bloqueo Preventivo
  {
    id: 1,
    phase: 'Ingesta y Bloqueo Preventivo',
    rol: 'Mesa de Entrada',
    descripcion: 'Recepción y verificación formal del documento de ingreso al registro'
  },
  {
    id: 2,
    phase: 'Ingesta y Bloqueo Preventivo',
    rol: 'Archivo',
    descripcion: 'Control de antecedentes y remisión al sistema registral'
  },
  {
    id: 3,
    phase: 'Ingesta y Bloqueo Preventivo',
    rol: 'Folio Mesa de Entradas',
    descripcion: 'Bloqueo registral y distribución a la Dirección correspondiente'
  },
  // FASE 2: Asignación y Calificación Jurídica
  {
    id: 4,
    phase: 'Asignación y Calificación Jurídica',
    rol: 'Directora',
    descripcion: 'Asignación de roles (Asesor, Inscriptor, Verificador) al expediente'
  },
  {
    id: 5,
    phase: 'Asignación y Calificación Jurídica',
    rol: 'Asesor',
    descripcion: 'Calificación jurídica del acto reglativo'
  },
  // FASE 3: Ejecución y Control de Calidad
  {
    id: 6,
    phase: 'Ejecución y Control de Calidad',
    rol: 'Inscriptor',
    descripcion: 'Confección de asientos en el Folio (Estado: Borrador)'
  },
  {
    id: 7,
    phase: 'Ejecución y Control de Calidad',
    rol: 'Verificador',
    descripcion: 'Control cruzado y corrección de asientos realizados'
  },
  {
    id: 8,
    phase: 'Ejecución y Control de Calidad',
    rol: 'Gestión Interna',
    descripcion: 'Colocación de sellos y constancias oficiales'
  },
  // FASE 4: Consolidación, Firmas y Despacho
  {
    id: 9,
    phase: 'Consolidación, Firmas y Despacho',
    rol: 'Asesor/Inscriptor',
    descripcion: 'Firmas preparatorias de sus intervenciones'
  },
  {
    id: 10,
    phase: 'Consolidación, Firmas y Despacho',
    rol: 'Asesor Final',
    descripcion: 'Firma definitiva - El borrador pasa a Asiento Definitivo'
  },
  {
    id: 11,
    phase: 'Consolidación, Firmas y Despacho',
    rol: 'Verificador/Mesa de Entradas',
    descripcion: 'Control de firmas, cierre del trámite y salida del expediente'
  }
]

// Mapeo de roles a íconos - Usando funciones para evitar problemas con nombres con espacios
const ROLE_ICONS: Record<string, React.ElementType> = {
  // FASE 1: Ingesta y Bloqueo Preventivo
  'Mesa de Entrada': FileText,
  'Archivo': Archive,
  'Folio Mesa de Entradas': Building2,
  // FASE 2: Asignación y Calificación Jurídica
  Directora: UserCheck,
  Asesor: Gavel,
  // FASE 3: Ejecución y Control de Calidad
  Inscriptor: Edit3,
  Verificador: Search,
  'Gestión Interna': CheckCircle2,
  // FASE 4: Consolidación, Firmas y Despacho
  'Asesor/Inscriptor': PenTool,
  'Asesor Final': FileCheck,
  'Verificador/Mesa de Entradas': Send
}

// Función segura para obtener ícono por rol
const getStepIcon = (rol: string, isActive: boolean): React.ReactNode => {
  const IconComponent = ROLE_ICONS[rol] || FileText
  return isActive ? (
    <IconComponent className="w-6 h-6 text-white" />
  ) : (
    <IconComponent className={`w-6 h-6 text-${rol === 'Archivo' ? 'blue-500' : rol === 'Directora' ? 'indigo-500' : rol === 'Inscriptor' ? 'purple-500' : 'gray-500'}`} />
  )
}

// Identificar el índice del inicio de cada fase
const getPhaseStartIndex = (phase: string, allSteps: WorkflowStep[]): number => {
  return allSteps.findIndex(step => step.phase === phase)
}

const WorkflowFolio: React.FC = () => {
  // Estado local para controlar el paso actual (iniciando en 0)
  const [activeStep, setActiveStep] = React.useState(0)

  const totalSteps = WORKFLOW_STEPS.length
  const currentStep = WORKFLOW_STEPS[activeStep]

  // Manejadores de navegación
  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setActiveStep(0)
  }

  // Agrupar pasos por fases
  const phases = Array.from(
    new Set(WORKFLOW_STEPS.map(step => step.phase))
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Panel Izquierdo: Stepper con todos los pasos agrupados por fases */}
      <div className="w-2/3 bg-gray-50 border-r border-rpi-gray/20 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Flujo de Trámite Registral</h1>
              <p className="text-gray-600 mt-1">Visualización del ciclo de vida del folio</p>
            </div>
            <div className="px-4 py-2 bg-rpi-blue/10 text-rpi-blue rounded-lg text-sm font-medium">
              Paso {activeStep + 1} de {totalSteps}
            </div>
          </div>

          {/* Stepper horizontal agrupado por fases */}
          <div className="relative">
            {/* Línea de conexión */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-300 via-blue-400 to-rpi-blue -translate-y-1/2 z-0" />

            <div className="space-y-12 relative z-10">
              {phases.map((phase, phaseIndex) => {
                const phaseStartIndex = getPhaseStartIndex(phase, WORKFLOW_STEPS)
                const isPastPhase = phaseIndex < phaseIndex

                return (
                  <div key={phase} className="relative">
                    {/* Encabezado de fase */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-1 h-8 rounded-full ${
                        isPastPhase ? 'bg-emerald-500' : 'bg-rpi-blue'
                      }`} />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{phase}</h3>
                        <p className="text-sm text-gray-500">
                          Pasos {phaseStartIndex + 1} - {phaseStartIndex + 3}
                        </p>
                      </div>
                    </div>

                    {/* Pasos de la fase */}
                    <div className="pl-16 space-y-3">
                      {WORKFLOW_STEPS
                        .filter(step => step.phase === phase)
                        .map((step, stepIndex) => {
                          const stepNumber = stepIndex + phaseStartIndex

                          return (
                            <div
                              key={step.id}
                              className={`flex gap-4 p-3 rounded-xl border-2 transition-all duration-300 ${
                                activeStep === stepNumber
                                  ? 'bg-blue-50 border-rpi-blue shadow-md scale-105'
                                  : stepNumber < activeStep
                                  ? 'bg-white border-emerald-200 shadow-sm'
                                  : 'bg-white border-gray-200 opacity-70'
                              }`}
                            >
                              {/* Nodo del paso */}
                              <div className="flex-shrink-0">
                                <div
                                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    activeStep === stepNumber
                                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-600 shadow-lg scale-110'
                                      : stepNumber < activeStep
                                      ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 border-emerald-300'
                                      : 'bg-gray-100 border-gray-300'
                                  }`}
                                >
                                  {getStepIcon(step.rol, activeStep === stepNumber)}
                                </div>
                              </div>

                              {/* Contenido del paso */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-xs font-semibold ${
                                    activeStep === stepNumber ? 'text-rpi-blue' : 'text-gray-500'
                                  } uppercase tracking-wide`}>
                                    {step.rol}
                                  </span>
                                  <span className="text-xs font-mono text-gray-400">#{step.id}</span>
                                </div>
                                <h4 className="text-base font-semibold text-gray-900 mb-1">
                                  {step.descripcion}
                                </h4>
                              </div>

                              {/* Indicador de completado */}
                              {stepNumber < activeStep && (
                                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tarjeta Grande con Detalle del Paso Activo */}
          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-lg border border-rpi-blue/20 overflow-hidden">
              {/* Header de la tarjeta */}
              <div className="p-6 bg-gradient-to-r from-rpi-blue to-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100 uppercase tracking-wide font-medium">
                        {currentStep ? 'Detalle del Paso' : 'Esperando paso activo'}
                      </p>
                      <p className="text-white text-2xl font-bold">
                        {currentStep ? `${currentStep.id}. ${currentStep.phase}` : 'Selecciona un paso'}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white/20 rounded-lg text-white font-medium">
                    {currentStep ? `Paso ${currentStep.id}` : '—'}
                  </div>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6 space-y-6">
                {currentStep ? (
                  <>
                    {/* Fase actual en tipografía grande */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-rpi-blue uppercase tracking-wide">
                        FASE ACTUAL
                      </p>
                      <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                        {currentStep.phase}
                      </h2>
                    </div>

                    {/* Rol con badge visual */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Rol Asignado
                        </p>
                        <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-semibold shadow-md">
                          {currentStep.rol}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-gray-900">
                        {currentStep.rol}
                      </p>
                    </div>

                    {/* Descripción con transiciones suaves */}
                    <div
                      className={`transition-all duration-300 ${
                        activeStep === currentStep.id
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-50 translate-y-2'
                      }`}
                    >
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Descripción del Proceso
                        </p>
                        <div className="bg-rpi-blue/5 rounded-xl p-4 border border-rpi-blue/20">
                          <p className="text-base text-gray-700 leading-relaxed">
                            {currentStep.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Estado del paso */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            activeStep >= currentStep.id - 1
                              ? 'bg-emerald-500 animate-pulse'
                              : 'bg-gray-300'
                          }`}
                        />
                        <p className="text-sm text-gray-600">
                          {activeStep >= currentStep.id - 1
                            ? 'Paso Completado'
                            : 'Pendiente de Ejecución'}
                        </p>
                      </div>
                      <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
                        {Math.round((activeStep / (totalSteps - 1)) * 100)}% Completado
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">Selecciona un paso del flujo para ver su detalle</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho: Botones de navegación y detalle del paso actual */}
      <div className="w-1/3 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-y-auto flex flex-col">
        {/* Header con botones de navegación */}
        <div className="p-6 bg-gradient-to-r from-rpi-blue to-blue-800 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Navegación</h2>
              <p className="text-blue-100 text-sm">Controla el avance del trámite</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{activeStep + 1}</p>
              <p className="text-blue-200 text-sm">de {totalSteps} pasos</p>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handlePrevious}
              disabled={activeStep === 0}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/10 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={activeStep === totalSteps - 1}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/10 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleRestart}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </button>
          </div>
        </div>

        {/* Contenido del panel derecho */}
        <div className="flex-1 p-6">
          {currentStep ? (
            <div className="bg-white rounded-2xl shadow-lg border border-rpi-blue/20 overflow-hidden">
              <div
                className={`p-5 ${
                  currentStep.phase === 'Ingesta y Bloqueo Preventivo'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                    : currentStep.phase === 'Asignación y Calificación Jurídica'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700'
                    : currentStep.phase === 'Ejecución y Control de Calidad'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700'
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700'
                } text-white`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      {getStepIcon(currentStep.rol, true)}
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-90">Paso {currentStep.id}</p>
                      <p className="text-xs opacity-75">{currentStep.phase}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    {currentStep.rol}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {currentStep.descripcion}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-rpi-blue/5 rounded-xl border border-rpi-blue/10">
                    <p className="text-xs text-rpi-blue/60 uppercase tracking-wide mb-1">
                      Fase
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {currentStep.phase}
                    </p>
                  </div>
                  <div className="p-4 bg-emerald/5 rounded-xl border border-emerald/10">
                    <p className="text-xs text-emerald/60 uppercase tracking-wide mb-1">
                      Estado
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {activeStep >= currentStep.id - 1 ? 'Completado' : 'Pendiente'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-rpi-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-rpi-blue/60" />
              </div>
              <p className="text-gray-600">
                Selecciona un paso del flujo para ver sus detalles
              </p>
            </div>
          )}
        </div>

        {/* Footer con estadísticas */}
        <div className="p-4 bg-gray-50 border-t border-rpi-gray/20">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Avance: <strong className="text-rpi-blue">{Math.round((activeStep / (totalSteps - 1)) * 100)}%</strong></span>
            <span>Pasos completados: <strong className="text-emerald-600">{activeStep}</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowFolio
