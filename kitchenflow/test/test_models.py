from django.contrib.auth import get_user, get_user_model
from django.template.defaultfilters import first
from django.test import TestCase

from kitchenflow.models import Dish, DishType


class TestModels(TestCase):
    def test_str_method_for_user_model(self):
        cook = get_user_model().objects.create(
            username="test_name",
            first_name="first_name",
            last_name="last_name",
            years_of_experience=10,
            password="test_password_12345"
        )
        self.assertEquals(
            str(cook),
            f"{cook.first_name} {cook.last_name} "
            f"({cook.years_of_experience} years_of_experience)"
        )
