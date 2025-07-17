from rest_framework import serializers
from .models import UserProfile  # Import your user profile model

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'  # Or specify the fields you want to expose
