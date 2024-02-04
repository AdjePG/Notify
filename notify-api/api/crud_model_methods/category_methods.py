import json

from django.http import JsonResponse

from api.models import Category

# GET methods
def getCategories():
    # It'll return a list of all categories
    categories = list(Category.objects.values())

    data = {
        'retcode': 0,
        'message': "Success",
        'categories': categories
    }

    return JsonResponse(data)


def getCategory(id: int):
    # It'll return a list of categories which their id
    # is the same as requested
    categories = list(Category.objects.filter(id=id).values())

    if len(categories) > 0:
        data = {
            'retcode': 0,
            'message': "Success",
            'category': categories[0]
        }
    else:
        data = {
            'retcode': 1,
            'message': "Category not found"
        }

    return JsonResponse(data)


# POST methods
def postCategory (request):
    # Gets the body of the request to create a category with its values
    jd = json.loads(request.body)

    Category.objects.create(
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
    categories = list(Category.objects.filter(id=id).values())

    # Checking if the selected note exists or not
    if len(categories) > 0:
        # If exists, we update the selected category
        categories = Category.objects.get(id=id)
        categories.name = jd['name']
        categories.info = jd['info']
        categories.color_id = jd['color_id']
        categories.save()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    else:
        # If not exists, we return an error response
        data = {
            'retcode': 1,
            'message': "Category not found"
        }

    return JsonResponse(data)


# DELETE methods
def deleteCategory (id: int):
    categories = list(Category.objects.filter(id=id).values())

    # Checking if the selected category exists or not
    if len(categories) > 0:
        # If exists, we update the selected category
        Category.objects.filter(id=id).delete()

        data = {
            'retcode': 0,
            'message': "Success",
        }
    else:
        # If not exists, we return an error response
        data = {
            'retcode': 1,
            'message': "Category not found"
        }

    return JsonResponse(data)
