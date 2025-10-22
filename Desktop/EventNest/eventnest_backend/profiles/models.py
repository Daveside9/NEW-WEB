from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile"
    )
    full_name = models.CharField(max_length=255, blank=True, null=True, default="")
    email = models.EmailField(blank=True, null=True, default="")
    phone = models.CharField(max_length=20, blank=True, null=True, default="")
    location = models.CharField(max_length=255, blank=True, null=True, default="")
    bio = models.TextField(blank=True, null=True, default="")
    image = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to="profiles/", blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # Show full name or username in the admin list
        return self.full_name or self.user.username

    @property
    def username(self):
        # This allows your React frontend to still access `data.username`
        return self.user.username
