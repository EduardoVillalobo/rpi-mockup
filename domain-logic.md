# Domain Driven Design - RPI (Glosario y Reglas)

Este sistema modela el Registro de la Propiedad Inmobiliaria. 
Debes usar SIEMPRE estos términos en el código y base de datos:

- **Folio Real (Matrícula):** La entidad principal. Es la "hoja de vida" de un inmueble. (Model: `Folio`)
- **Asiento Registral:** Cada anotación dentro de un folio (una compra, un embargo). NUNCA usar la palabra "registro" o "log" para referirse a esto. (Model: `Asiento`)
- **Tracto Sucesivo:** La cadena histórica. Un Asiento nuevo DEBE estar relacionado lógicamente con el titular vigente.
- **Prioridad Registral:** Todo trámite ingresa con un sello de tiempo. (Campo: `fecha_ingreso` con microsegundos).

**Regla de Oro (Inmutabilidad):** NUNCA generar consultas SQL `DELETE` o `UPDATE` destructivas sobre la tabla `Asientos`. Si hay un error, el sistema genera un nuevo Asiento rectificatorio (Soft Delete lógico).