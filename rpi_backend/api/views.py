import json
import os

from django.http import JsonResponse

# Datos hardcodeados de trámites
TRAMITES_DATA = [
    {
        "id": 1,
        "folio": "AB123CD",
        "trámite": "Expediente de Compraventa",
        "estado": "En Calificación",
        "semaforo": "rojo",
        "vencimiento_dias": 5
    },
    {
        "id": 2,
        "folio": "AB123CD",
        "trámite": "Pago de Derechos",
        "estado": "En Proceso",
        "semaforo": "amarillo",
        "vencimiento_dias": 12
    },
    {
        "id": 3,
        "folio": "EF456GH",
        "trámite": "Solicitud de Encomienda",
        "estado": "Para Firma",
        "semaforo": "verde",
        "vencimiento_dias": 25
    },
    {
        "id": 4,
        "folio": "EF456GH",
        "trámite": "Inspección Preliminar",
        "estado": "En Calificación",
        "semaforo": "rojo",
        "vencimiento_dias": 3
    },
    {
        "id": 5,
        "folio": "EF456GH",
        "trámite": "Publicación de Edicto",
        "estado": "Completado",
        "semaforo": "verde",
        "vencimiento_dias": 45
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
