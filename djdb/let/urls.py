from django.urls import path

from .views import PostViewGet, PostViewPost, PostViewDelete ,UserView


app_name = "let"

# app_name will help us do a reverse look-up latter.
urlpatterns = [
    path('pg/', PostViewGet.as_view()),
    path('pd/<int:pk>', PostViewDelete.as_view()),
    path('pp/', PostViewPost.as_view()),
    path('u/', UserView.as_view()),
]