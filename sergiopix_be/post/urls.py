from django.urls import path
from post.views import PostListView, PostCreateView, PostRetrieveView


urlpatterns = [
    path('list/', PostListView.as_view()),
    path('<int:pk>/', PostRetrieveView.as_view()),
    path('create/', PostCreateView.as_view())
]
