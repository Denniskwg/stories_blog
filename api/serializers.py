from rest_framework import serializers
from .models import User, Stories, Comments 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class StoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stories
        fields = ['id','content', 'title', 'date_posted', 'author', 'topic']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['content', 'date_posted', 'author']
