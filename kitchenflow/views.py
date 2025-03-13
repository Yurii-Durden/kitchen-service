from django.http import HttpResponse
from django.shortcuts import render

from kitchenflow.models import Cook, Dish, DishType

def index(request) -> HttpResponse:
    context = {
        "count_of_cooks": Cook.objects.count(),
        "count_of_dishes": Dish.objects.count(),
        "count_of_dishes_type": DishType.objects.count(),
    }

    return render(request,"kitchenflow/home_page.html", context=context)
