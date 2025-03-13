from django.urls import path

from kitchenflow.views import index


app_name = "kitchenflow"


urlpatterns = [
    path("", index, name="index"),
]
