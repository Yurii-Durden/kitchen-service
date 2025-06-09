from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import MinValueValidator, MaxValueValidator
from django.forms.models import ModelForm

from kitchenflow.models import Cook, Dish, DishType


class CookCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = Cook
        fields = UserCreationForm.Meta.fields + (
            "first_name",
            "last_name",
            "years_of_experience",
            "is_chef",
        )


class CookPersonalInfoUpdateForm(ModelForm):
    class Meta:
        model = Cook
        fields = [
            "first_name",
            "last_name",
            "years_of_experience"
        ]


class DishCreatingForm(ModelForm):
    cooks = forms.ModelMultipleChoiceField(
        queryset=get_user_model().objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )

    class Meta:
        model = Dish
        fields = "__all__"

    def clean_description(self):
        price = self.cleaned_data.get("price")
        description = self.cleaned_data.get("description")

        if price >= 100 and not description:
            raise forms.ValidationError("Description is required for expensive dishes.")
        return description


class CookSearchForm(forms.Form):
    username = forms.CharField(
        max_length=255,
        label="",
        required=False,
        widget=forms.TextInput(attrs={
            "placeholder": "search by username",
            "class": "search__input",
            "autocomplete": "off",
        })
    )

class DishSearchForm(forms.Form):
    name = forms.CharField(
        max_length=255,
        label="",
        required=False,
        widget=forms.TextInput(attrs={
            "placeholder": "search by dish name",
            "class": "search__input",
            "autocomplete": "off",
        })
    )

class DishTypeSearchForm(forms.Form):
    name = forms.CharField(
        max_length=255,
        label="",
        required=False,
        widget=forms.TextInput(attrs={"placeholder": "search by dish type name"})
    )