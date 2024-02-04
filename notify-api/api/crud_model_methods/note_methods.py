import json

from django.http import JsonResponse

from api.models import Note, Category

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


# GET methods
@permission_classes([IsAuthenticated])
def getNotes (request):
    # It'll return a list of all notes
    notes = list(Note.objects.filter(user=request.user.id).values())

    data = {
        'retcode': 0,
        'message': "Success",
        'notes': notes
    }
    return JsonResponse(data)


def getNotesByCategory (id: int):
    # It'll return a list of notes which their category_id
    # is the same as requested
    notes = list(Note.objects.filter(category_id=id).values())

    data = {
        'retcode': 0,
        'message': "Success",
        'notes': notes
    }

    return JsonResponse(data)


# POST methods
def postNote (request):
    # Gets the body of the request to create a note with its values
    jd = json.loads(request.body)

    # Checking if the selected category exists or not
    # If not, we add a None value to category_id
    if Category.objects.filter(id=jd['category_id']).exists():
        category_id = jd['category_id']
    else:
        category_id = None

    Note.objects.create(
        user=request.user.id,
        subject=jd['subject'],
        message=jd['message'],
        post_date=jd['post_date'],
        category_id=category_id
    )

    data = {
        'retcode': 0,
        'message': "Success",
    }

    return JsonResponse(data)


# PUT methods
def putNote (request, id: int):
    jd = json.loads(request.body)
    notes = list(Note.objects.filter(id=id).values())

    if Category.objects.filter(id=jd['category_id']).exists():
        category_id = jd['category_id']
    else:
        category_id = None

    # Checking if the selected note exists or not
    if len(notes) > 0:
        # If exists, we update the selected note
        note = Note.objects.get(id=id)
        note.subject = jd['subject']
        note.message = jd['message']
        note.category_id = category_id
        note.save()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    else:
        # If not exists, we return an error response
        data = {
            'retcode': 1,
            'message': "Note not found"
        }

    return JsonResponse(data)


# DELETE methods
def deleteNote (id: int):
    notes = list(Note.objects.filter(id=id).values())

    # Checking if the selected note exists or not
    if len(notes) > 0:
        # If exists, we update the selected note
        Note.objects.filter(id=id).delete()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    else:
        # If not exists, we return an error response
        data = {
            'retcode': 1,
            'message': "Note not found"
        }

    return JsonResponse(data)
