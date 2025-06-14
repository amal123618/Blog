from rest_framework import serializers

from app1.models import Blog, Comment
from django.contrib.auth.models import User

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author' ,'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'author']
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'blog', 'author', 'content', 'created_at']
        read_only_fields = ['id', 'created_at']
    
class UserSerializer(serializers.ModelSerializer):
    blogs = BlogSerializer(many=True, read_only=True, source='blog_set')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'blogs','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
    
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)  # return username

    class Meta:
        model = Comment
        fields = ['id', 'blog', 'author', 'content', 'created_at']
        read_only_fields = ['id', 'created_at', 'author', 'blog']
