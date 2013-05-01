from django import template
from django.conf import settings

register = template.Library()

@register.inclusion_tag('multiuploader/multiuploader_main.html')
def multiupform(target, upload_label):
    return {'static_url':settings.MEDIA_URL + '/', 'target': target, 'upload_label': upload_label}
