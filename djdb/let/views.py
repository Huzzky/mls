from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import authenticate

from .models import Post, User
from .serializers import PostSerializerGet, PostSerializerPost, UserSerializer



class UserAuth(APIView):
    def post(self, request):
        testGet = request.data.get('name_user')
        request.session[0]='bar'
        try:
            a = User.objects.get(name_user='Admin')
            print(request.session[0])
            b = User.objects.filter(name_user="Admin")
            print(b.get(id_user))
            return Response({"answerAuth": True, "req": request.session[0]})
        except:
            return Response({"answerAuth": False})
        
        



class PostViewGet(APIView):
    def get(self, request):
        posts = Post.objects.all()

        serializerPost = PostSerializerGet(posts, many=True)
        return Response({
            "posts" : serializerPost.data,
        })


class PostViewPost(APIView):
    def post(self, request):
        post = request.data.get('posts')

        serializerPost =  PostSerializerPost(data=post)

        if serializerPost.is_valid(raise_exception=True):
            response = HttpResponse('1')
            response.set_cookie('post', "send post")
            post_saved = serializerPost.save()
            
            
        return Response({
            "success": "Post '{}' created successfully".format(post_saved.content_post)
        })

class PostViewDelete(APIView):
    def delete(self, request, pk):
        post = get_object_or_404(Post.objects.all(), pk=pk)
        post.delete()
        return Response({
            "message": "Post with id '{}' has been deleted.".format(pk)
        }, status=204)


class UserView(APIView):
    def get(self, request):
        users = User.objects.all()

        serializerUser = UserSerializer(users, many=True)

        return Response({
            "users": serializerUser.data
        })
    
    def post(self, request):
        user = request.data.get('users')

        serializerUser = UserSerializer(data=user)

        if serializerUser.is_valid(raise_exception=True):
            user_saved = serializerUser.save()

        return Response({
            "success": "User '{}' created successfully".format(user_saved.name_user)
        })

