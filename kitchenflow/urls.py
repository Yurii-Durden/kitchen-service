from django.urls import path

from kitchenflow import views


app_name = "kitchenflow"


urlpatterns = [
    path("", views.index, name="index"),
    path("cooks/", views.CookListView.as_view(), name="cook-list"),
    path("dishes/", views.DishListView.as_view(), name="dish-list"),
    path("dish-types/", views.DishTypeListView.as_view(), name="dish-type-list"),
]
