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


class DishListView(generic.ListView):
    model = Dish
    template_name = "kitchenflow/dishes_list.html"
    context_object_name = "dish_list"
