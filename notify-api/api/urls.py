from django.urls import path

from .views import userMethods, categoryMethods, noteMethods


urlpatterns = [
    path('users/session/', userMethods, name='usersGetSession'),
    path('users/login/', userMethods, name='usersLogIn'),
    path('users/signup/', userMethods, name='usersSignUp'),

    path('notes/', noteMethods, name='notes'),
    path('notes/<int:id>', noteMethods, name='notesById'),
    path('notesByCategory/<int:id>', noteMethods, name='notesByCategory'),

    path('categories/', categoryMethods, name='categories'),
    path('categories/<int:id>', categoryMethods, name='categoriesById')
]
