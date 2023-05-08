from django.contrib import admin

from api.models import Users, Categories, Notes

# Register your models here.

admin.site.register(Users)
admin.site.register(Categories)
admin.site.register(Notes)