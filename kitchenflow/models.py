from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

# Create your models here.


class Cook(AbstractUser):
    years_of_experience = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    is_chef = models.BooleanField(default=False)

    class Meta:
        verbose_name = "cook"
        verbose_name_plural = "cooks"

    def __str__(self) -> str:
        return (
            f""
            f"{self.first_name} {self.last_name} - "
            f"{self.username}"
        )

    def save(self, *args, **kwargs):
        if self.first_name and self.last_name:
            self.first_name = self.first_name.title()
            self.last_name = self.last_name.title()
        super().save(*args, **kwargs)


class DishType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if self.name:
            self.name = self.name.title()
        super().save(*args, **kwargs)


class Dish(models.Model):
    name = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2,
        validators=[MinValueValidator(1)]
    )
    description = models.TextField(blank=True, null=True)
    dish_type = models.ForeignKey(
        DishType,
        on_delete=models.CASCADE,
        related_name="dishes"
    )
    cooks = models.ManyToManyField(Cook, related_name="dishes")
    ingredients = models.ManyToManyField(
        "Ingredient",
        through="DishIngredient",
        related_name="dishes"
    )

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name} — {self.dish_type}"

    def save(self, *args, **kwargs):
        if self.name:
            self.name = self.name.title()
        super().save(*args, **kwargs)


class IngredientType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if self.name:
            self.name = self.name.title()
        super().save(*args, **kwargs)


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    ingredient_type = models.ForeignKey(IngredientType, on_delete=models.CASCADE, related_name="ingredients")

    class Meta:
        ordering = ["ingredient_type", "name"]

    def __str__(self):
        return f"{self.name} - {self.ingredient_type}"

    def save(self, *args, **kwargs):
        if self.name:
            self.name = self.name.title()
        super().save(*args, **kwargs)


class DishIngredient(models.Model):
    dish = models.ForeignKey(
        Dish,
        on_delete=models.CASCADE,
        related_name="dishes"
    )
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        related_name="dish_ingredients"
    )

    amount = models.DecimalField(max_digits=6, decimal_places=2)
    unit = models.CharField(
        max_length=10,
        choices=[
            ("g", "gram"),
            ("kg", "kilogram"),
            ("ml", "milliliter"),
            ("l", "liter"),
            ("pcs", "pieces"),
            ("tbsp", "tablespoon"),
            ("tsp", "teaspoon"),
        ]
    )

    def __str__(self):
        return (f""
                f"{self.ingredient.name} "
                f"{self.amount} "
                f"{self.unit} in {self.dish.name}")


# class Ingredients(models.Model):
#     UNIT_CHOICES = [
#         ("g", "gram"),
#         ("kg", "kilogram"),
#         ("ml", "milliliter"),
#         ("l", "liter"),
#         ("pcs", "pieces"),
#         ("tbsp", "tablespoon"),
#         ("tsp", "teaspoon"),
#     ]
#
#     name = models.CharField(max_length=255, unique=True, default=None)
#     unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default="g")
#
#     class Meta:
#         ordering = ["name"]
#
#     def save(self, *args, **kwargs):
#         if self.name:
#             self.name = self.name.title()
#         super().save(*args, **kwargs)
