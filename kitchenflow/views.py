from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic

from kitchenflow.models import Cook, Dish, DishType

def index(request) -> HttpResponse:
    context = {
        "count_of_cooks": Cook.objects.count(),
        "count_of_dishes": Dish.objects.count(),
        "count_of_dishes_type": DishType.objects.count(),
    }

    return render(request,"kitchenflow/home_page.html", context=context)


class CookListView(generic.ListView):
    model = Cook
    template_name = "kitchenflow/cooks_list.html"
    context_object_name = "cooks_list"


class CookDetailView(generic.DetailView):
    model = Cook


class DishDetailView(generic.DetailView):
    model = Dish


class DishTypeDetailView(generic.DetailView):
    model = DishType
    template_name = "kitchenflow/dish_type_detail.html"
    context_object_name = "dish_type_detail"


class DishListView(generic.ListView):
    model = Dish
    template_name = "kitchenflow/dishes_list.html"
    context_object_name = "dish_list"
    queryset = Dish.objects.select_related("dish_type")


class DishTypeListView(generic.ListView):
    model = DishType
    template_name = "kitchenflow/type_of_dishes.html"
    context_object_name = "dish_type_list"

