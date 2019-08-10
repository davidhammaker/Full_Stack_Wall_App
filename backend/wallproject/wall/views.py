from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer, UserSerializer
from .permissions import IsCreatorOrReadOnly


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
