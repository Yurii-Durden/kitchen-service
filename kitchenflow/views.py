from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic

from kitchenflow.models import Cook, Dish, DishType

def index(request) -> HttpResponse:
    num_visits = request.session.get("num_visits", 0) + 1
    request.session["num_visits"] = num_visits
    context = {
        "count_of_cooks": Cook.objects.count(),
        "count_of_dishes": Dish.objects.count(),
        "count_of_dishes_type": DishType.objects.count(),
        "num_visits": num_visits
    }

    return render(request,"kitchenflow/home_page.html", context=context)


class CookListView(generic.ListView):
    model = Cook
    template_name = "kitchenflow/cooks_list.html"
    context_object_name = "cooks_list"
    paginate_by = 2


class CookDetailView(generic.DetailView):
    model = Cook


class DishDetailView(generic.DetailView):
    model = Dish


class DishListView(generic.ListView):
    model = Dish
    template_name = "kitchenflow/dishes_list.html"
    context_object_name = "dish_list"
    queryset = Dish.objects.select_related("dish_type")
    paginate_by = 2


class DishTypeListView(generic.ListView):
    model = DishType
    template_name = "kitchenflow/type_of_dishes_list.html"
    context_object_name = "dish_type_list"
    paginate_by = 2


class DishTypeDetailView(generic.DetailView):
    model = DishType
    template_name = "kitchenflow/dish_type_detail.html"
    context_object_name = "dish_type_detail"
