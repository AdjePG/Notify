from django.views.decorators.csrf import csrf_exempt

from api.crud_model_methods import user_methods, note_methods, category_methods

# Create your views here.
@csrf_exempt
def userMethods(request):
    urlName = request.resolver_match.url_name
    method = request.method

    if urlName == "usersGetSession":
        return user_methods.getSession(request)
    elif urlName == "usersSignUp":
        return user_methods.signUp(request)
    elif urlName == "usersLogIn":
        return user_methods.logIn(request)

@csrf_exempt
def categoryMethods(request, id=0):
    urlName = request.resolver_match.url_name
    method = request.method

    if urlName == "categories":
        if method == 'GET':
            return category_methods.getCategories(request)
        elif method == 'POST':
            return category_methods.postCategory(request)
    elif urlName == "categoriesById":
        if method == 'PUT':
            return category_methods.putCategory(request, id)
        elif method == 'DELETE':
            return category_methods.deleteCategory(request, id)

@csrf_exempt
def noteMethods(request, id=0):
    urlName = request.resolver_match.url_name
    method = request.method

    if urlName == "notes":
        if method == 'GET':
            return note_methods.getNotes(request)
        elif method == 'POST':
            return note_methods.postNote(request)
    elif urlName == "notesById":
        if method == 'PUT':
            return note_methods.putNote(request, id)
        elif method == 'DELETE':
            return note_methods.deleteNote(request, id)
    elif urlName == "notesByCategory":
        return note_methods.getNotesByCategory(request, id)
