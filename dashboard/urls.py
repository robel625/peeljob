from django.urls import path, include, re_path
# from .views import ( index, country, locations, tech_skills, delete_skill, skill_status, languages,  qualifications,
#                      delete_qualification, delete_functional_area, functional_area_status, industries, functional_area, save_meta_data, redirect_data,
#                       new_company, edit_company, companies, enable_company,
#                     enable_agency, delete_company, enable_paid_company, view_company, company_recruiters,
#                     company_jobposts, company_tickets, edit_menu, delete_menu, menu_status, menu_order, recruiters_list,
#                     post_list, new_govt_job, applicants, search_log, search_summary, applicants_mail, mobile_campaign,
#                      removing_duplicate_companies, moving_duplicates, subscribers, view_subscribers, csv_download, updating_whatsapp_campaign,
#                       reports, assessment_skills, new_question, emailtemplates, sent_mails, new_template, skill_questions, delete_language, view_applicant,
#                        applicant_actions, view_recruiter, recruiter_status_change, recruiter_delete, recruiter_paid_status_change, post_detail,
#                         delete_industry, industry_status, change_password, admin_user_list, new_admin_user, edit_user, view_user, delete_user,
#                          qualification_status, status_change, deactivate_job, enable_job, delete_job, publish_job )

from .views import (index, change_password, admin_user_list, new_admin_user, edit_user, view_user,
                    country, locations,  tech_skills, delete_skill,
                    delete_user, skill_status, languages, qualification_status,
                    delete_language, qualifications, delete_qualification, delete_functional_area,
                    industries, delete_industry, industry_status, functional_area,
                    functional_area_status, recruiters_list, view_recruiter, recruiter_status_change,
                    recruiter_delete, recruiter_paid_status_change, post_list, post_detail, status_change,
                    deactivate_job, enable_job, delete_job, publish_job, new_govt_job, edit_govt_job,
                    preview_job, edit_job_title,
                    applicants, view_applicant,view_applicant_email, applicant_actions, emailtemplates, moving_duplicates,
                    new_template, edit_template, view_template, delete_template, send_mail, sent_mails,
                    view_sent_mail, delete_sent_mail, search_log, view_search_log, subscribers, view_subscribers,
                    search_summary, applicants_mail, removing_duplicate_companies, mobile_campaign, csv_download,
                    reports, updating_whatsapp_campaign, new_company, edit_company, companies, enable_company,
                    enable_agency, delete_company, enable_paid_company, view_company, company_recruiters,
                    company_jobposts, company_tickets, edit_menu, delete_menu, menu_status, menu_order,
                     assessment_skills, new_question, skill_questions, view_question, save_meta_data,
                    clear_cache, redirect_data, file_display_view)

# from .views import (index, change_password, admin_user_list, new_admin_user, edit_user, view_user,
#                     country, locations, aws_push_to_s3, aws_del_from_s3, tech_skills, delete_skill,
#                     delete_user, skill_status, languages, qualification_status,
#                     delete_language, qualifications, delete_qualification, delete_functional_area,
#                     industries, delete_industry, industry_status, functional_area,
#                     functional_area_status, recruiters_list, view_recruiter, recruiter_status_change,
#                     recruiter_delete, recruiter_paid_status_change, post_list, post_detail, status_change,
#                     deactivate_job, enable_job, delete_job, publish_job, new_govt_job, edit_govt_job,
#                     preview_job, edit_job_title, post_on_all_fb_groups, adding_existing_candidates_to_jobposts,
#                     applicants, view_applicant, applicant_actions, emailtemplates, moving_duplicates,
#                     new_template, edit_template, view_template, delete_template, send_mail, sent_mails,
#                     view_sent_mail, delete_sent_mail, search_log, view_search_log, subscribers, view_subscribers,
#                     search_summary, applicants_mail, removing_duplicate_companies, mobile_campaign, csv_download,
#                     reports, updating_whatsapp_campaign, new_company, edit_company, companies, enable_company,
#                     enable_agency, delete_company, enable_paid_company, view_company, company_recruiters,
#                     company_jobposts, company_tickets, edit_menu, delete_menu, menu_status, menu_order,
#                     google_login, assessment_skills, new_question, skill_questions, view_question, save_meta_data,
#                     clear_cache, redirect_data)

app_name = "dashboard"

