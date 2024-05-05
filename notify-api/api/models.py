from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    info = models.TextField(null=True)
    color_id = models.IntegerField(null=True)

    def __str__(self):
        return f'{self.id} - {self.name}'


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=40)
    message = models.TextField()
    post_date = models.DateTimeField()
    update_date = models.DateTimeField(null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.id} - {self.subject}'
