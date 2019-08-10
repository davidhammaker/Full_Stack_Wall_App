from rest_framework import permissions


class IsCreatorOrReadOnly(permissions.BasePermission):
    """
    Permits only the post's creator to edit or delete the post.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user == obj.creator:
            return True
        else:
            return False
