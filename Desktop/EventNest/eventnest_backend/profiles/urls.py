from django.urls import path
from .views import profile_view
from .views import upload_profile_picture

urlpatterns = [
    path("profile/", profile_view, name="profile"),
    path("upload-picture/", upload_profile_picture, name="upload-picture"),
]
