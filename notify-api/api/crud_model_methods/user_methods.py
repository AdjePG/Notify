from django.http import JsonResponse
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

from api.serializer import UserSerializer


# GET methods
@api_view(['GET'])
def getSession(request):
    data = {
        'retcode': 0,
        'message': "Success",
    }

    return JsonResponse(data)


# POST methods
@api_view(['POST'])
def logIn(request):
    user = User.objects.get(username=request.data.get("username"))
    if user.check_password(request.data.get("password")):
        token = Token.objects.get(user=user)
        serializer = UserSerializer(user)
        data = {
            'retcode': 0,
            'message': "Success",
            'token': token.key,
            'user': serializer.data
        }
    else:
        data = {
            'retcode': 1,
            'message': "Invalid mail/password",
        }

    return JsonResponse(data)


@api_view(['POST'])
def signUp(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)

        data = {
            'retcode': 0,
            'message': "Success"
        }
    else:
        data = {
            'retcode': 1,
            'message': "Invalid username",
        }

    return JsonResponse(data)
