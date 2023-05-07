# from django.conf.urls import re_path
from django.urls import path, include, re_path
from pjob.views import (index, job_apply, user_applied_job,
                        jobs_applied, 
                        get_skills)
app_name = "pjob"

urlpatterns = [

    re_path(r'^$', index, name="index"),
    # re_path(r'(?P<jp>((\w{0,})-(?P<jid>(\w{0,})))+)(?:\/(?P<uid>[A-Za-z0-9]+))?/$','job_detail'),
    re_path(r'apply/(?P<job_id>[a-zA-Z0-9_-]+)/$', job_apply, name="job_apply"),
    re_path(r'applied_for/$', user_applied_job, name="user_applied_job"),
    re_path(r'applied/$', jobs_applied, name="jobs_applied"),
    # re_path(r'add/event/$', job_add_event, name="job_add_event"),
    re_path(r'get_skills/$', get_skills, name="get_skills"),
    re_path(r'^(?P<page_num>[0-9]+)/$', index),
]
