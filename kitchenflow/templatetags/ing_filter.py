from django import template
from django.core.exceptions import ObjectDoesNotExist

register = template.Library()


@register.filter
def get_item(queryset, id_value):
    try:
        return queryset.get(pk=id_value)
    except ObjectDoesNotExist:
        return ""
