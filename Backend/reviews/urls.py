from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'reviews'

router = DefaultRouter()
router.register(r'reviews', views.ReviewViewSet, basename='review')
router.register(r'comments', views.ReviewCommentViewSet, basename='review-comment') 
router.register(r'votes', views.ReviewVoteViewSet, basename='review-vote')

urlpatterns = router.urls

# Add additional URL patterns
urlpatterns += [
    path('api/', include(router.urls)),
]
