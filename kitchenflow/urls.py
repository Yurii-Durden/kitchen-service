from django.urls import path

from kitchenflow import views


app_name = "kitchenflow"


urlpatterns = [
    path("", views.index, name="index"),
    path("cooks/", views.CookListView.as_view(), name="cook-list"),
    path("cooks/<int:pk>", views.CookDetailView.as_view(), name="cook-detail"),
    path("cooks/create/", views.CookCreateView.as_view(), name="cook-create"),
    path("dishes/", views.DishListView.as_view(), name="dish-list"),
    path("dishes/<int:pk>", views.DishDetailView.as_view(), name="dish-detail"),
    path("dish-types/", views.DishTypeListView.as_view(), name="dish-type-list"),
    path("dish-types/<int:pk>", views.DishTypeDetailView.as_view(), name="dish-type-detail")
]
