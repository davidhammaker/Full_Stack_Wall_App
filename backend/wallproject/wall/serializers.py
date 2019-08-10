from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')
    class Meta:
        model = Post
        fields = ['id', 'content', 'date_posted', 'creator']
