from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """Convert Todo model to JSON"""

    class Meta:
        model = Todo
        fields = ("id", "owner", "title", "description", "completed")

    owner = serializers.ReadOnlyField(source="owner.username")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
