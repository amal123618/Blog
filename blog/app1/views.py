from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from app1.models import Blog, Comment
from app1.serializers import BlogSerializer, CommentSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


@api_view(['GET'])
@permission_classes([AllowAny])
def index(request):
    return Response({'message': 'Welcome to the Blog '}, status=status.HTTP_200_OK)

# Register and login views
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'User registered successfully.',
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=400)

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({"error": "Login Failed"})


# Blog creation view (only accessible for authenticated users)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_blog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# View to fetch the list of blogs

@api_view(['GET'])
@permission_classes([])
def blog_list(request):
    blogs = Blog.objects.all().order_by('-created_at')
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_view(request):
    # Expire the tokens by setting the cookies' max_age to a past date
    response = Response({"message": "Logged out successfully"}, status=200)
    # Expire access_token and refresh_token by setting their expiry to the past
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response

@api_view(['GET'])
@permission_classes([])
def blog_detail(request, id):
    try:
        blog = Blog.objects.get(id=id)
    except Blog.DoesNotExist:
        return Response({"error": "Blog not found"}, status=404)

    serializer = BlogSerializer(blog)
    return Response(serializer.data, status=200)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_blog(request, id):
    try:
        blog = Blog.objects.get(id=id)
    except Blog.DoesNotExist:
        return Response({"error": "Blog not found"}, status=404)

    if blog.author != request.user:
        return Response({"error": "You do not have permission to edit this blog"}, status=403)

    serializer = BlogSerializer(blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_blog(request, id):
    try:
        blog = Blog.objects.get(id=id)
    except Blog.DoesNotExist:
        return Response({"error": "Blog not found"}, status=404)

    if blog.author != request.user:
        return Response({"error": "You do not have permission to delete this blog"}, status=403)

    blog.delete()
    return Response({"message": "Blog deleted successfully"}, status=204)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        return Response({"error": "Blog not found"}, status=404)
    
    comments = Comment.objects.filter(blog=blog).order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, blog_id):
    try:
        blog = Blog.objects.get(id=blog_id)
    except Blog.DoesNotExist:
        return Response({"error": "Blog not found"}, status=404)

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user, blog=blog)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"error": "Comment not found"}, status=404)

    if comment.author != request.user:
        return Response({"error": "Not allowed"}, status=403)

    comment.content = request.data.get('content', comment.content)
    comment.save()
    return Response({"message": "Comment updated"}, status=200)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"error": "Comment not found"}, status=404)

    if comment.author != request.user:
        return Response({"error": "Not allowed"}, status=403)

    comment.delete()
    return Response({"message": "Comment deleted"}, status=204)
