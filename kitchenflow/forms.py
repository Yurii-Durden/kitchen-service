from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.hashers import make_password
from django.core.validators import MinValueValidator, MaxValueValidator
from django.forms.models import ModelForm

from kitchenflow.models import Cook, Dish, DishType


class CookCreationForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['username'].widget.attrs.update({'class': 'form_input'})
        self.fields['first_name'].widget.attrs.update({'class': 'form_input'})
        self.fields['last_name'].widget.attrs.update({'class': 'form_input'})
        self.fields['years_of_experience'].widget.attrs.update({'class': 'years_of_experience_input'})
        self.fields['is_chef'].widget.attrs.update({'class': 'is_chef_input'})
        self.fields['password1'].widget.attrs.update({'class': 'form_input password1_input'})
        self.fields['password2'].widget.attrs.update({'class': 'form_input password2_input'})

    class Meta(UserCreationForm.Meta):
        model = Cook
        fields = UserCreationForm.Meta.fields + (
            "first_name",
            "last_name",
            "years_of_experience",
            "is_chef",
        )

    def clean_username(self):
        username = self.cleaned_data.get("username")
        if not username:
            raise forms.ValidationError("Username is required")
        if len(username) < 3:
            raise forms.ValidationError("Username must be at least 3 characters long")
        return username

    def clean_first_name(self):
        first_name = self.cleaned_data.get("first_name")
        if not first_name:
            raise forms.ValidationError("First name is required")
        return first_name

    def clean_last_name(self):
        last_name = self.cleaned_data.get("last_name")
        if not last_name:
            raise forms.ValidationError("Last name is required")
        return last_name

    def clean_years_of_experience(self):
        years = self.cleaned_data.get("years_of_experience")
        if years is None:
            raise forms.ValidationError("Years of experience is required")
        if years < 0:
            raise forms.ValidationError("Experience cannot be negative")
        if years > 70:
            raise forms.ValidationError("Experience is unrealistically high")
        return years

    def clean_password1(self):
        password = self.cleaned_data.get("password1")
        if not password:
            raise forms.ValidationError("Password is required")
        if len(password) < 8:
            raise forms.ValidationError("Password must be at least 8 characters long")
        return password

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if not password2:
            raise forms.ValidationError("Please confirm your password")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match")
        return password2


class CookPersonalInfoUpdateForm(ModelForm):
    password1 = forms.CharField(
        label="New password",
        widget=forms.PasswordInput(attrs={"class": "form_input password1_input"}),
        required=False
    )
    password2 = forms.CharField(
        label="Confirm new password",
        widget=forms.PasswordInput(attrs={"class": "form_input password2_input"}),
        required=False
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form_input'})
        self.fields['first_name'].widget.attrs.update({'class': 'form_input'})
        self.fields['last_name'].widget.attrs.update({'class': 'form_input'})
        self.fields['years_of_experience'].widget.attrs.update({'class': 'years_of_experience_input'})
        self.fields['is_chef'].widget.attrs.update({'class': 'is_chef_input'})

    class Meta:
        model = Cook
        fields = (
            "username",
            "first_name",
            "last_name",
            "years_of_experience",
            "is_chef",
        )

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 or password2:
            if not password1:
                raise forms.ValidationError("New password is required")
            if not password2:
                raise forms.ValidationError("Please confirm the new password")
            if password1 != password2:
                raise forms.ValidationError("Passwords do not match")
            if len(password1) < 8:
                raise forms.ValidationError("Password must be at least 8 characters long")

        return cleaned_data

    def save(self, commit=True):
        cook = super().save(commit=False)
        password = self.cleaned_data.get("password1")
        if password:
            cook.password = make_password(password)
        if commit:
            cook.save()
        return cook

    def clean_username(self):
        username = self.cleaned_data.get("username")
        if not username:
            raise forms.ValidationError("Username is required")
        if len(username) < 3:
            raise forms.ValidationError("Username must be at least 3 characters long")
        return username

    def clean_first_name(self):
        first_name = self.cleaned_data.get("first_name")
        if not first_name:
            raise forms.ValidationError("First name is required")
        return first_name

    def clean_last_name(self):
        last_name = self.cleaned_data.get("last_name")
        if not last_name:
            raise forms.ValidationError("Last name is required")
        return last_name

    def clean_years_of_experience(self):
        years = self.cleaned_data.get("years_of_experience")
        if years is None:
            raise forms.ValidationError("Years of experience is required")
        if years < 0:
            raise forms.ValidationError("Experience cannot be negative")
        if years > 70:
            raise forms.ValidationError("Experience is unrealistically high")
        return years



class DishTypeCreatingForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': 'form_input'})

    class Meta:
        model = DishType
        fields = "__all__"

    def clean_name(self):
        name = self.cleaned_data['name'].strip()

        if len(name) < 2:
            raise forms.ValidationError("The name must be at least 2 characters long")

        if any(letter.isdigit() for letter in name):
            raise forms.ValidationError("The name should not contain numbers")

        if DishType.objects.filter(name__iexact=name).exists():
            raise forms.ValidationError("A dish type with this name already exists")

        return name


class DishCreatingForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': 'form_input'})
        self.fields['price'].widget.attrs.update({'class': 'form_input price_input'})
        self.fields['description'].widget.attrs.update({
            'class': 'form_input',
            'wrap': 'soft',
            'rows': 10,
        })
        self.fields['dish_type'].widget.attrs.update({'class': 'dish__check'})
        self.fields['cooks'].widget.attrs.update({'class': 'cooks__multi'})

    cooks = forms.ModelMultipleChoiceField(
        queryset=get_user_model().objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )

    dish_type = forms.Select(attrs={'class': 'custom__select'})

    class Meta:
        model = Dish
        fields = (
            "name",
            "price",
            "description",
            "dish_type",
            "cooks",
        )

    def clean_name(self):
        name = self.cleaned_data.get("name")
        if not name:
            raise forms.ValidationError("Name is required")
        if len(name.strip()) < 3:
            raise forms.ValidationError("Name must be at least 3 characters")
        return name

    def clean_price(self):
        price = self.cleaned_data.get("price")
        if price is None:
            raise forms.ValidationError("Price is required")
        if price < 0:
            raise forms.ValidationError("Price cannot be negative")
        if price > 10000:
            raise forms.ValidationError("Price is unrealistically high")
        return price

    def clean_description(self):
        price = self.cleaned_data.get("price")
        description = self.cleaned_data.get("description")

        if price and price >= 100 and not description:
            raise forms.ValidationError("Description is required for expensive dishes")
        if description and len(description.strip()) < 10:
            raise forms.ValidationError("Description must be at least 10 characters")
        return description

    def clean_dish_type(self):
        dish_type = self.cleaned_data.get("dish_type")
        if not dish_type:
            raise forms.ValidationError("Dish type is required")
        return dish_type


class CookSearchForm(forms.Form):
    username = forms.CharField(
        max_length=255,
        label="",
        required=False,
        widget=forms.TextInput(attrs={
            "placeholder": "search by username",
            "class": "search__input hover__elem",
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
            "class": "search__input hover__elem",
            "autocomplete": "off",
        })
    )

class DishTypeSearchForm(forms.Form):
    name = forms.CharField(
        max_length=255,
        label="",
        required=False,
        widget=forms.TextInput(attrs={
            "placeholder": "search by dish type name",
            "class": "search__input hover__elem",
            "autocomplete": "off",
        })
    )