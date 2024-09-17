from django import template
from django.forms import BoundField

register = template.Library()

@register.filter(name='add_class')
def add_class(value, css_class):
    """
    Adds a CSS class to a form field widget if the value is a form field.
    Otherwise, returns the value as-is.
    Usage: {{ form.field|add_class:"form-control" }}
    """
    if isinstance(value, BoundField):
        return value.as_widget(attrs={"class": css_class})
    return value
