from django.urls import path
from . import views

urlpatterns = [
    path('folios/<str:matricula>/', views.get_folio, name='folio'),
    path('tramites/', views.get_tramites, name='tramites'),
]
