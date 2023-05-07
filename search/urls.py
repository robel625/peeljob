from django.urls import path, include, re_path
from search.views import (skill_auto_search, city_auto_search, industry_auto_search, state_auto_search,
                          functional_area_auto_search, custome_search, education_auto_search)

app_name = "search"

urlpatterns = [
    re_path(r'^skill-auto/$', skill_auto_search),
    re_path(r'^city-auto/$', city_auto_search),
    re_path(r'^industry-auto/$', industry_auto_search),
    re_path(r'^functional-area-auto/$', functional_area_auto_search),
    re_path(r'^education-auto/$', education_auto_search),
    re_path(r'^state-auto/$', state_auto_search),
    re_path(r'^(?P<slug>([-\w/0-9-])+)/$', custome_search),
]
