from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse


class CookAdminPanelTest(TestCase):
    def setUp(self):
        super_user = get_user_model().objects.create_superuser(
            username="test_name",
            password="password12345"
        )
        self.client.force_login(super_user)

        self.driver = get_user_model().objects.create_user(
            username="test_name_simple",
            password="passwords12345",
            first_name="first_name",
            last_name="last_name",
            years_of_experience="ABC12345"
        )