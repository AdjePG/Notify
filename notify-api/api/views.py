import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import Notes

# Create your views here.

class NotesView (View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id = 0):
        if id > 0:
            notes = list(Notes.objects.filter(id=id).values())
            if len(notes) > 0:
                data = {
                    'retcode': 0,
                    'message': "Success",
                    'note': notes[0]
                }
            else:
                data = {
                    'retcode': 1,
                    'message': "Note not found..."
                }
            return JsonResponse(data)
        else:
            notes = list(Notes.objects.values())
            if len(notes) > 0:
                data = {
                    'retcode': 0,
                    'message': "Success",
                    'notes': notes
                }
            else:
                data = {
                    'retcode': 1,
                    'message': "Notes not found..."
                }
            return JsonResponse(data)

    def post(self, request):
        jd = json.loads(request.body)

        Notes.objects.create(
            subject=jd['subject'],
            message=jd['message'],
            post_date=jd['post_date']
        )

        data = {
            'retcode': 0,
            'message': "Success",
        }

        return JsonResponse(data)

    def put(self, request, id = 0):
        jd = json.loads(request.body)
        notes = list(Notes.objects.filter(id=id).values())

        if len(notes) > 0:
            note = Notes.objects.get(id=id)
            note.subject = jd['subject']
            note.message = jd['message']
            note.save()

            data = {
                'retcode': 0,
                'message': "Success",
            }
        else:
            data = {
                'retcode': 1,
                'message': "Note not found..."
            }

        return JsonResponse(data)

    def delete(self, request, id = 0):
        notes = list(Notes.objects.filter(id=id).values())

        if len(notes) > 0:
            Notes.objects.filter(id=id).delete()

            data = {
                'retcode': 0,
                'message': "success",
            }
        else:
            data = {
                'retcode': 1,
                'message': "note not found..."
            }

        return JsonResponse(data)