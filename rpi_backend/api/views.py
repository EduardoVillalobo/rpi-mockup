from django.http import JsonResponse


# Datos hardcodeados de folios
FOLIOS_DATA = {
    "AB123CD": {
        "matricula": "AB123CD",
        "departamento": "Departamento Centro",
        "estado": "Jalisco",
        "asientos": [
            {
                "rubro": "Compraventa",
                "fecha": "2024-01-15",
                "titular": "Juan Pérez",
                "porcentaje": 100
            },
            {
                "rubro": "Constitución de Hipoteca",
                "fecha": "2024-02-20",
                "titular": "Banco Nacional",
                "porcentaje": 75
            }
        ]
    },
    "EF456GH": {
        "matricula": "EF456GH",
        "departamento": "Departamento Norte",
        "estado": "Nuevo León",
        "asientos": [
            {
                "rubro": "Permuta",
                "fecha": "2024-03-10",
                "titular": "María Gómez",
                "porcentaje": 50
            }
        ]
    }
}


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
    """Endpoint para obtener un folio por matrícula"""
    folio = FOLIOS_DATA.get(matricula)

    if folio:
        return JsonResponse(folio)
    else:
        return JsonResponse({
            "error": "Folio no encontrado",
            "matricula": matricula
        }, status=404)


def get_tramites(request):
    """Endpoint para obtener todos los trámites"""
    return JsonResponse(TRAMITES_DATA, safe=False)
