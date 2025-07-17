import json
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON request body
            data = json.loads(request.body.decode('utf-8'))
            username = data.get("username")
            password = data.get("password")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        # Check if authentication is successful
        if user is not None:
            return JsonResponse({"message": "Login successful"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    else:
        return JsonResponse({"error": "Invalid method"}, status=405)
