import json

from django.http import JsonResponse

from api.models import Notes

# GET methods
def getNote ():
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

def getNotesByCategory (id: int):
    notes = list(Notes.objects.filter(category_id=id).values())
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

# POST methods

def postNote (request):
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

# PUT methods

def putNote (request, id: int):
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

# DELETE methods

def deleteNote (id: int):
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