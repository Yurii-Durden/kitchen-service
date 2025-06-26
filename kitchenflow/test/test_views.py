from urllib.parse import urlencode

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from kitchenflow.models import Dish, DishType


DISH_TYPE_LIST_URL = reverse("kitchenflow:dish-type-list")


class PublicDishTypeListViewTest(TestCase):
    def test_public_access_to_manufacturer_list(self):
        DishType.objects.create(name="test1")
        DishType.objects.create(name="test2")

        response = self.client.get(DISH_TYPE_LIST_URL)
        self.assertNotEquals(response.status_code, 200)


class PrivateDishTypeListViewTest(TestCase):
    def setUp(self):
        user = get_user_model().objects.create(
            username="test_name",
            password="password_test12345",
            is_chef=True
        )
        self.client.force_login(user)

    def test_private_access_to_dish_types_list(self):
        DishType.objects.create(name="testone")
        DishType.objects.create(name="testtwo")

        dish_types = DishType.objects.all()
        response = self.client.get(DISH_TYPE_LIST_URL)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(
            list(response.context["dish_type_list"]),
            list(dish_types)
        )
        self.assertTemplateUsed(
            response,
            "kitchenflow/type_of_dishes_list.html"
        )


class SearchTest(TestCase):
    def setUp(self):
        user = get_user_model().objects.create(
            username="test_name",
            password="test_password12345",
            is_chef = True
        )
        self.client.force_login(user)

    def test_search_for_dish_type_list(self):
        DishType.objects.create(name="nameone")
        DishType.objects.create(name="name")
        DishType.objects.create(name="namethree")
        query_params = {"name": "Nameone"}

        full_url = f"{DISH_TYPE_LIST_URL}?{urlencode(query_params)}"
        response = self.client.get(full_url)
        self.assertEquals(
            list(DishType.objects.filter(name__icontains="nameone")),
            list(response.context["dish_type_list"])
        )

    def test_search_for_cook_list(self):
        get_user_model().objects.create(
            username="user1",
            password="password12345",
            years_of_experience=0
        )
        get_user_model().objects.create(
            username="user2",
            password="password12345",
            years_of_experience=1
        )
        get_user_model().objects.create(
            username="user3",
            password="password12345",
            years_of_experience=10
        )
        full_url = (
            f""
            f"{reverse('kitchenflow:cook-list')}"
            f"?{urlencode({'username':'u'})}"
        )
        response = self.client.get(full_url)
        self.assertEquals(
            list(get_user_model().objects.filter(username__icontains="u")[:3]),
            list(response.context["cooks_list"])
        )

    def test_search_for_dish_list(self):
        dish_type = DishType.objects.create(name="test_type_name")
        Dish.objects.create(name="test", price=10, dish_type=dish_type)
        Dish.objects.create(name="dish", price=10, dish_type=dish_type)
        Dish.objects.create(name="testt", price=10, dish_type=dish_type)

        full_url = (f"{reverse('kitchenflow:dish-list')}"
                    f"?{urlencode({'name':'test'})}")
        response = self.client.get(full_url)

        self.assertEquals(
            list(response.context["dish_list"]),
            list(Dish.objects.filter(name__icontains="test"))
        )

        url_without_filters = reverse("kitchenflow:dish-list")
        response_without_filters = self.client.get(url_without_filters)

        self.assertEquals(
            list(response_without_filters.context["dish_list"]),
            list(Dish.objects.all()[:3])
        )
