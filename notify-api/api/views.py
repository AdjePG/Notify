import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import Notes

from api.crud_model_methods import notes_methods

# Create your views here.

class NotesView (View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id: int = 0):
        if id > 0:
            if request.resolver_match.url_name == 'notesByCategory':
                return notes_methods.getNotesByCategory(id)
        else:
            return notes_methods.getNote()

    def post(self, request):
        return notes_methods.postNote(request)


    def put(self, request, id = 0):
        return notes_methods.putNote(request, id)

    def delete(self, request, id = 0):
        return notes_methods.delete(id)
