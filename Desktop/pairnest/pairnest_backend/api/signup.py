# users/signup.py
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError

@csrf_exempt
def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        
        # Basic Validation
        if not username or not email or not password:
            return JsonResponse({"error": "All fields are required."}, status=400)
        
        # Check if username or email already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists."}, status=400)
        
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already exists."}, status=400)

        # Create and save the user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            login(request, user)  # Log the user in after signup
            return JsonResponse({"success": "Signup successful!"}, status=200)
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=400)
    
    return JsonResponse({"error": "Invalid request method."}, status=405)
