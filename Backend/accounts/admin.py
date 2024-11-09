from django.contrib import admin
from .models import CustomUser, UserProfile, Address, UserActivity
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Admin for CustomUser
class CustomUserAdmin(BaseUserAdmin):
    model = CustomUser
    list_display = ('phone_number', 'email', 'is_vendor', 'is_customer', 'is_staff', 'is_superuser')
    list_filter = ('is_vendor', 'is_customer', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('phone_number', 'email', 'password')}),
        ('Permissions', {'fields': ('is_vendor', 'is_customer', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {'fields': ('phone_number', 'email', 'password1', 'password2')}),
        ('Permissions', {'fields': ('is_vendor', 'is_customer', 'is_staff', 'is_superuser')}),
    )
    search_fields = ('phone_number', 'email',)
    ordering = ('phone_number',)
    filter_horizontal = ()

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_phone_number', 'date_of_birth', 'gender')
    search_fields = ('user__email', 'user__phone_number')
    list_filter = ('gender',)
    readonly_fields = ('user',)

    def get_phone_number(self, obj):
        return obj.user.phone_number
    get_phone_number.short_description = 'Phone Number'

# Admin for Address
class AddressAdmin(admin.ModelAdmin):
    list_display = ('get_user_info', 'address_line_1', 'city', 'state', 'country', 'address_type', 'is_default', 'address_verified')
    search_fields = ('user__phone_number', 'guest_user__session_key', 'city', 'state', 'country')
    list_filter = ('country', 'is_default', 'address_verified', 'address_type')

    def get_user_info(self, obj):
        if obj.user:
            return obj.user.phone_number
        return f"Guest-{obj.guest_user.session_key[:8]}"
    get_user_info.short_description = 'User'

# Admin for UserActivity
class UserActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity', 'timestamp', 'ip_address', 'location', 'successful')
    search_fields = ('user__phone_number', 'activity', 'ip_address', 'location')
    list_filter = ('successful', 'activity')
    readonly_fields = ('user', 'activity', 'timestamp', 'ip_address', 'location', 'device_info', 'user_agent', 'successful')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(UserActivity, UserActivityAdmin)
