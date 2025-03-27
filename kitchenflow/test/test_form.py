from django.contrib.auth import get_user_model
from django.test import TestCase

from kitchenflow.forms import DishCreatingForm, CookCreationForm
from kitchenflow.models import DishType


DATA_COOK = {
    "username": "test_name_user",
    "password1": "testpassword12345",
    "password2": "testpassword12345",
    "first_name": "First name",
    "last_name": "Last name",
    "years_of_experience": 10
}


class FormTest(TestCase):
    def setUp(self):
        self.cook = get_user_model().objects.create(username="test_name")
        self.type_dish = DishType.objects.create(name="test_name")

    def test_cook_creation_form_if_add_custom_field_years_of_experience(self):
        form = CookCreationForm(
            data=DATA_COOK
        )
        print(form.errors)
        self.assertTrue(form.is_valid())
        self.assertEquals(form.cleaned_data, DATA_COOK)

    def test_custom_description_validator_in_dish_creation_form(self):
        data = {
            "name": "test_name",
            "description": None,
            "price": 10,
            "dish_type": self.type_dish.id,
            "cooks": [self.cook.id]
        }
        for price in [100, 101, 1000]:
            data["price"] = price
            form = DishCreatingForm(
                data=data
            )
            print(form.errors)
            self.assertFalse(form.is_valid())