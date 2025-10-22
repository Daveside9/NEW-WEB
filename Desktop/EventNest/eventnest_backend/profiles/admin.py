from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'phone', 'location', 'bio')
    search_fields = ('user__username', 'user__email', 'full_name', 'phone', 'location')
    list_filter = ('location',)
    ordering = ('user__username',)
    fieldsets = (
        ('User Info', {
            'fields': ('user', 'full_name', 'phone', 'location', 'bio')
        }),
        ('Profile Picture', {
            'fields': ('profile_picture',),
        }),
    )
