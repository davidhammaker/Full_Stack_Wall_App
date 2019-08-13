import os
from rest_framework import generics, permissions, filters
from rest_framework.authentication import TokenAuthentication
from django.core.mail import send_mail
from .models import Post
from .serializers import PostSerializer, UserSerializer
from .permissions import IsCreatorOrReadOnly


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [TokenAuthentication]

    filter_backends = [filters.OrderingFilter]
    ordering = ['-date_posted']

    def perform_create(self, serializer):
        """
        Attach users to posts by overriding `perform_create`.
        """
        serializer.save(creator=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsCreatorOrReadOnly]


class UserCreate(generics.CreateAPIView):
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        """
        Hash password and send an email upon successful user creation.
        """
        new_user = serializer.save()
        new_user.set_password(new_user.password)
        new_user.save()
        send_mail(
            'Welcome to Wall App!',
            'Thank you for signing up! You may now log in and post on '
            'the wall.',
            os.environ.get('EMAIL_USER'),
            [serializer.data['email']],
            fail_silently=False
        )
