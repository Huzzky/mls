from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from django.views.decorators.csrf import csrf_protect
from django.http import HttpResponse
import json
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Post, User
from .serializers import PostSerializerGet, PostSerializerPost, UserSerializer



@csrf_protect
@api_view(["GET"])
def setting_cookie_get(request):
    # posts = Post.objects.all()
    # cokie = request.COOKIES['Learning']
    # # serializerPost = PostSerializerGet(posts, many=True)
    # cokie = request.COOKIES
    # response =  HttpResponse(json.dumps(
    #                {'cookie':request.COOKIES["Learning"]}
    #            ), content_type='application/json')
    # return response
    request.session['cookieS'] = "testAOAOA"
    return Response({
        # "posts" : serializerPost.data,
        "cookie" : request.session['cookieS']
    })



@csrf_protect
@api_view(["POST"])
def setting_cookie(request):
    print(request.data['cookie'])
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    print(request.META.get('CONTENT_LENGHT'))
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    print(ip)
    response = HttpResponse(content_type='application/json')

    return HttpResponse()
    


    # response =  HttpResponse(json.dumps(
    #                {'cookie':request.COOKIES['Learning']}
    #            ))
    # response.set_cookie('hello','world')
    # return response



class PostViewGet(APIView):
    def get(self, request):
        posts = Post.objects.all()

        serializerPost = PostSerializerGet(posts, many=True)
        return Response({
            "posts" : serializerPost.data,
            "cookie" : request.COOKIES
        })

def setCookie(request):
    response = HttpResponse()
    response.set_cookie('Learning', 'Django', secure=False, path='/')
    return response

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

