# main/models.py
from django.db import models

class UserProfile(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    # Add other fields as needed

    def __str__(self):
        return self.username

class Match(models.Model):
    user1 = models.ForeignKey(UserProfile, related_name='matches1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(UserProfile, related_name='matches2', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
