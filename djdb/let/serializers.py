from rest_framework import serializers
from .models import Post, User

class PostSerializerGet(serializers.Serializer):
    content_post = serializers.CharField()
    user_post_id = serializers.IntegerField()
    user_post = serializers.CharField()
    long_loc_post = serializers.FloatField()
    lat_loc_post = serializers.FloatField()
    date_post = serializers.DateTimeField(format="%h %d, %Y in %H:%M:%S")
    id_post = serializers.IntegerField()


class PostSerializerPost(serializers.Serializer):
    uuid_post = serializers.UUIDField()
    content_post = serializers.CharField()
    user_post_id = serializers.IntegerField()
    long_loc_post = serializers.FloatField()
    lat_loc_post = serializers.FloatField()

    def create(self, validated_data):
        return Post.objects.create(**validated_data)



class UserSerializer(serializers.Serializer):
    uuid_user = serializers.UUIDField()
    name_user = serializers.CharField()

    def create(self, validated_data):
        return User.objects.create(**validated_data)
