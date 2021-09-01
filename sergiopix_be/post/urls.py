from django.urls import path
from post.views import PostListView


urlpatterns = [
    path('post_list/', PostListView.as_view())
]
