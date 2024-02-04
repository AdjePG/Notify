import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_decode_handler
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


# GET methods
@permission_classes([IsAuthenticated])
def getSession(request, token):
    try:
        payload = jwt_decode_handler(token)
        user_id = payload['user_id']

        user = list(User.objects.filter(id=user_id).values())

        if len(user) > 0:
            data = {
                'retcode': 0,
                'message': "Success",
            }
        else:
            data = {
                'retcode': 1,
                'message': "User not exists",
            }
    except Exception:
        data = {
            'retcode': 1,
            'message': "Invalid token",
        }

    return JsonResponse(data)


# POST methods
def logIn(request):
    jd = json.loads(request.body)

    username = jd['username']
    password = jd['pass']

    if username != "" and password != "":
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            data = {
                'retcode': 0,
                'message': "Success",
                'token': token,
                'user': payload
            }
        else:
            data = {
                'retcode': 1,
                'message': "Invalid mail/password",
            }
    else:
        data = {
            'retcode': 1,
            'message': "Missing mail and/or password",
        }

    return JsonResponse(data)

@permission_classes([IsAuthenticated])
def logOut(request):
    logout(request)

    data = {
        'retcode': 0,
        'message': "Success"
    }

    return JsonResponse(data)


def signUp(request):
    jd = json.loads(request.body)

    if jd['username'] != "":
        user = list(User.objects.filter(username=jd['username']).values())

        if len(user) > 0:
            data = {
                'retcode': 1,
                'message': "User exists",
            }
        else:
            user = User.objects.create(
                username=jd['username'],
                first_name=jd['name'],
                last_name=jd['surname'],
                email=jd['mail'],
            )
            user.set_password(jd['pass'])
            user.save()

            data = {
                'retcode': 0,
                'message': "Success",
            }
    else:
        data = {
            'retcode': 1,
            'message': "Invalid username",
        }

    return JsonResponse(data)
