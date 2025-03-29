from django.urls import path

from kitchenflow import views


app_name = "kitchenflow"


urlpatterns = [
    path("", views.index, name="index"),
    path("cooks/", views.CookListView.as_view(), name="cook-list"),
    path("cooks/<int:pk>", views.CookDetailView.as_view(), name="cook-detail"),
    path("cooks/create/", views.CookCreateView.as_view(), name="cook-create"),
    path("cooks/update/<int:pk>/", views.CookUpdateView.as_view(), name="cook-update"),
    path("cooks/delete/<int:pk>/", views.CookDeleteView.as_view(), name="cook-delete"),
    path("dishes/", views.DishListView.as_view(), name="dish-list"),
    path("dishes/create/", views.DishCreateView.as_view(), name="dish-create"),
    path("dishes/update/<int:pk>/", views.DishUpdateView.as_view(), name="dish-update"),
    path("dishes/<int:pk>", views.DishDetailView.as_view(), name="dish-detail"),
    path("dishes/<int:dish_pk>/<int:cook_pk>/remove-from-cooking/", views.remove_from_cooking, name="remove-from-cooking"),
    path("dishes/delete/<int:pk>/", views.DishDeleteView.as_view(), name="dish-delete"),
    path("dish-types/", views.DishTypeListView.as_view(), name="dish-type-list"),
    path("dish-types/<int:pk>", views.DishTypeDetailView.as_view(), name="dish-type-detail"),
    path("dish-types/create/", views.DishTypeCreateView.as_view(), name="dish-type-create"),
    path("dish-types/update/<int:pk>/", views.DishTypeUpdateView.as_view(), name="dish-type-update"),
    path("dish-types/delete/<int:pk>/", views.DishTypeDeleteView.as_view(), name="dish-type-delete"),
]
