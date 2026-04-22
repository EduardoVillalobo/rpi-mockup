# Tech Stack & Standards - RPI Project

## Frontend (React)
- **Framework:** React 18 + Vite (TypeScript estricto).
- **Styling:** Tailwind CSS v3.
- **Components:** Crear componentes funcionales. No usar Clases. Preferir composición sobre herencia.
- **State Management:** Usar React Context para estado global simple. Hooks nativos (`useState`, `useReducer`) para estado local.
- **Icons:** Usar `lucide-react`.

## Backend (Django)
- **Framework:** Django 5.0 + Django REST Framework (DRF).
- **Architecture:** Patrón Fat Models, Thin Views. Toda la lógica de negocio compleja debe vivir en los Modelos o en un archivo `services.py`, no en `views.py`.
- **API Standard:** Usar ViewSets y Routers para mantener URLs limpias. Devolver respuestas JSON estructuradas.

## Reglas Generales
1. **Idioma:** Todo el código (variables, funciones, comentarios) debe estar en Español para mantener el dominio ubicuo del Registro de la Propiedad.
2. **Estilos Institucionales:** La paleta principal de Tailwind debe extenderse con: `rpi-blue: #1e40af`, `rpi-gray: #64748b`.