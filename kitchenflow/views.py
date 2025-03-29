from django.contrib.auth import logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse
from django.views import generic

from kitchenflow.models import Cook, Dish, DishType
from kitchenflow.forms import (
    CookCreationForm,
    CookPersonalInfoUpdateForm,
    DishCreatingForm,
    CookSearchForm,
    DishSearchForm,
    DishTypeSearchForm
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

    def get_context_data(
            self, *, object_list=..., **kwargs
    ):
        context = super(CookListView, self).get_context_data(**kwargs)
        username = self.request.GET.get("username")
        context["search_form"] = CookSearchForm(
            initial={"username": username}
        )
        return context

    def get_queryset(self):
        queryset = Cook.objects.all()
        username = self.request.GET.get("username")
        if username:
            return queryset.filter(username__icontains=username)
        return queryset



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


class CookDeleteView(LoginRequiredMixin, generic.DeleteView):
    model = Cook
    template_name = "kitchenflow/cook_delete.html"
    success_url = reverse_lazy("kitchenflow:cook-list")


class DishDetailView(LoginRequiredMixin, generic.DetailView):
    model = Dish

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["cooks"] = get_user_model().objects.all()

        return context


class DishListView(LoginRequiredMixin, generic.ListView):
    model = Dish
    template_name = "kitchenflow/dishes_list.html"
    context_object_name = "dish_list"
    paginate_by = 2

    def get_context_data(
        self, *, object_list = ..., **kwargs
    ):
        context = super(DishListView, self).get_context_data(**kwargs)
        name = self.request.GET.get("name")
        context["search_form"] = DishSearchForm(
            initial={"name":name}
        )

        return context

    def get_queryset(self):
        queryset = Dish.objects.select_related("dish_type")
        name = self.request.GET.get("name")
        if name:
            return queryset.filter(name__icontains=name)
        return queryset


class DishCreateView(LoginRequiredMixin, generic.CreateView):
    model = Dish
    form_class = DishCreatingForm
    success_url = reverse_lazy("kitchenflow:dish-list")


class DishUpdateView(LoginRequiredMixin, generic.UpdateView):
    model = Dish
    form_class = DishCreatingForm

    def get_success_url(self):
        return reverse("kitchenflow:dish-detail", args=[self.object.pk])


class DishDeleteView(LoginRequiredMixin, generic.DeleteView):
    model = Dish
    template_name = "kitchenflow/dish_delete.html"
    success_url = reverse_lazy("kitchenflow:dish-list")


class DishTypeListView(LoginRequiredMixin, generic.ListView):
    model = DishType
    template_name = "kitchenflow/type_of_dishes_list.html"
    context_object_name = "dish_type_list"
    paginate_by = 2

    def get_context_data(
        self, *, object_list = ..., **kwargs
    ):
        context = super(DishTypeListView, self).get_context_data(**kwargs)
        name = self.request.GET.get("name")
        context["search_form"] = DishTypeSearchForm(
            initial={"name": name}
        )

        return context

    def get_queryset(self):
        queryset = DishType.objects.all()
        name = self.request.GET.get("name")
        if name:
            return queryset.filter(name__icontains=name)
        return queryset


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


class DishTypeDeleteView(LoginRequiredMixin, generic.DeleteView):
    model = DishType
    template_name = "kitchenflow/dish_type_delete.html"
    success_url = reverse_lazy("kitchenflow:dish-type-list")


def remove_from_cooking(request, dish_pk: int, cook_pk: int) -> HttpResponseRedirect:
    cook = get_user_model().objects.get(id=cook_pk)
    dish = Dish.objects.get(id=dish_pk)
    if cook in dish.cooks.all():
        dish.cooks.remove(cook)
    else:
        dish.cooks.add(cook)
    return HttpResponseRedirect(reverse_lazy("kitchenflow:dish-detail", args=[dish_pk]))