from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Notification

@login_required
def notifications_list_view(request):
    """
    View to display a list of notifications for the user.
    """
    notifications = Notification.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'notifications/notifications_list.html', {'notifications': notifications})

@login_required
def notification_detail_view(request, notification_id):
    """
    View to display the details of a specific notification.
    """
    notification = get_object_or_404(Notification, id=notification_id, user=request.user)
    
    # Mark the notification as read
    if not notification.read:
        notification.read = True
        notification.save()

    return render(request, 'notifications/notification_detail.html', {'notification': notification})

@login_required
def mark_all_as_read_view(request):
    """
    View to mark all notifications as read.
    """
    Notification.objects.filter(user=request.user, read=False).update(read=True)
    return redirect('notifications_list')

@login_required
def delete_notification_view(request, notification_id):
    """
    View to delete a specific notification.
    """
    notification = get_object_or_404(Notification, id=notification_id, user=request.user)
    notification.delete()
    return redirect('notifications_list')
