from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer  

@api_view(['POST'])
def RegisterView(request):
    fullName = request.data.get('fullName')
    email = request.data.get('email')
    password = request.data.get('password')

    if not all([fullName, email, password]):
        return Response({'detail': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'detail': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    username = email.split('@')[0]  # Generate username from email
    user = User.objects.create_user(username=username, email=email, password=password)
    user.first_name = fullName
    user.save()

    return Response({'message': 'Account created successfully!'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def LoginView(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        # Find the user by email
        user_obj = User.objects.get(email=email)
        username = user_obj.username
    except User.DoesNotExist:
        return Response({'detail': 'Invalid credentials'}, status=400)

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'email': user.email
        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=400)

@api_view(['GET', 'PUT'])
@permission_classes([authenticate])
def get_profile(request):
    user = request.user

    # --- GET request: Return user info
    if request.method == 'GET':
        data = {
            "full_name": f"{user.first_name} {user.last_name}".strip(),
            "email": user.email,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
        return Response(data, status=status.HTTP_200_OK)

    # --- PUT request: Update user info
    elif request.method == 'PUT':
        first_name = request.data.get('first_name', user.first_name)
        last_name = request.data.get('last_name', user.last_name)
        email = request.data.get('email', user.email)

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()

        data = {
            "full_name": f"{user.first_name} {user.last_name}".strip(),
            "email": user.email,
            "username": user.username,
        }
        return Response(data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([authenticate])
def update_profile(request):
    user = request.user
    data = request.data

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.save()

    return Response({
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })