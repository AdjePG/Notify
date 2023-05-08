from django.urls import  path

from api.views import NotesView

urlpatterns = [
    path('notes/', NotesView.as_view(), name='notes'),
    path('notesByCategory/<int:id>', NotesView.as_view(), name='notesByCategory')
]