from django.urls import path
from post.views import PostListView, PostCreateView


urlpatterns = [
    path('list/', PostListView.as_view()),
    path('create/', PostCreateView.as_view())
]
