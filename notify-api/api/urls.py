from django.urls import  path

from api.views import UserView, NoteView, CategoryView

urlpatterns = [
    path('users/session/<str:token>', UserView.as_view(), name='usersGetSession'),
    path('users/login/', UserView.as_view(), name='usersLogIn'),
    path('users/logout/', UserView.as_view(), name='usersLogOut'),
    path('users/signup/', UserView.as_view(), name='usersSignUp'),

    path('notes/', NoteView.as_view(), name='notes'),
    path('notes/<int:id>', NoteView.as_view(), name='notesById'),
    path('notesByCategory/<int:id>', NoteView.as_view(), name='notesByCategory'),

    path('categories/', CategoryView.as_view(), name='categories'),
    path('categories/<int:id>', CategoryView.as_view(), name='categoriesById')
]