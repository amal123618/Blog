from django.urls import path
from app1 import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', views.index),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('create_blog/', views.create_blog, name='create_blog'),
    path('blogs/', views.blog_list, name='blog_list'),

    path('blog/<int:id>/', views.blog_detail, name='blog_detail'),	
    path('delete/<int:id>/', views.delete_blog, name='delete_blog'),
    path('update/<int:id>/', views.update_blog, name='update_blog'),
    
    path('Profile/', views.user_profile, name='user_profile'),
    
    path('blog/<int:blog_id>/comments/', views.get_comments, name='get_comments'),
    path('blog/<int:blog_id>/comments/add/', views.add_comment, name='add_comment'),
    
    path('blog/comments/<int:comment_id>/update/', views.update_comment, name='update_comment'),
    path('blog/comments/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),


    # JWT token views
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

]