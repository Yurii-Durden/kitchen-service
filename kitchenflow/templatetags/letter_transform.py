from django import template

register = template.Library()


@register.filter
def letter_transform(text: str) -> str:
    text = text.lower()
    return text.capitalize()
