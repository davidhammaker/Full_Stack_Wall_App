from django.urls import path
from . import views as wall_views

urlpatterns = [
    path(
        '',
        wall_views.PostList.as_view(),
        name='post-list'
    ),
    path(
        'post/<int:pk>/',
        wall_views.PostDetail.as_view(),
        name='post-detail'
    ),
]
