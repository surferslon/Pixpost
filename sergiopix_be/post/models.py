from django.db import models


class Topic(models.Model):
    name = models.CharField(max_length=128)


class Post(models.Model):
    published_at = models.DateField(auto_now=True)
    shooted_at = models.DateField()
    title = models.CharField(max_length=128)
    place = models.CharField(max_length=512)
    description = models.TextField()
    topic = models.ForeignKey(Topic, null=True, on_delete=models.SET_NULL)


class Image(models.Model):
    post = models.ForeignKey(Post, null=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images/', default='no_image.jpg')
    comment = models.CharField(max_length=1024)
