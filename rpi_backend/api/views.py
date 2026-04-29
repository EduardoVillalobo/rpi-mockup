import json
import os

from django.http import JsonResponse

# Datos hardcodeados de trámites
TRAMITES_DATA = [
    {
        "id": 432,
        "folio": "14.125",
        "tramite": "Compraventa",
        "estado": "En Calificación",
        "semaforo": "rojo",
        "vencimiento_dias": 5,
        "fecha_inicio": "2024-06-01"
    },
    {
        "id": 433,
        "folio": "4.523",
        "tramite": "Donación",
        "estado": "En Proceso",
        "semaforo": "amarillo",
        "vencimiento_dias": 12,
        "fecha_inicio": "2024-06-01"
    },
    {
        "id": 434,
        "folio": "10.257",
        "tramite": "Reserva de usufructo",
        "estado": "Para Firma",
        "semaforo": "verde",
        "vencimiento_dias": 25,
        "fecha_inicio": "2024-12-20"
    },
    {
        "id": 435,
        "folio": "62.003",
        "tramite": "Toma de Razón",
        "estado": "En Calificación",
        "semaforo": "rojo",
        "vencimiento_dias": 3,
        "fecha_inicio": "2026-04-10"
    },
    {
        "id": 436,
        "folio": "2.707",
        "tramite": "Hipoteca",
        "estado": "Expedido",
        "semaforo": "verde",
        "vencimiento_dias": 45,
        "fecha_inicio": "2024-04-20"
    }
]

def get_folio(request, matricula):
    """Endpoint para obtener un folio por matrícula desde archivo JSON

    Busca el archivo api/mock_data/folio_<matricula>.json y lo devuelve.
    Si el archivo no existe, devuelve error 404.
    """
    # Construir ruta del archivo
    base_path = os.path.join(os.path.dirname(__file__), 'mock_data')
    file_path = os.path.join(base_path, f'folio_{matricula}.json')
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            folio = json.load(f)
        
        return JsonResponse(folio)

    except FileNotFoundError:
        return JsonResponse({
            "error": "Folio no encontrado",
            "matricula": matricula
        }, status=404)

    except json.JSONDecodeError:
        return JsonResponse({
            "error": "Error al leer el archivo del folio",
            "matricula": matricula
        }, status=500)


def get_tramites(request):
    """Endpoint para obtener todos los trámites"""
    return JsonResponse(TRAMITES_DATA, safe=False)
