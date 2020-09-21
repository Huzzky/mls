from django.contrib import admin
from django.contrib.sessions.models import Session

from .models import User, Post, Like, Comment

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comment)
# admin.site.register(Session)
