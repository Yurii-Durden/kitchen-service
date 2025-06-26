from django.contrib.auth import get_user_model
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

        def test_str_method_for_dish_model(self):
            dish = Dish.objects.create(
                name="test_name",
                price=10,
                dish_type=DishType.objects.create(name="test_name")
            )
            self.assertEquals(str(dish), f"{dish.name} - {dish.price}$")

        def test_str_method_for_dish_type_model_and_if_first_letter_in_uppercase(self):  # noqa: E501
            dish_type = DishType.objects.create(name="test_type".title())
            self.assertEquals(str(dish_type), dish_type.name)

        def test_cook_if_add_custom_fields(self):
            first_name = "first_name"
            last_name = "last_name"
            years_of_experience = 10

            cook = get_user_model().objects.create(
                username="test_name",
                first_name=first_name,
                last_name=last_name,
                password="test_password_12345",
                years_of_experience=10
            )
            self.assertEquals(cook.years_of_experience, years_of_experience)
            self.assertEquals(cook.first_name, first_name)
            self.assertEquals(cook.last_name, last_name)
