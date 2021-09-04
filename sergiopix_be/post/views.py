from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from post.serializers import PostListSerializer, PostCreateSerializer, PostRetrieveSerializer
from post.models import Post, Image


class PostListView(ListAPIView):
    queryset = Post.objects.all().order_by('-shooted_at')
    serializer_class = PostListSerializer


class PostCreateView(CreateAPIView):
    serializer_class = PostCreateSerializer

    def perform_create(self, serializer):
        response = super().perform_create(serializer)
        post_images = []
        if serializer.instance:
            for idx, file_value in enumerate(self.request.FILES.values()):
                post_images.append(
                    Image(
                        image=file_value,
                        post=serializer.instance,
                        comment=self.request.data[f'file{idx}_comment']
                    )
                )
            Image.objects.bulk_create(post_images)
        return response


class PostRetrieveView(RetrieveAPIView):
    serializer_class = PostRetrieveSerializer
    queryset = Post.objects.all()
    lookup_field = 'pk'
