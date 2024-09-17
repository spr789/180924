from django.urls import path
from . import views

app_name = 'notifications'

urlpatterns = [
    path('', views.notifications_list_view, name='notifications_list'),
    path('<int:notification_id>/', views.notification_detail_view, name='notification_detail'),
    path('mark-all-as-read/', views.mark_all_as_read_view, name='mark_all_as_read'),
    path('delete/<int:notification_id>/', views.delete_notification_view, name='delete_notification'),
]
