from rest_framework.generics import ListAPIView
from post.serializers import PostListSerializer
from post.models import Post


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
