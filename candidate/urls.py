from django.urls import path, include, re_path
from .views import (index, upload_resume, upload_profilepic, profile, edit_personalinfo, edit_profile_description,
                    edit_professionalinfo, add_language, edit_language, delete_language, add_experience, edit_experience,
                    delete_experience, add_education, edit_education, delete_education, add_technicalskill, edit_technicalskill,
                    delete_technicalskill, add_project, edit_project, delete_project, edit_email, job_alert, job_alert_results,
                    modify_job_alert, alerts_list, delete_job_alert, edit_emailnotifications, delete_resume, user_password_change, messages)

app_name = "candidate"

urlpatterns = [
    # re_path(r'^home/$','home'),
    re_path(r'^$', index, name="index"),
    re_path(r'^profile/$', profile, name="profile"),
    re_path(r'personalinfo/edit/$', edit_personalinfo, name="edit_personalinfo"),
    re_path(r'profile_description/edit/$', edit_profile_description, name="edit_profile_description"),

    re_path(r'email/edit/$', edit_email, name="edit_email"),
    re_path(r'professionalinfo/edit/$', edit_professionalinfo, name="edit_professionalinfo"),

    # mobile verify
    # re_path(r'^mobile/verify/$', verify_mobile, name="verify_mobile"),
    # re_path(r'^send/mobile_verification_code/$', send_mobile_verification_code, name="send_mobile_verification_code"),

    # language urls
    re_path(r'language/add/$', add_language, name="add_language"),
    re_path(r'language/edit/(?P<language_id>[a-zA-Z0-9_-]+)/$',
        edit_language, name="edit_language"),
    re_path(r'language/delete/(?P<language_id>[a-zA-Z0-9_-]+)/$',
        delete_language, name="delete_language"),


    # experience urls
    re_path(r'experience/add/$', add_experience, name="add_experience"),
    re_path(r'experience/edit/(?P<experience_id>[a-zA-Z0-9_-]+)/$',
        edit_experience, name="edit_experience"),
    re_path(r'experience/delete/(?P<experience_id>[a-zA-Z0-9_-]+)/$',
        delete_experience, name="delete_experience"),


    # education urls
    re_path(r'education/add/$', add_education, name="add_education"),
    re_path(r'education/edit/(?P<education_id>[a-zA-Z0-9_-]+)/$',
        edit_education, name="edit_education"),
    re_path(r'education/delete/(?P<education_id>[a-zA-Z0-9_-]+)/$',
        delete_education, name="delete_education"),


    # techskill urls
    re_path(r'technicalskill/add/$', add_technicalskill,
        name="add_technicalskill"),
    re_path(r'technicalskill/edit/(?P<technical_skill_id>[a-zA-Z0-9_-]+)/$',
        edit_technicalskill, name="edit_technicalskill"),
    re_path(r'technicalskill/delete/(?P<technical_skill_id>[a-zA-Z0-9_-]+)/$',
        delete_technicalskill, name="delete_technicalskill"),


    # project urls
    re_path(r'project/add/$', add_project, name="add_project"),
    re_path(r'project/edit/(?P<project_id>[a-zA-Z0-9_-]+)/$',
        edit_project, name="edit_project"),
    re_path(r'project/delete/(?P<project_id>[a-zA-Z0-9_-]+)/$',
        delete_project, name="delete_project"),

    # resume urls
    re_path(r'upload_resume/$', upload_resume, name="upload_resume"),
    re_path(r'delete-resume/$', delete_resume, name="delete_resume"),
    re_path(r'upload_profilepic/$', upload_profilepic, name="upload_profilepic"),


    re_path(r'edit_emailnotifications/$', edit_emailnotifications,
        name="edit_emailnotifications"),

    # job alert
    re_path(r'^alert/create/$', job_alert, name="job_alert"),
    re_path(r'^alert/list/$', alerts_list, name="alerts_list"),
    re_path(r'^alert/list/(?P<page_num>[-\w]+)/$', alerts_list),
    re_path(r'^alert/results/(?P<job_alert_id>[a-zA-Z0-9_-]+)/$',
        job_alert_results, name="job_alert_results"),
    re_path(r'^alert/modify/(?P<job_alert_id>[a-zA-Z0-9_-]+)/$',
        modify_job_alert, name="modify_job_alert"),
    re_path(r'^alert/delete/(?P<job_alert_id>[a-zA-Z0-9_-]+)/$',
        delete_job_alert, name="delete_job_alert"),
    re_path(r'user/password/change/', user_password_change,
        name="user_password_change"),
    re_path(r'^messages/$', messages, name="messages"),
]
