from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import reverse_lazy, reverse
from django.views import generic

from kitchenflow.models import Cook, Dish, DishType
from kitchenflow.forms import (
    CookCreationForm,
    CookPersonalInfoUpdateForm,
    DishCreatingForm
)

@login_required
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


@login_required
def logout_view(request) -> HttpResponse:
    logout(request)
    return render(request, "registration/logged_out.html")


class CookListView(LoginRequiredMixin, generic.ListView):
    model = Cook
    template_name = "kitchenflow/cooks_list.html"
    context_object_name = "cooks_list"
    paginate_by = 2


class CookDetailView(LoginRequiredMixin, generic.DetailView):
    model = Cook


class CookCreateView(LoginRequiredMixin, generic.CreateView):
    model = Cook
    form_class = CookCreationForm
    success_url = reverse_lazy("kitchenflow:cook-list")


class CookUpdateView(LoginRequiredMixin, generic.UpdateView):
    model = Cook
    form_class = CookPersonalInfoUpdateForm

    def get_success_url(self):
        return reverse("kitchenflow:cook-detail", args=[self.object.pk])


class DishDetailView(LoginRequiredMixin, generic.DetailView):
    model = Dish


class DishListView(LoginRequiredMixin, generic.ListView):
    model = Dish
    template_name = "kitchenflow/dishes_list.html"
    context_object_name = "dish_list"
    queryset = Dish.objects.select_related("dish_type")
    paginate_by = 2


class DishCreateView(LoginRequiredMixin, generic.CreateView):
    model = Dish
    form_class = DishCreatingForm
    success_url = reverse_lazy("kitchenflow:dish-list")


class DishUpdateView(LoginRequiredMixin, generic.UpdateView):
    model = Dish
    form_class = DishCreatingForm

    def get_success_url(self):
        return reverse("kitchenflow:dish-detail", args=[self.object.pk])


class DishTypeListView(LoginRequiredMixin, generic.ListView):
    model = DishType
    template_name = "kitchenflow/type_of_dishes_list.html"
    context_object_name = "dish_type_list"
    paginate_by = 2


class DishTypeDetailView(LoginRequiredMixin, generic.DetailView):
    model = DishType
    template_name = "kitchenflow/dish_type_detail.html"
    context_object_name = "dish_type_detail"


class DishTypeCreateView(LoginRequiredMixin, generic.CreateView):
    model = DishType
    template_name = "kitchenflow/dish_type_form.html"
    success_url = reverse_lazy("kitchenflow:dish-type-list")
    fields = "__all__"


class DishTypeUpdateView(LoginRequiredMixin, generic.UpdateView):
    model = DishType
    template_name = "kitchenflow/dish_type_form.html"
    fields = "__all__"

    def get_success_url(self):
        return reverse("kitchenflow:dish-type-detail", args=[self.object.id])
