from django.db import models
import uuid

 
class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    uuid_user = models.UUIDField(default=uuid.uuid4, unique=True,editable=False)
    name_user = models.CharField(max_length=64, unique=True)
    img_user = models.ImageField(upload_to="img/user", height_field=None, width_field=None, max_length=None, blank=True, null=True)

    def __str__(self):
        return self.name_user
    

class Post(models.Model):
    id_post = models.AutoField(primary_key=True)
    uuid_post = models.UUIDField(default=uuid.uuid4, unique=True,editable=False)
    content_post = models.TextField(blank=False)
    date_post = models.DateTimeField(auto_now=False, auto_now_add=True)
    image_post = models.ImageField(upload_to="img/post", height_field=None, width_field=None, max_length=None, blank=True, null=True)
    like_post = models.IntegerField(default=0, blank=True, editable=False)
    link_post = models.CharField(max_length=150,null=True, default=0 ,blank=True)
    # location_post = models.CharField(max_length=250,null=True, default=0 ,blank=True)
    long_loc_post = models.FloatField(null=True, blank=True)
    lat_loc_post = models.FloatField(null=True, blank=True)
    user_post = models.ForeignKey("User", on_delete=models.CASCADE)

    def __str__(self):
        return self.content_post

    class Meta: 
        ordering = ['-date_post']
    

class Like(models.Model):
    uuid_like = models.UUIDField(default=uuid.uuid4, unique=True,editable=False)
    like_post_id = models.ForeignKey("Post", on_delete=models.CASCADE)
    like_by_user = models.ForeignKey("User", on_delete=models.CASCADE)


    def __str__(self):
        return str(self.uuid_like)
    

class Comment(models.Model):
    uuid_comment = models.UUIDField(default=uuid.uuid4, unique=True,editable=False)
    content_comment = models.TextField(blank=False)
    date_comment = models.DateTimeField(auto_now=False, auto_now_add=True)
    user_comment = models.ForeignKey("User", on_delete=models.CASCADE)
    post_comment = models.ForeignKey("Post", on_delete=models.CASCADE)

    def __str__(self):
        return self.content_comment
    