from oauth2_provider.views.generic import ProtectedResourceView
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
import requests
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from .models import User, Stories
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.middleware.csrf import get_token
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .permissions import HasAllScopePermission
from rest_framework.views import APIView
from .get_topic import extract_topic
from .serializers import StoriesSerializer

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


#@ensure_csrf_cookie
def refresh_csrf(request):
    if request.method == 'GET':
        csrf_token = get_token(request)
        response = JsonResponse({'token': csrf_token}, status=200)
        response.set_cookie('csrftoken', csrf_token, samesite='None', secure=True, path='/')

        return response

@csrf_exempt
@ensure_csrf_cookie
def register_view(request):
    if request.method == 'POST':
        data = request.body.decode('utf-8')
        try:
            user_data = json.loads(data)
            required_fields = ['first_name', 'last_name', 'user_name', 'password', 'email']
            for field in required_fields:
                if field not in user_data:
                    return JsonResponse({"message": f"Missing required field: {field}"}, status=400)

            try:
                user = User.objects.create_user(
                    first_name=user_data.get('first_name'),
                    last_name=user_data.get('last_name'),
                    user_name=user_data.get('user_name'),
                    email=user_data.get('email'),
                    password=user_data.get('password')
                )
                user.backend = 'django.contrib.auth.backends.ModelBackend'
                user.save()
            except ValueError:
                response = HttpResponse("User with this email already exists", status=404)
                return response
            csrf_token = get_token(request)
            response = HttpResponse("User created successfully", status=200)
            response.set_cookie('csrftoken', csrf_token, samesite='None', secure=True)

            return response

        except json.decoder.JSONDecodeError:
            return JsonResponse({"message": "Invalid json data!"}, status=404)

    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)


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


def filter_stories(request, topic):
    if request.method == 'GET':
        stories = Stories.objects.filter(topic=topic)
        if len(stories) > 0:
            lst = [StoriesSerializer(story).data for story in stories]
            return JsonResponse({'stories': lst}, status=200)
        else:
            return JsonResponse({'stories': []}, status=200)

class postEndpoint(APIView):
    required_scopes = ['all']
    permission_classes = [HasAllScopePermission, IsAuthenticated]
    def post(self, request, *args, **kwargs):
        data = request.data
        required_fields = ['title', 'content']
        for field in required_fields:
            if field not in data:
                return JsonResponse({'message': 'Post must include title and content'}, status=400)
        title = data.get('title')
        content = data.get('content')
        topic = extract_topic(title)[0]
        user = User.objects.get(email=request.user)
        
        story = Stories(title=title, content=content, topic=topic, author=user)
        story.save()
        return HttpResponse(status=200)
