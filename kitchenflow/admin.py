from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Cook, DishType, Dish, Ingredient, DishIngredient, IngredientType


@admin.register(Cook)
class CookAdmin(UserAdmin):
    list_display = UserAdmin.list_display + ("years_of_experience", "is_chef")
    fieldsets = UserAdmin.fieldsets + (
        (("Additional info", {"fields": ("years_of_experience", "is_chef")}),)
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            (
                "Additional info",
                {
                    "fields": (
                        "first_name",
                        "last_name",
                        "years_of_experience",
                        "is_chef"
                    )
                },
            ),
        )
    )


class DishIngredientInline(admin.TabularInline):
    model = DishIngredient
    extra = 1


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ("name", "price", )
    search_fields = ("name", )
    list_filter = ("dish_type", )
    inlines = [DishIngredientInline]


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ("name", "type")
    search_fields = ("name",)
    list_filter = ("name",)


admin.site.register(DishType)
admin.site.register(IngredientType)
