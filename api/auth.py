from oauth2_provider.models import AccessToken
from .models import User
from django.conf import settings
from django.utils import timezone
from rest_framework import authentication
from rest_framework import exceptions


class HasAllScope(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token_string = auth_header.split(' ')[1]

        try:
            token = AccessToken.objects.get(token=token_string, expires__gt=timezone.now())
        except AccessToken.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid or expired token.')

        user = token.user
        return (user, None)
