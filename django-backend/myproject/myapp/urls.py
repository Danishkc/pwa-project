from django.urls import path
from .views import compare_ngrams

urlpatterns = [
    path('compare-ngrams/', compare_ngrams, name='compare-ngrams'),
]

