from rest_framework import viewsets, permissions

from .serializers import TodoSerializer, UserSerializer

from .models import Todo
from django.contrib.auth.models import User

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    def get_queryset(self):

        user = self.request.user
        return Todo.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TodoSerializer


class UserView(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
