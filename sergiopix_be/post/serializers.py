from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from post.models import Post


class PostListSerializer(ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', 'topic', 'description', 'shooted_at', 'images')

    def get_images(self, instance):
        return instance.image_set.all().values_list('image', flat=True)


class PostCreateSerializer(ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'shooted_at')


class PostRetrieveSerializer(ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'shooted_at', 'images')

    def get_images(self, instance):
        return instance.image_set.all().values('image', 'comment')
