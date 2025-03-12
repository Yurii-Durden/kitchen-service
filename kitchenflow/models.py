from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class Cook(AbstractUser):
    years_of_experience = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "cook"
        verbose_name_plural = "cooks"

    def __str__(self) -> str:
        return (f""
                f"{self.first_name} {self.last_name} "
                f"({self.years_of_experience} years_of_experience)"
            )


class DishType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Dish(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    dish_type = models.ForeignKey(DishType, on_delete=models.CASCADE)
    cooks = models.ManyToManyField(Cook, related_name="dishes")

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} - {self.price}$"