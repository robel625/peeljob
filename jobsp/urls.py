"""
URL configuration for jobsp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from pjob.views import (year_calendar, calendar_add_event,calendar_event_list, month_calendar,jobposts_by_date, week_calendar,)
from pjob.views import (skill_location_wise_fresher_jobs, skill_fresher_jobs,
                        skill_location_walkin_jobs, register_using_email, login_user_email,
                        forgot_password, user_activation, user_reg_success,
                        recruiter_profile, jobs_by_location, jobs_by_skill, jobs_by_degree,
                        jobs_by_industry, full_time_jobs, walkin_jobs,
                        city_internship_jobs, internship_jobs, government_jobs,
                        each_company_jobs, job_industries, companies,
                         job_locations, set_password,
                        job_skills, job_detail,  recruiters,
                        user_subscribe, unsubscribe, fresher_jobs_by_skills, process_email, location_fresher_jobs)
from search.views import (skill_auto_search, city_auto_search, custome_search, custom_walkins, search_slugs)
from candidate.views import (applicant_unsubscribe, bounces, assessment_changes,
                             applicant_unsubscribing, applicant_email_unsubscribing,
                             question_view, assessments_questions, alert_subscribe_verification)
from psite.views import (contact, sitemap, get_out, pages,
                         custom_500, sitemap_xml, users_login, custom_404)
from pjob.views import index as job_list
from django.conf import settings
from django.conf.urls.static import static
# from django.shortcuts import render
# from django.conf.urls import include, url
from recruiter.views import index
from psite.views import ( get_out )
# from psite.views import (contact, sitemap, get_out, pages,
#                          custom_500, sitemap_xml, users_login, custom_404, auth_return)
from django_blog_it import urls as django_blog_it_urls


urlpatterns = [

    path("admin/", admin.site.urls),
    # re_path(r'^admin/', admin.site.urls),
    # path(r'', include('django_blog_it.urls')),

    re_path(r'^(?P<job_title_slug>[a-z0-9-.,*?]+)-(?P<job_id>([0-9])+)/$', job_detail, name="job_detail"),
    re_path(r'^(?P<skill_name>[-\w]+)-fresher-jobs-in-(?P<city_name>[-\w]+)/$',
        skill_location_wise_fresher_jobs, name="skill_location_wise_fresher_jobs"),
    re_path(r'^(?P<skill_name>[-\w]+)-fresher-jobs-in-(?P<city_name>[-\w]+)/(?P<page_num>[0-9]+)/$',
        skill_location_wise_fresher_jobs),

    re_path(r'^internship-jobs-in-(?P<location>[-\w]+)/$', city_internship_jobs, name="city_internship_jobs"),
    re_path(r'^internship-jobs-in-(?P<location>[-\w]+)/(?P<page_num>[0-9]+)/$', city_internship_jobs),

    re_path(r'^fresher-jobs-in-(?P<city_name>[-\w]+)/$', location_fresher_jobs, name="location_fresher_jobs"),
    re_path(r'^fresher-jobs-in-(?P<city_name>[-\w]+)/(?P<page_num>[0-9]+)/$', location_fresher_jobs, name="location_fresher_jobs"),

    re_path(r'^(?P<skill_name>[-\w]+)-jobs-in-(?P<city_name>[-\w]+)/$', custome_search, name="custome_search"),
    re_path(r'^(?P<skill_name>[-\w]+)-jobs-in-(?P<city_name>[-\w]+)/(?P<page_num>[0-9]+)/$', custome_search),
    re_path(r'^(?P<skill_name>[-\w]+)-walkins-in-(?P<city_name>[-\w]+)/$', custom_walkins, name="custom_walkins"),
    re_path(r'^(?P<skill_name>[-\w]+)-walkins-in-(?P<city_name>[-\w]+)/(?P<page_num>[0-9]+)/$', custom_walkins),
    re_path(r'^(?P<skill_name>[-\w]+)-fresher-jobs/$', skill_fresher_jobs, name="skill_fresher_jobs"),
    re_path(r'^(?P<skill_name>[-\w]+)-fresher-jobs/(?P<page_num>[0-9]+)/$', skill_fresher_jobs),
    re_path(r'^(?P<skill_name>[-\w]+)-walkins/(?P<page_num>[0-9]+)/$', skill_location_walkin_jobs),
    re_path(r'^(?P<skill_name>[-\w]+)-walkins/$', skill_location_walkin_jobs, name="skill_walkin_jobs"),
    re_path(r'^walkins-in-(?P<skill_name>[-\w]+)/(?P<page_num>[0-9]+)/$', skill_location_walkin_jobs),
    re_path(r'^walkins-in-(?P<skill_name>[-\w]+)/$', skill_location_walkin_jobs, name="location_walkin_jobs"),
    re_path(r'^skill-auto/$', skill_auto_search),
    re_path(r'^city-auto/$', city_auto_search),
    re_path(r'^get/search-slugs/$', search_slugs, name="get_search_slugs"),
    # re_path(r'^admin/', include(admin.site.urls)),  # Here's the typo

    re_path(r'^search/', include('search.urls', namespace="search")),

    re_path(r'^applicant-unsubscribe/(?P<email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$',
        applicant_unsubscribe, name="applicant_unsubscribe"), 
    re_path(r'^skill-auto/$', skill_auto_search),

    re_path(r'^unsubscribe_email/(?P<email_type>([a-z0-9-])+)/(?P<message_id>[a-zA-Z0-9_-]+.*?)/$',
        applicant_email_unsubscribing, name="applicant_email_unsubscribing"),
    re_path(r'^email-unsubscribe/(?P<message_id>[a-zA-Z0-9_-]+.*?)/$',
        applicant_unsubscribing, name="applicant_unsubscribing"),

    re_path(r'^blog/', include(django_blog_it_urls)),
    # re_path(r'^social/', include('social.urls', namespace="social")),

    re_path(r'^dashboard/', include('dashboard.urls', namespace="dashboard")),
    re_path(r'^recruiter/', include('recruiter.urls', namespace="recruiter")),
    re_path(r'^agency/', include('agency.urls', namespace="agency")),

    re_path(r'^tellme/', include("tellme.urls")),

    re_path(r'^post-job/$', index, name='post_job'),
    re_path(r'^bounces/$', bounces),
    re_path(r'registration/using_email/$',
        register_using_email, name="register_email"),
    re_path(r'applicant/login/$', login_user_email, name="login_user"),
    re_path(r'user/forgot_password/$', forgot_password, name="forgot_password"),
    re_path(r'^user/set_password/(?P<user_id>[0-9]+)/(?P<passwd>[a-zA-Z0-9]+)/$', set_password, name="set_password"),
    re_path(r'^user/activation/(?P<user_id>[a-zA-Z0-9]+)/$',
        user_activation, name="user_activation"),
    re_path(r'^user/reg_success/$', user_reg_success, name="user_reg_success"),
    re_path(r'^social/user/update/$', user_reg_success, name="social_user"),

    re_path(r'^recruiters/page/(?P<page_num>[0-9]+)/$', recruiters),
    re_path(r'^recruiters/(?P<recruiter_name>[a-zA-Z0-9_-]+.*?)/(?P<page_num>[0-9]+)/$',
        recruiter_profile),
    re_path(r'^recruiters/(?P<recruiter_name>[a-zA-Z0-9_-]+.*?)/$',
        recruiter_profile, name="recruiter_profile"),

    re_path(r'^(?P<job_type>[-\w]+)-jobs-by-skills/$', fresher_jobs_by_skills, name="fresher_jobs_by_skills"),
    re_path(r'^(?P<job_type>[-\w]+)-by-location/$', jobs_by_location, name="jobs_by_location"),
    re_path(r'^jobs-by-skill/$', jobs_by_skill, name="jobs_by_skill"),
    re_path(r'^jobs-by-industry/$', jobs_by_industry, name="jobs_by_industry"),
    re_path(r'^jobs-by-degree/$', jobs_by_degree, name="jobs_by_degree"),
    re_path(r'^full-time-jobs/$', full_time_jobs, name="full_time_jobs"),
    re_path(r'^full-time-jobs/(?P<page_num>[0-9]+)/$', full_time_jobs),
    re_path(r'^walkin-jobs/$', walkin_jobs, name="walkin_jobs"),
    re_path(r'^walkin-jobs/(?P<page_num>[0-9]+)/$', walkin_jobs),

    re_path(r'^internship-jobs/$', internship_jobs, name="internship_jobs"),
    re_path(r'^internship-jobs/(?P<page_num>[0-9]+)/$', internship_jobs),

    re_path(r'^government-jobs/$', government_jobs, name="government_jobs"),
    re_path(r'^government-jobs/(?P<page_num>[0-9]+)/$', government_jobs),

    re_path(r'^assessment/question/view/(?P<que_id>[0-9]+)/$', question_view, name="question_view"),
    re_path(r'^assessment-questions/$', assessments_questions, name="assessments_questions"),
    re_path(r'^assessment-questions/(?P<page_num>[0-9]+)/$', assessments_questions),
    re_path(r'^assessment-changes/$', assessment_changes),

    re_path(r'^sitemap.xml$', sitemap_xml, name="sitemap_xml"),

    re_path(r'^login/$', users_login, name="users_login"),
    re_path(r'^contact/$', contact, name="contact"),
    re_path(
        r'^unsubscribe/(?P<email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$', unsubscribe, name="unsubscribe"),
    re_path(r'^sitemap/$', sitemap, name="sitemap"),

    re_path(r'^sitemap/(?P<page_num>[0-9]+)/$', sitemap, name="sitemap"),
    re_path(r'^logout/$', get_out, name="get_out"),

    re_path(r'^(?P<company_name>[-\w]+)-job-openings/$', each_company_jobs, name="company_jobs"),
    re_path(r'^(?P<company_name>[-\w]+)-job-openings/$', each_company_jobs, name="company_jobs"),

    re_path(r'^(?P<industry>[-\w]+)-industry-jobs/$', job_industries, name="job_industries"),
    re_path(r'^(?P<industry>[-\w]+)-industry-jobs/(?P<page_num>[0-9]+)/$', job_industries),
    re_path(r'^jobs-for-(?P<industry>[-\w]+)-industry/$', job_industries),
    re_path(r'^jobs-for-(?P<industry>[-\w]+)-industry/(?P<page_num>[0-9]+)/$', job_industries),

    re_path(r'^(?P<skill>[a-z0-9-.*?]+)-jobs/$', job_skills, name="job_skills"),
    re_path(r'^(?P<skill>[a-z0-9-.*?]+)-jobs/(?P<page_num>[0-9]+)/$', job_skills),

    re_path(r'^page/(?P<page_name>([a-z0-9-])+)/$', pages, name="pages"),


    re_path(r'^companies/(?P<page_num>[0-9]+)/$', companies),
    re_path(r'companies/$', companies, name='companies'),

    re_path(r'^', include('candidate.urls', namespace="my")),
    re_path(r'my/', include('candidate.urls', namespace="my")),
    re_path(r'jobposts/year/(?P<year>\w{0,})/month/(?P<month>\w{0,})/date/(?P<date>\w{0,})/$',
        jobposts_by_date, name="jobposts_by_date"),
    re_path(r'jobposts/year/(?P<year>\w{0,})/month/(?P<month>\w{0,})/date/(?P<date>\w{0,})/(?P<page_num>[0-9]+)/$',
        jobposts_by_date),


    re_path(r'calendar/(?P<year>\w{0,})/month/(?P<month>\w{0,})/week/(?P<week>\w{0,})/$',
        week_calendar, name="week_calendar"),

    re_path(r'tickets/', include('tickets.urls', namespace="tickets")),

    re_path(r'^jobs-in-(?P<location>[-\w]+)/$', job_locations, name="job_locations"),
    re_path(r'^jobs-in-(?P<location>[-\w]+)/(?P<page_num>[0-9]+)/$', job_locations),
    re_path(r'^jobs-for-(?P<skill>[-\w]+)/$', job_skills),


    re_path(r'calendar/(?P<year>\w{0,})/$', year_calendar, name="year_calendar"),
    re_path(r'calendar/add/event/$', calendar_add_event, name="calendar_add_event"),
    re_path(r'calendar/event/list/$', calendar_event_list, name="calendar_event_list"),
    re_path(r'calendar/(?P<year>\w{0,})/month/(?P<month>\w{0,})/$',
        month_calendar, name="month_calendar"),
    # re_path(r'^oauth2callback/$', auth_return, name='auth_return'),


    re_path(r'recruiters/$', recruiters, name="recruiters"),

    re_path(r'^jobs/$', job_list, name="job_list"),

    re_path(r'^jobs/', include('pjob.urls', namespace="jobs")),
    re_path(r'user_subscribe/$', user_subscribe, name="user_subscribe"),

    re_path(r'^(?P<obj_type>([a-z0-9-])+)/verification/(?P<obj_id>[a-zA-Z0-9_-]+.*?)/$',
        alert_subscribe_verification, name="alert_subscribe_verification"),
    re_path(r'^process-email/$', process_email, name="process_email")

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
