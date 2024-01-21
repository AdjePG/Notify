import json

from django.http import JsonResponse

from api.models import Notes, Categories


# GET methods
def getNotes ():
    notes = list(Notes.objects.values())

    # Checks if notes list contains any note.
    # If there's at least one note, it'll return the list successfully.

    ##if len(notes) > 0:
    data = {
        'retcode': 0,
        'message': "Success",
        'notes': notes
    }
    ##else:
    ##    data = {
    ##        'retcode': 1,
    ##        'message': "Notes not found..."
    ##    }

    return JsonResponse(data)


def getNotesByCategory (id: int):
    notes = list(Notes.objects.filter(category_id=id).values())

    # Checks if notes list contains any note with a specific category id.
    # If there's at least one note, it'll return the list successfully.

    if len(notes) > 0:
        data = {
            'retcode': 0,
            'message': "Success",
            'note': notes
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

    # Checking if the selected category exists or not.
    # If not, we add a None value

    if Categories.objects.filter(id=jd['category_id']).exists():
        category_id = jd['category_id']
    else:
        category_id = None

    # Set each python model property with every sent request body property value.
    Notes.objects.create(
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
    notes = list(Notes.objects.filter(id=id).values())

    # Checks if notes list contains any note with a specific id.
    # If there's at least one note, it'll proceed to update the current note.

    if len(notes) > 0:
        # Set each python model property with every sent request body property value.

        note = Notes.objects.get(id=id)
        note.subject = jd['subject']
        note.message = jd['message']
        note.category_id = jd['category_id']
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

    # Checks if notes list contains any note with sent category id.
    # If there's at least one note, it'll proceed to delete the current note.

    if len(notes) > 0:
        Notes.objects.filter(id=id).delete()

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