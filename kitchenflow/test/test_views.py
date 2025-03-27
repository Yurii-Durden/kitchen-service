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
            password="password_test12345"
        )
        self.client.force_login(user)

    def test_private_access_to_manufacturer_list(self):
        DishType.objects.create(name="test1")
        DishType.objects.create(name="test2")

        dish_types = DishType.objects.all()
        response = self.client.get(DISH_TYPE_LIST_URL)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(
            list(response.context["dish_type_list"]),
            list(dish_types)
        )
        self.assertTemplateUsed(response, "kitchenflow/type_of_dishes_list.html")
