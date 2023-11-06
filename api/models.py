from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext as _
from django.db import models
import uuid


def generate_uuid():
    """generates unique string id
    """
    return str(uuid.uuid4())

class BaseModel(models.Model):
    id = models.CharField(max_length=60, primary_key=True, default=generate_uuid, editable=False)
    class Meta:
        abstract = True


class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, user_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, user_name, password, **extra_fields)



class User(AbstractUser, BaseModel):
    username = None
    user_name = models.CharField(max_length=60, unique=True, default='')
    email = models.EmailField(_('email address'), unique=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']
    class Meta:
        db_table = 'users'

class Stories(BaseModel):
    story_author = models.ForeignKey('User', on_delete=models.CASCADE)
    story_title = models.CharField(max_length=100, blank=False)
    story_content = models.TextField(blank=False)
    story_description = models.CharField(max_length=400, blank=False)
    story_topic = models.CharField(max_length=60, blank=False)
    date_posted = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'stories'
