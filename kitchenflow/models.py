from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class Cook(AbstractUser):
    years_of_experience = models.PositiveIntegerField()

    class Meta:
        verbose_name = "cook"
        verbose_name_plural = "cooks"

    def __str__(self) -> str:
        return (f""
                f"{self.first_name} {self.last_name} "
                f"({self.years_of_experience} years_of_experience)"
            )
