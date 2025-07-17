from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        # Handle signup logic here
        return JsonResponse({"message": "Signup successful!"})
    return JsonResponse({"error": "Invalid request method"}, status=400)
