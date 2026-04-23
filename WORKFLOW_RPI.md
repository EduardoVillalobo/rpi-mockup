# Contexto: Flujo Operativo del Trámite de Folio Registral (RPI)

Estamos construyendo un componente visual interactivo en React + Tailwind CSS llamado `WorkflowFolio.tsx`. Este componente explicará a los directivos cómo viaja un trámite por el Registro.

## Fases y Pasos del Flujo
El sistema tiene 4 fases lógicas y 11 pasos secuenciales:

**FASE 1: Ingesta y Bloqueo Preventivo**
1. Mesa de Entrada: Recepción y verificación formal.
2. Archivo: Control de antecedentes y remisión.
3. Folio Mesa de Entradas: Bloqueo registral y distribución a la Dirección.

**FASE 2: Asignación y Calificación Jurídica**
4. Directora: Asignación de roles (Asesor, Inscriptor, Verificador).
5. Asesor: Calificación jurídica del acto.

**FASE 3: Ejecución y Control de Calidad**
6. Inscriptor: Confección de asientos en el Folio (Estado: Borrador).
7. Verificador: Control cruzado y corrección de asientos.
8. Gestión Interna: Colocación de sellos y constancias.

**FASE 4: Consolidación, Firmas y Despacho**
9. Asesor/Inscriptor: Firmas preparatorias de sus intervenciones.
10. Asesor Final: Firma definitiva (El borrador pasa a Asiento Definitivo).
11. Verificador/Mesa de Entradas: Control de firmas, cierre y salida del trámite.

## Reglas de Diseño (UI/UX)
- Usar Tailwind CSS. La paleta debe ser institucional (Azules, Grises, y acentos para indicar el paso activo).
- El componente debe tener un "Stepper" o línea de tiempo visual horizontal o vertical.
- Debe existir una tarjeta de "Detalle del Paso Actual" que cambie dinámicamente según el paso seleccionado.