from django.http import JsonResponse
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

from api.models import Category
from api.serializer import CategorySerializer


# GET methods
@api_view(['GET'])
def getCategories(request):
    tokenKey = request.headers.get("Authorization").split(" ")[1]
    token = Token.objects.get(key=tokenKey)

    # Devuelve un listado de todas las categorias del usuario
    categories = Category.objects.filter(user=token.user_id)
    serializer = CategorySerializer(categories, many=True)

    data = {
        'retcode': 0,
        'message': "Success",
        'categories': serializer.data
    }

    return JsonResponse(data)


# POST methods
@api_view(['POST'])
def postCategory (request):
    tokenKey = request.headers.get("Authorization").split(" ")[1]
    token = Token.objects.get(key=tokenKey)

    # Guardamos el usuario en la request.
    request.data['user'] = token.user_id

    if request.data['info'].strip() == '':
        request.data['info'] = None

    serializer = CategorySerializer(data=request.data)
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
def putCategory (request, id: int):
    tokenKey = request.headers.get("Authorization").split(" ")[1]
    token = Token.objects.get(key=tokenKey)

    # Guardamos el usuario en la request.
    request.data['user'] = token.user_id

    if request.data['info'].strip() == '':
        request.data['info'] = None

    try:
        category = Category.objects.get(pk=id)
        serializer = CategorySerializer(category, data=request.data)
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
    except Category.DoesNotExist:
        data = {
            'retcode': 1,
            'message': "Category not found"
        }

    return JsonResponse(data)


# DELETE methods
@api_view(['DELETE'])
def deleteCategory (request, id: int):
    try:
        # Cogemos categoria por su id y la borramos
        category = Category.objects.get(pk=id)
        category.delete()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    except Category.DoesNotExist:
        data = {
            'retcode': 1,
            'message': "Category not found"
        }

    return JsonResponse(data)
