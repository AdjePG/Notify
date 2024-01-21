from django.urls import  path

from api.views import NotesView
from api.views import CategoriesView

urlpatterns = [
    path('notes/', NotesView.as_view(), name='notes'),
    path('notes/<int:id>', NotesView.as_view(), name='notesById'),
    path('notesByCategory/<int:id>', NotesView.as_view(), name='notesByCategory'),

    path('categories/', CategoriesView.as_view(), name='categories'),
    path('categories/<int:id>', CategoriesView.as_view(), name='categoriesById'),
]