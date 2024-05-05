from rest_framework import serializers
from .models import Note, Category, User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        #fields = ('id', 'user_id', 'name', 'info', 'color_id')

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        #fields = ('id', 'user', 'subject', 'message', 'post_date', 'update_date', 'category')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email')
        extra_kwargs = {
            'password': {'write_only': True},
        }
