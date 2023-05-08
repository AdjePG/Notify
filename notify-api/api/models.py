from django.db import models

# Create your models here.
class Users(models.Model):
    mail = models.EmailField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.user_mail} - {self.user_name}'

class Categories(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.id} - {self.name}'

class Notes(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    subject = models.CharField(max_length=40)
    message = models.TextField()
    post_date = models.DateTimeField()
    #update_date = models.DateTimeField(null=True)
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.id} - {self.subject}'
