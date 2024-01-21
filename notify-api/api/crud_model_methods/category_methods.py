import json

from django.http import JsonResponse

from api.models import Categories

# GET methods
def getCategories ():
    categories = list(Categories.objects.values())
    #if len(categories) > 0:
    data = {
        'retcode': 0,
        'message': "Success",
        'categories': categories
    }
    #else:
    #    data = {
    #        'retcode': 1,
    #        'message': "Categories not found..."
    #    }
    return JsonResponse(data)


def getCategory (id: int):
    categories = list(Categories.objects.filter(id=id).values())
    if len(categories) > 0:
        data = {
            'retcode': 0,
            'message': "Success",
            'category': categories[0]
        }
    else:
        data = {
            'retcode': 1,
            'message': "Category not found..."
        }

    return JsonResponse(data)


# POST methods
def postCategory (request):
    jd = json.loads(request.body)

    Categories.objects.create(
        name=jd['name'],
        info=jd['info'],
        color_id=jd['color_id']
    )

    data = {
        'retcode': 0,
        'message': "Success",
    }

    return JsonResponse(data)


# PUT methods
def putCategory (request, id: int):
    jd = json.loads(request.body)
    categories = list(Categories.objects.filter(id=id).values())

    if len(categories) > 0:
        categories = Categories.objects.get(id=id)
        categories.name = jd['name']
        categories.info = jd['info']
        categories.color_id = jd['color_id']
        categories.save()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    else:
        data = {
            'retcode': 1,
            'message': "Category not found..."
        }

    return JsonResponse(data)


# DELETE methods
def deleteCategory (id: int):
    categories = list(Categories.objects.filter(id=id).values())

    if len(categories) > 0:
        Categories.objects.filter(id=id).delete()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    else:
        data = {
            'retcode': 1,
            'message': "Category not found..."
        }

    return JsonResponse(data)