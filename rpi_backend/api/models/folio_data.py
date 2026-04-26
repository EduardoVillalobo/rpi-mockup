"""
Tipo de datos para Document (Folio)
Basado en la estructura JSON real del API
"""

from typing import Optional, List, Dict, Any
from datetime import date


class Nomenclatura:
    """Clase para los datos de nomenclatura"""
    def __init__(
        self,
        departamento: Optional[str] = None,
        distrito: Optional[str] = None,
        seccion: Optional[str] = None,
        parcela: Optional[str] = None,
        manzana: Optional[str] = None
    ):
        self.departamento = departamento
        self.distrito = distrito
        self.seccion = seccion
        self.parcela = parcela
        self.manzana = manzana


class TitularidadDominio:
    """Clase para los datos de titularidad sobre dominio"""
    def __init__(
        self,
        texto: Optional[str] = None,
        proporcion: Optional[str] = None,
        tipo_procedimiento: Optional[str] = None
    ):
        self.texto = texto
        self.proporcion = proporcion
        self.tipo_procedimiento = tipo_procedimiento


class Superficiario:
    """Clase para superficies (si existe en el JSON)"""
    def __init__(
        self,
        superficie: Optional[str] = None,
        porcentaje: Optional[str] = None,
        unidad: Optional[str] = None
    ):
        self.superficie = superficie
        self.porcentaje = porcentaje
        self.unidad = unidad


class Gravamen:
    """Clase para gravámenes (hipotecas, etc.)"""
    def __init__(
        self,
        texto: Optional[str] = None,
        tipo_procedimiento: Optional[str] = None
    ):
        self.texto = texto
        self.tipo_procedimiento = tipo_procedimiento


class Certificado:
    """Clase para certificados"""
    def __init__(
        self,
        texto: Optional[str] = None,
        tipo_procedimiento: Optional[str] = None
    ):
        self.texto = texto
        self.tipo_procedimiento = tipo_procedimiento


class Document:
    """
    Clase principal que representa un Documento (Folio Registral)

    Estructura basada en el JSON real del API:
    {
        "archivo": str,
        "matricula": str,
        "departamento_nombre": str,
        "antecedente_dominio": str,
        "nomenclatura": {...},
        "titulares_dni": [...],
        "titularidad_dominio": [...],
        "superficiario": [...],  # Array (puede estar vacío)
        "gravamenes": [...],
        "cancelaciones": [...],
        "observaciones": str | [...],  # String o array de strings
        "certificados": [...]
    }
    """

    def __init__(
        self,
        archivo: Optional[str] = None,
        matricula: Optional[str] = None,
        departamento_nombre: Optional[str] = None,
        antecedente_dominio: Optional[str] = None,
        nomenclatura: Optional[Nomenclatura] = None,
        titulares_dni: Optional[List[str]] = None,
        titularidad_dominio: Optional[List[TitularidadDominio]] = None,
        superficiario: Optional[List[Superficiario]] = None,
        gravamenes: Optional[List[Gravamen]] = None,
        cancelaciones: Optional[List[Any]] = None,
        observaciones: Optional[str | List[str]] = None,
        certificados: Optional[List[Certificado]] = None
    ):
        self.archivo = archivo
        self.matricula = matricula
        self.departamento_nombre = departamento_nombre
        self.antecedente_dominio = antecedente_dominio

        if nomenclatura:
            self.nomenclatura = Nomenclatura(
                departamento=nomenclatura.departamento,
                distrito=nomenclatura.distrito,
                seccion=nomenclatura.seccion,
                parcela=nomenclatura.parcela,
                manzana=nomenclatura.manzana
            )

        self.titulares_dni = titulares_dni
        self.titularidad_dominio = titularidad_dominio

        if superficiario:
            self.superficiario = [
                Superficiario(
                    superficie=s.superficie,
                    porcentaje=s.porcentaje,
                    unidad=s.unidad
                )
                for s in superficiario
            ]

        self.gravamenes = gravamenes
        self.cancelaciones = cancelaciones
        self.observaciones = observaciones

        if certificados:
            self.certificados = [
                Certificado(
                    texto=c.texto,
                    tipo_procedimiento=c.tipo_procedimiento
                )
                for c in certificados
            ]

    def to_dict(self) -> Dict[str, Any]:
        """Convierte el objeto a dictionary para JSON serialization"""
        result: Dict[str, Any] = {
            "archivo": self.archivo,
            "matricula": self.matricula,
            "departamento_nombre": self.departamento_nombre,
            "antecedente_dominio": self.antecedente_dominio
        }

        if self.nomenclatura:
            result["nomenclatura"] = {
                "departamento": self.nomenclatura.departamento,
                "distrito": self.nomenclatura.distrito,
                "seccion": self.nomenclatura.seccion,
                "parcela": self.nomenclatura.parcela,
                "manzana": self.nomenclatura.manzana
            }

        if self.titulares_dni:
            result["titulares_dni"] = self.titulares_dni

        if self.titularidad_dominio:
            result["titularidad_dominio"] = [
                {
                    "texto": t.texto,
                    "proporcion": t.proporcion,
                    "tipo_procedimiento": t.tipo_procedimiento
                }
                for t in self.titularidad_dominio
            ]

        if self.superficiario:
            result["superficiario"] = [
                {
                    "superficie": s.superficie,
                    "porcentaje": s.porcentaje,
                    "unidad": s.unidad
                }
                for s in self.superficiario
            ]

        if self.gravamenes:
            result["gravamenes"] = [
                {
                    "texto": g.texto,
                    "tipo_procedimiento": g.tipo_procedimiento
                }
                for g in self.gravamenes
            ]

        if self.cancelaciones:
            result["cancelaciones"] = [
                {
                    "tipo_procedimiento": c.tipo_procedimiento
                }
                for c in self.cancelaciones
            ]

        if self.observaciones:
            result["observaciones"] = self.observaciones

        if self.certificados:
            result["certificados"] = [
                {
                    "texto": c.texto,
                    "tipo_procedimiento": c.tipo_procedimiento
                }
                for c in self.certificados
            ]

        return result
