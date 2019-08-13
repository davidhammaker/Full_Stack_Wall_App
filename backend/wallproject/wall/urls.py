from django.urls import path
from rest_framework.authtoken import views as auth_views
from . import views as wall_views

urlpatterns = [
    path(
        '',
        wall_views.PostList.as_view(),
        name='post-list'
    ),
    path(
        'posts/<int:pk>/',
        wall_views.PostDetail.as_view(),
        name='post-detail'
    ),
    path(
        'user/create/',
        wall_views.UserCreate.as_view(),
        name='user-create'
    ),
    path(
        'api-token-auth/',
        auth_views.obtain_auth_token,
        name='api-token-auth'
    )
]