urlpatterns = [

    re_path(r'^$', index, name="index"),
    re_path(r'^change_password/$', change_password, name="change_password"),
    # re_path(r'^google_login/$', google_login, name="google_login"),

    # users
    re_path(r'^users/list/$', admin_user_list, name='admin_user_list'),
    re_path(r'^users/new-user/$', new_admin_user, name='new_admin_user'),
    re_path(r'^users/edit/(?P<user_id>[-\w]+)/$', edit_user, name='edit_user'),
    re_path(r'^users/view/(?P<user_id>[-\w]+)/$', view_user, name='view_user'),
    re_path(r'^users/delete/(?P<user_id>[-\w]+)/$',
        delete_user, name='delete_user'),

    # data
    re_path(r'^country/$', country, name='country'),
    re_path(r'^(?P<status>[-\w]+)/locations/$', locations, name='locations'),
    # re_path(r'^aws-push-to-s3/$', aws_push_to_s3, name='aws_push_to_s3'),
    # re_path(r'^aws-del-from-s3/$', aws_del_from_s3, name='aws_del_from_s3'),

    # technical skill
    re_path(r'^technical_skills/$', tech_skills, name='tech_skills'),
    re_path(r'^delete_skill/(?P<skill_id>[-\w]+)/$',
        delete_skill, name='delete_skill'),
    re_path(r'^skill/status/(?P<skill_id>[-\w]+)/$',
        skill_status, name='skill_status'),

    # # languages
    re_path(r'^languages/$', languages, name='languages'),
    re_path(r'^delete_language/(?P<language_id>[-\w]+)/$',
        delete_language, name='delete_language'),

    # # qualification
    re_path(r'^qualifications/$', qualifications, name='qualifications'),
    re_path(r'^delete_qualification/(?P<qualification_id>[-\w]+)/$',
        delete_qualification, name='delete_qualification'),
    re_path(r'^qualification/status/(?P<qualification_id>[-\w]+)/$',
        qualification_status, name='qualification_status'),

    # # industry
    re_path(r'^industries/$', industries, name='industries'),
    re_path(r'^delete_industry/(?P<industry_id>[-\w]+)/$',
        delete_industry, name='delete_industry'),
    re_path(r'^industry/status/(?P<industry_id>[-\w]+)/$',
        industry_status, name='industry_status'),

    # # functinal area
    re_path(r'^functional_area/$', functional_area, name='functional_area'),
    re_path(r'^functional_area/(?P<functional_area_id>[-\w]+)/$',
        delete_functional_area, name='delete_functional_area'),
    re_path(r'^functional_area/status/(?P<functional_area_id>[-\w]+)/$',
        functional_area_status, name='functional_area_status'),

    # # recruiter
    re_path(r'^recruiters/(?P<status>[-\w]+)/list/$',
        recruiters_list, name="recruiters_list"),
    re_path(r'^recruiter/view/(?P<user_id>[a-zA-Z0-9_-]+)/$',
        view_recruiter, name='view_recruiter'),
    re_path(r'^recruiter/status/(?P<user_id>[a-zA-Z0-9_-]+)/$',
        recruiter_status_change, name='recruiter_status_change'),
    re_path(r'^recruiter/remove/(?P<user_id>[a-zA-Z0-9_-]+)/$',
        recruiter_delete, name='recruiter_delete'),
    re_path(r'^recruiter/paid-status/(?P<user_id>[a-zA-Z0-9_-]+)/$',
        recruiter_paid_status_change, name='recruiter_paid_status_change'),

    # # jobposts
    re_path(r'^jobpost/(?P<job_type>[-\w]+)/list/', post_list, name="job_posts"),
    re_path(r'^jobpost/view/(?P<post_id>[-\w]+)/',
        post_detail, name="post_detail"),
    re_path(r'^jobpost/status_change/(?P<post_id>[-\w]+)/$',
        status_change, name='status_change'),
    re_path(r'^jobpost/deactivate/(?P<job_post_id>[a-zA-Z0-9]+)/$',
        deactivate_job, name="deactivate_job"),
    re_path(r'^jobpost/enable/(?P<job_post_id>[a-zA-Z0-9]+)/$',
        enable_job, name="enable"),
    re_path(r'^jobpost/delete/(?P<job_post_id>[a-zA-Z0-9]+)/$',
        delete_job, name="delete"),
    re_path(r'^jobpost/publish/(?P<job_post_id>[a-zA-Z0-9]+)/$',
        publish_job, name="publish"),
    re_path(r'^jobpost/(?P<job_type>[-\w]+)/add/$',
        new_govt_job, name="new_govt_job"),
    re_path(r'^jobpost/edit/(?P<post_id>[-\w]+)/$',
        edit_govt_job, name="edit_govt_job"),
    re_path(r'^jobpost/preview/(?P<post_id>[-\w]+)/$',
        preview_job, name="preview_job"),
    re_path(r'^jobpost/title/edit/(?P<post_id>[-\w]+)/$',
        edit_job_title, name="edit_job_title"),
    # re_path(r'^jobpost/fb-groups/post/(?P<post_id>[-\w]+)/$',
    #     post_on_all_fb_groups, name="post_on_all_fb_groups"),
    # re_path(r'^jobpost/candidates-add/(?P<post_id>[-\w]+)/$',
    #     adding_existing_candidates_to_jobposts, name="adding_existing_candidates_to_jobposts"),

    # # applicants
    re_path(r'^applicants/list/$', applicants, name="applicants"),
    re_path(r'^applicants/(?P<status>[-\w]+)/list/$',
        applicants, name="applicants"),
    re_path(r'^applicant/view/(?P<user_id>[a-zA-Z0-9_-]+)/$',
        view_applicant, name='view_applicant'),
    re_path(r'^applicant/view/(?P<user_email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$',
        view_applicant_email, name='view_applicant_email'),
    re_path(r'^applicant/actions/(?P<user_id>[a-zA-Z0-9_-]+)/$',
        applicant_actions, name='applicant_actions'),

    # # mail templates
    re_path(r'^mail-template/list/', emailtemplates, name="emailtemplates"),
    re_path(r'^mail-template/new/', new_template, name="new_template"),
    re_path(r'^mail-template/edit/(?P<template_id>[-\w]+)/',
        edit_template, name="edit_mailtemplate"),
    re_path(r'^mail-template/view/(?P<template_id>[-\w]+)/',
        view_template, name="view_mailtemplate"),
    re_path(r'^mail-template/delete/(?P<template_id>[-\w]+)/',
        delete_template, name="delete_mailtemplate"),

    re_path(r'^send_mail/(?P<template_id>[-\w]+)/', send_mail, name="send_mail"),

    # # view sent mails
    re_path(r'^sent-mail/list/', sent_mails, name="sent_mails"),
    re_path(r'^sent-mail/view/(?P<sent_mail_id>[-\w]+)/',
        view_sent_mail, name="view_sent_mail"),
    re_path(r'^sent-mail/delete/(?P<sent_mail_id>[-\w]+)/',
        delete_sent_mail, name="delete_sent_mail"),

    # # view search logs
    re_path(r'^search-log/list/', search_log, name="search_log"),

    re_path(r'^search-log/view/(?P<search_log_id>[-\w]+)/',
        view_search_log, name="view_search_log"),

    # # view search logs
    re_path(r'^subscribers/list/', subscribers, name="subscribers"),
    re_path(r'^subscribers/view/(?P<skill_id>[-\w]+)/',
        view_subscribers, name="view_subscribers"),

    re_path(r'^search/(?P<search_type>[-\w]+)/summary/', search_summary, name="search_summary"),

    re_path(r'^applicants-mails/', applicants_mail, name="applicants_mail"),
    re_path(r'^update-company-jobposts/', removing_duplicate_companies,
        name="removing_duplicate_companies"),

    re_path(r'^mobile-campaign/', mobile_campaign, name="mobile_campaign"),
    re_path(r'^csv/download', csv_download, name="csv_download"),
    re_path(r'^reports/', reports, name="reports"),
    re_path(r'^whatsapp-campaign/update/', updating_whatsapp_campaign,
        name="updating_whatsapp_campaign"),

    # companies
    re_path(r'^companies/new/', new_company, name="new_company"),
    re_path(r'^companies/edit/(?P<company_id>[-\w]+)/',
        edit_company, name="edit_company"),
    re_path(r'^companies/(?P<company_type>[-\w]+)/list/',
        companies, name="companies"),
    re_path(r'^company/status/(?P<company_id>[-\w]+)/',
        enable_company, name="enable_company"),
    re_path(r'^company/agency/(?P<agency_id>[-\w]+)/',
        enable_agency, name="enable_agency"),
    re_path(r'^company/delete/(?P<company_id>[-\w]+)/',
        delete_company, name="delete_company"),
    re_path(r'^company/paid/(?P<company_id>[-\w]+)/',
        enable_paid_company, name="enable_paid_company"),

    re_path(r'^company/view/(?P<company_id>[-\w]+)/',
        view_company, name="view_company"),
    re_path(r'^company/(?P<company_id>[-\w]+)/recruiters/(?P<status>[-\w]+)/list/',
        company_recruiters, name="company_recruiters"),
    re_path(r'^company/jobposts/(?P<company_id>[-\w]+)/',
        company_jobposts, name="company_jobposts"),
    re_path(r'^company/tickets/(?P<company_id>[-\w]+)/',
        company_tickets, name="company_tickets"),

    re_path(r'^company/(?P<company_id>[-\w]+)/menu/edit/(?P<menu_id>[a-zA-Z0-9]+)/$',
        edit_menu, name="edit_menu"),
    re_path(r'^company/(?P<company_id>[-\w]+)/menu/delete/(?P<menu_id>[a-zA-Z0-9]+)/$',
        delete_menu, name="delete_menu"),
    re_path(r'^company/(?P<company_id>[-\w]+)/menu/status/(?P<menu_id>[a-zA-Z0-9]+)/$',
        menu_status, name="menu_status"),
    re_path(r'^company/(?P<company_id>[-\w]+)/menu/order/$',
        menu_order, name="menu_order"),

    # # Assessment re_paths
    re_path(r'^assessment/skills/', assessment_skills, name="assessment_skills"),
    re_path(r'^assessment/question/new/', new_question, name="new_question"),
    re_path(r'^assement/skill/questions/(?P<skill_id>[-\w]+)/$', skill_questions, name="skill_questions"),
    re_path(r'^assement/question/view/(?P<question_id>[-\w]+)/', view_question, name="view_question"),

    re_path(r'^save/meta-data/', save_meta_data, name="save_meta_data"),
    re_path(r'^redirect-data/', redirect_data, name="redirect_data"),
    re_path(r'^moving/duplicate/(?P<value>[-\w]+)/', moving_duplicates, name="move_duplicates"),
    re_path(r'^clear/cache/', clear_cache, name="clear_cache"),

    path('files/<str:file_path>/', file_display_view, name='file_display'),
]
