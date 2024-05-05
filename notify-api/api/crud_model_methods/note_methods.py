from django.http import JsonResponse

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

from api.models import Note, Category
from api.serializer import NoteSerializer


# GET methods
@api_view(['GET'])
def getNotes(request):
    tokenKey = request.headers.get("Authorization").split(" ")[1]
    token = Token.objects.get(key=tokenKey)

    # Devuelve un listado de todas las notas del usuario
    notes = Note.objects.filter(user=token.user_id)
    serializer = NoteSerializer(notes, many=True)

    data = {
        'retcode': 0,
        'message': "Success",
        'notes': serializer.data
    }

    return JsonResponse(data)


@api_view(['GET'])
def getNotesByCategory (request, id: int):
    tokenKey = request.headers.get("Authorization").split(" ")[1]
    token = Token.objects.get(key=tokenKey)

    # Devuelve un listado de todas las notas de una categoria del usuario
    notes = Note.objects.filter(user=token.user_id, category=id)
    serializer = NoteSerializer(notes, many=True)

    data = {
        'retcode': 0,
        'message': "Success",
        'notes': serializer.data
    }

    return JsonResponse(data)


# POST methods
@api_view(['POST'])
def postNote (request):
    tokenKey = request.headers.get("Authorization").split(" ")[1]
    token = Token.objects.get(key=tokenKey)

    # Guardamos el usuario en la request.
    request.data['user'] = token.user_id

    # Si la categoria asignada no existe o no tiene, ponemos la categoria a None
    if not Category.objects.filter(id=request.data['category']).exists():
        request.data['category'] = None

    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    else:
        data = {
            'retcode': 1,
            'message': "Post Error"
        }

    return JsonResponse(data)


# PUT methods
@api_view(['PUT'])
def putNote (request, id: int):
    tokenKey = request.headers.get("Authorization").split(" ")[1]
    token = Token.objects.get(key=tokenKey)

    # Guardamos el usuario en la request.
    request.data['user'] = token.user_id

    # Si la categoria asignada no existe o no tiene, ponemos la categoria a None
    if not Category.objects.filter(id=request.data['category']).exists():
        request.data['category'] = None

    try:
        note = Note.objects.get(pk=id)
        request.data['post_date'] = note.post_date
        serializer = NoteSerializer(note, data=request.data)

        if serializer.is_valid():
            serializer.save()

            data = {
                'retcode': 0,
                'message': "Success",
            }
        else:
            data = {
                'retcode': 1,
                'message': "Edit Error",
            }
    except Note.DoesNotExist:
        data = {
            'retcode': 1,
            'message': "Note not found"
        }

    return JsonResponse(data)


# DELETE methods
@api_view(['DELETE'])
def deleteNote (request, id: int):
    try:
        # Cogemos nota por su id y la borramos
        note = Note.objects.get(pk=id)
        note.delete()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    except Note.DoesNotExist:
        data = {
            'retcode': 1,
            'message': "Note not found"
        }

    return JsonResponse(data)
