from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Profile

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == 'GET':
        return Response({
            "full_name": profile.full_name,
            "email": user.email,
            "phone": profile.phone,
            "location": profile.location,
            "bio": profile.bio,
            "image_url": request.build_absolute_uri(profile.image.url) if profile.image else None,
        })

    elif request.method == 'PUT':
        data = request.data
        profile.full_name = data.get('full_name', profile.full_name)
        profile.phone = data.get('phone', profile.phone)
        profile.location = data.get('location', profile.location)
        profile.bio = data.get('bio', profile.bio)
        profile.save()
        return Response({"message": "Profile updated successfully"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_profile_picture(request):
    profile = Profile.objects.get(user=request.user)
    image = request.FILES.get("image")

    if not image:
        return Response({"error": "No image provided"}, status=400)

    profile.image = image
    profile.save()

    return Response({
        "message": "Profile picture updated",
        "image_url": request.build_absolute_uri(profile.image.url)
    })
