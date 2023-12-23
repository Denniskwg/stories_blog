from rest_framework import serializers
from .models import User, Stories, Comments 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'user_name']

class StoriesSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Stories
        fields = ['id','content', 'title', 'date_posted', 'author', 'topic']

class CommentsSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Comments
        fields = ['content', 'date_posted', 'author']
