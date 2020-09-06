from django.urls import path

from .views import PostViewGet, PostViewPost, PostViewDelete ,UserView, setCookie, setting_cookie, setting_cookie_get

app_name = "let"

# app_name will help us do a reverse look-up latter.
urlpatterns = [
    path('pg/', PostViewGet.as_view()),
    path('ts/', setCookie),
    path('sc/', setting_cookie),
    path('scg/', setting_cookie_get),
    path('pd/<int:pk>', PostViewDelete.as_view()),
    path('pp/', PostViewPost.as_view()),
    path('u/', UserView.as_view()),
]