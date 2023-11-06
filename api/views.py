from oauth2_provider.views.generic import ProtectedResourceView
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
import requests
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from .models import User
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .permissions import HasAllScopePermission
from rest_framework.views import APIView

@login_required
def status(request):
    print(request.user)
    print(request)
    return JsonResponse({"status": "ok"})


@csrf_exempt
def delete_user(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        print(data)
        try:
            user_data = json.loads(data)
            print(user_data)
        except json.decoder.JSONDecodeError:
            return JsonResponse({"message": "Invalid details!"})

        user = User.objects.get(email=user_data.get('email'))
        user.delete()
        return JsonResponse({"message": "user deleted successfully"})

@csrf_exempt
@ensure_csrf_cookie
def register_view(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        try:
            user_data = json.loads(data)
            required_fields = ['first_name', 'last_name', 'user_name', 'password', 'email']
            for field in required_fields:
                if field not in data:
                    return JsonResponse({"message": f"Missing required field: {field}"}, status=400)

            user = User.objects.create_user(
                first_name=user_data.get('first_name'),
                last_name=user_data.get('last_name'),
                user_name=user_data.get('user_name'),
                email=user_data.get('email'),
                password=user_data.get('password')
            )
            user.backend = 'django.contrib.auth.backends.ModelBackend'

            user.save()
            #login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            #request.session['name'] = user_data.get('email')
            csrf_token = get_token(request)
            response = HttpResponse("User created successfully", status=200)
            response.set_cookie('csrftoken', csrf_token)

            return response

        except json.decoder.JSONDecodeError:
            return JsonResponse({"message": "Invalid json data!"}, status=404)

    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

#@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        try:
            user_data = json.loads(data)
            email = user_data.get('email')
            password = user_data.get('password')
            print(email)
            print(password)

            user = authenticate(request, username=email, password=password)

            if user is not None:
                # Log in the user
                #login(request, user)
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                request.session['name'] = user_data.get('email')
                response = JsonResponse({"message": "Logged in successfully"}, status=200)
                return response
            else:
                return JsonResponse({"message": "Invalid email or password."}, status=401)
        except json.decoder.JSONDecodeError:
            return JsonResponse({"message": "Invalid Json data!"}, status=400)

    else:
        return JsonResponse({"message": "Invalid request method."}, status=400)

class ApiEndpoint(APIView):
    required_scopes = ['all']
    permission_classes = [HasAllScopePermission, IsAuthenticated]
    def post(self, request, *args, **kwargs):
        return JsonResponse({'message': 'Posting..'}, status=200)
