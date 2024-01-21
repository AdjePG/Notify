from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from api.crud_model_methods import note_methods
from api.crud_model_methods import category_methods

# Create your views here.

class NotesView (View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id: int = 0):
        if id > 0:
            if request.resolver_match.url_name == 'notesByCategory':
                return note_methods.getNotesByCategory(id)
        else:
            return note_methods.getNotes()

    def post(self, request):
        return note_methods.postNote(request)

    def put(self, request, id = 0):
        return note_methods.putNote(request, id)

    def delete(self, request, id = 0):
        return note_methods.deleteNote(id)

class CategoriesView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        return category_methods.getCategories()

    def post(self, request):
        return category_methods.postCategory(request)

    def put(self, request, id=0):
        return category_methods.putCategory(request, id)

    def delete(self, request, id=0):
        return category_methods.deleteCategory(id)
