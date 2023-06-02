from django.urls import path, include, re_path
from social.views import facebook_login, google_login, github_login, linkedin_login, twitter_login, \
    facebook_connect, google_connect, linkedin_connect, sofconnect

app_name = "social"

urlpatterns = [

    # login
    re_path(r'^facebook_login/$', facebook_login, name="facebook_login"),
    re_path(r'^google_login/$', google_login, name="google_login"),
    re_path(r'^github/$', github_login, name="github_login"),
    re_path(r'^linkedin_login/$', linkedin_login, name="linkedin_login"),
    re_path(r'^twitter_login/$', twitter_login, name="twitter_login"),

    # connect after login
    re_path(r'^facebook-connect/$', facebook_connect, name="facebook_connect"),
    re_path(r'^google-connect/$', google_connect, name="google_connect"),
    re_path(r'^linkedin-connect/$', linkedin_connect, name="linkedin_connect"),
    re_path(r'^stackoverflow-connect/$', sofconnect, name="sofconnect"),
]
