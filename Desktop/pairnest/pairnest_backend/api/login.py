# api/login.py
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        
        # Log the received credentials
        print(f"Email: {email}, Password: {password}")

        # Basic validation
        if not email or not password:
            return JsonResponse({"error": "Both fields are required."}, status=400)

        # Authenticate the user
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": "Login successful!"}, status=200)
        else:
            print("Invalid credentials")  # Log for debugging
            return JsonResponse({"error": "Invalid email or password."}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=405)
