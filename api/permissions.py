from django.conf import settings
from rest_framework import permissions


class HasAllScopePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user and 'all' in request.auth.scope:
            return True
        return False
