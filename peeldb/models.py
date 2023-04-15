from decimal import Decimal
import json
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
# from django.contrib.postgres.fields import ArrayField, JSONField
from django.db.models import JSONField
from datetime import datetime
import hashlib
from django.db.models import Q, Count, F
from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin, UserManager)
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
import re
# from microurl import google_mini

COMPANY_SIZE = (
    ('1-10', '1-10'),
    ('11-20', '11-20'),
    ('21-50', '21-50'),
    ('50-200', '50-200'),
    ('200+', '200+'),
)

STATUS = (
    ('Active', 'Active'),
    ('InActive', 'InActive'),
)

current_date = datetime.strptime(
    str(datetime.now().date()), "%Y-%m-%d").strftime("%Y-%m-%d")


class Industry(models.Model):
    name = models.CharField(max_length=500)
    status = models.CharField(choices=STATUS, max_length=10)
    slug = models.SlugField(max_length=500)
    meta_title = models.TextField(default='')
    meta_description = models.TextField(default='')
    page_content = models.TextField(default='')

    def get_job_url(self):
        job_url = '/' + str(self.slug) + '-industry-jobs/'
        return job_url

    # def get_no_of_jobposts(self):
    #     return JobPost.objects.filter(industry__in=[self], status='Live')

    # def get_no_of_all_jobposts(self):
    #     return JobPost.objects.filter(industry__in=[self])

class Keyword(models.Model):
    name = models.CharField(max_length=1000)


# INDUSTRY_TYPE =
# Accessories / Apparel / Fashion Design
# Accounting / Auditing / Tax
# Administration / Secretary / Front Office
# Advertising / Event Management / PR
# Agriculture / Dairy Technology
# Airlines / Hotel / Hospitality / Travel / Tourism / Restaurants
# Animation / Gaming
# Architecture / Interior Designing
# Art / Design / Creative / Fashion
# Auto Ancillary / Automobiles / Components
# Banking / Financial Services / Stockbroking / Securities
# Biotechnology / Pharmaceutical / Clinical Research
# Brewery / Distillery
# Cement / Construction / Engineering / Metals / Steel / Iron
# Ceramics / Sanitaryware
# Chemicals / Petro Chemicals / Plastics
# Computer Hardware / Networking
# Consulting / Strategy / Corporate Planning
# Consumer FMCG / Foods / Beverages
# Consumer Goods - Durables
# Content / Edition / Journalism
# Courier / Freight / Transportation / Warehousing
# Customer Service / Call Centre / Operations / Data Entry
# CRM / IT Enabled Services / BPO
# Education / Training / Teaching
# Electricals / Switchgears
# Employment Firms / Recruitment Services Firms / HR
# Engineering / R&D
# Entertainment / Media / Publishing / Dotcom
# Export Houses / Textiles / Merchandise
# FacilityManagement
# Fertilizers / Pesticides
# FoodProcessing
# Gems and Jewellery
# Glass
# Government / Defence
# Healthcare / Medical / Pharmacy
# HeatVentilation / AirConditioning
# Hotel / Restaurant / Catering
# Insurance
# Internet Technologies / Web / E-Commerce
# Import-Export / Merchandising / Trading
# IT - Databases / Datawarehousing
# IT - ERP / CRM
# IT - Systems / Networking / Security
# KPO / Research / Analytics
# Law / Legal Firms
# Logistics / Purchase / Supply Chain / Procurement
# Machinery / Equipment Manufacturing / Industrial Products
# Social Services / NGOs / Nonprofit
# Packaging / Printing
# Media / TV / Films / Production
# Mining
# Office Automation
# Others / Engg. Services / Service Providers
# Petroleum / Oil and Gas / Projects / Infrastructure / Power / Non-conventional Energy
# Printing / Packaging
# Publishing
# Quality / Testing / Process Control
# Real Estate / Property
# Retailing
# Security Services / Law Enforcement / Guards
# Shipping / Marine
# Software Services
# Steel
# Telecom Equipment / Electronics / Electronic Devices / RF / Semi-conductor
# Telecom / Mobile Network / ISP
# Travel / Reservation / Airlines
# Tyres
# WaterTreatment / WasteManagement
# Wellness / Fitness / Sports


USER_TYPE = (
    ('JS', 'Job Seeker'),
    ('RR', 'Recruiter'),
    ('RA', 'Recruiter Admin'),
    ('AA', 'Agency Admin'),
    ('AR', 'Agency Recruiter'),
)

GENDER_TYPES = (
    ('F', 'Female'),
    ('M', 'Male'),
)

STATUS_TYPES = (
    ('Enabled', 'Enabled'),
    ('Disabled', 'Disabled'),
)

DEGREE_TYPES = (
    ('Permanent', 'Permanent'),
    ('PartTime', 'PartTime'),
)

COMPANY_TYPES = (
    ('Consultant', 'consultant'),
    ('Company', 'company'),
)


def img_url(self, filename):
    hash_ = hashlib.md5()
    hash_.update(
        str(filename).encode('utf-8') + str(datetime.now()).encode('utf-8'))
    file_hash = hash_.hexdigest()

    if self.__class__.__name__ == "Company":
        # parsed_target_url = urlparse(self.website)
        # domain = str(parsed_target_url.netloc).split('.')[0]
        filename = self.slug + '.' + str(filename.split('.')[-1])
    else:
        filename = filename
    return "%s%s/%s" % (self.file_prepend, file_hash, filename)

class Qualification(models.Model):
    name = models.CharField(max_length=500)
    status = models.CharField(choices=STATUS, max_length=10)
    slug = models.SlugField(max_length=500)

    def __str__(self):
        return self.name

    # def get_no_of_jobposts(self):
    #     return JobPost.objects.filter(edu_qualification__in=[self])


class Country(models.Model):
    name = models.CharField(max_length=500)
    status = models.CharField(choices=STATUS_TYPES, max_length=10, default='Enabled')
    slug = models.SlugField(max_length=500, default='')

    def __str__(self):
        return self.name

    # def get_no_of_jobposts(self):
    #     return JobPost.objects.filter(location__state__country=self, status='Live')


class State(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    status = models.CharField(
        choices=STATUS_TYPES, max_length=10, default='Enabled')
    slug = models.SlugField(max_length=500, default='')

    def __str__(self):
        return self.name

    # def get_no_of_jobposts(self):
    #     return JobPost.objects.filter(location__in=City.objects.filter(state=self), status='Live')

    def get_state_cities(self):
        cities = self.state.annotate(
            num_posts=Count('locations')
        ).filter(status='Enabled').exclude(name=F('state__name')).order_by('-num_posts')
        return cities[:5]


SKILL_TYPE = (
    ('it', 'IT'),
    ('non-it', 'Non-IT'),
    ('other', 'Other')
)

class Skill(models.Model):
    name = models.CharField(max_length=500)
    status = models.CharField(choices=STATUS, max_length=10)
    icon = models.CharField(max_length=1000)
    slug = models.SlugField(max_length=500)
    meta_title = models.TextField(default='')
    meta_description = models.TextField(default='')
    page_content = models.TextField(default='')
    meta = JSONField(default={})
    skill_type = models.CharField(
        choices=SKILL_TYPE, max_length=20, default='it')

    def __str__(self):
        return self.name

    def get_job_url(self):
        job_url = '/' + str(self.slug) + '-jobs/'
        return job_url

    # def get_no_of_jobposts(self):
    #     return JobPost.objects.filter(skills__in=[self], status='Live')

    # def get_no_of_jobposts_all(self):
    #     return JobPost.objects.filter(skills__in=[self])

    # def get_no_of_subscriptions(self):
    #     return Subscriber.objects.filter(skill=self)

    # def get_no_of_applicants(self):
    #     return User.objects.filter(skills__skill=self)

    # def get_no_of_resume_applicants(self):
    #     return AgencyResume.objects.filter(skill=self)

    def get_meta_data(self):
        if self.meta:
            return json.dumps(self.meta)
        else:
            return ''


class FunctionalArea(models.Model):
    name = models.CharField(max_length=500, unique=True)
    status = models.CharField(choices=STATUS, max_length=10)
    slug = models.SlugField(max_length=500)

    def __str__(self):
        return self.name

    # def get_no_of_jobposts(self):
    #     return JobPost.objects.filter(functional_area__in=[self])


class Language(models.Model):
    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class UserLanguage(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    write = models.BooleanField(default=False)
    speak = models.BooleanField(default=False)


class City(models.Model):
    name = models.CharField(max_length=500)
    state = models.ForeignKey(State, related_name='state', on_delete=models.CASCADE)
    status = models.CharField(
        choices=STATUS_TYPES, max_length=10, default='Enabled')
    slug = models.SlugField(max_length=500)
    internship_text = models.CharField(max_length=1000)
    meta_title = models.TextField(default='')
    meta_description = models.TextField(default='')
    internship_meta_title = models.TextField(default='')
    internship_meta_description = models.TextField(default='')
    page_content = models.TextField(default='')
    internship_content = models.TextField(default='')
    meta = JSONField(default={})
    parent_city = models.ForeignKey('self', related_name='child_cities', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def get_job_url(self):
        job_url = '/jobs-in-' + str(self.slug) + '/'
        return job_url

    # def get_no_of_jobposts(self):
    #     return JobPost.objects.filter(location__in=[self], status='Live')

    # def get_no_of_all_jobposts(self):
    #     return JobPost.objects.filter(location__in=[self])

    def get_meta_data(self):
        if self.meta:
            return json.dumps(self.meta)
        else:
            return ''


class Company(models.Model):
    file_prepend = "company/logo/"
    name = models.CharField(max_length=5000)
    website = models.CharField(max_length=5000, null=True, blank=True)
    address = models.TextField()
    profile_pic = models.FileField(
        max_length=1000, upload_to=img_url, null=True, blank=True)
    size = models.CharField(choices=COMPANY_SIZE, max_length=10, default='')
    level = models.IntegerField(null=True, blank=True)
    company_type = models.CharField(
        choices=COMPANY_TYPES, max_length=50, default='')
    profile = models.TextField()
    phone_number = models.CharField(max_length=15)
    registered_date = models.DateField(auto_now_add=True)
    email = models.EmailField(max_length=255, null=True)
    short_code = models.CharField(max_length=50, null=True)
    is_active = models.BooleanField(default=False)
    slug = models.SlugField(max_length=5000)
    meta_title = models.TextField(default='')
    meta_description = models.TextField(default='')
    campaign_icon = models.CharField(max_length=3000, null=True)
    created_from = models.CharField(max_length=200, default='')

    def is_company(self):
        if str(self.company_type) == 'Company':
            return True
        return False

    def is_agency(self):
        if str(self.company_type) == 'Consultant':
            return True
        return False

    # def get_company_admin(self):
    #     return User.objects.filter(is_admin=True, company=self).first()

    # def get_company_recruiters(self):
    #     return User.objects.filter(company=self)

    # def get_company_jobposts(self):
    #     return JobPost.objects.filter(user__company=self)

    # def get_jobposts(self):
    #     return JobPost.objects.filter(company=self, status='Live')

    # def get_total_jobposts(self):
    #     return JobPost.objects.filter(company=self)

    # def get_company_tickets(self):
    #     return Ticket.objects.filter(user__company=self)

    # def get_company_menu(self):
    #     return Menu.objects.filter(company=self)

    # def get_active_company_menu(self):
    #     return Menu.objects.filter(company=self, status=True).order_by('id')

    # def get_live_jobposts(self):
    #     return JobPost.objects.filter(user__company=self, status='Live')

    # def get_unique_recruiters(self):
    #     job_posts = list(set(list(JobPost.objects.filter(
    #         company=self, status='Live').values_list('user', flat=True))))
    #     users = User.objects.filter(id__in=job_posts)
    #     return users

    def get_absolute_url(self):
        return '/' + str(self.slug) + '-job-openings/'

    def get_logo_url(self):
        if self.profile_pic:
            return str(self.profile_pic)
        return 'https://cdn.peeljobs.com/static/company_logo.png'

    def get_description(self):
        from bs4 import BeautifulSoup
        html = self.profile
        # create a new bs4 object from the html data loaded
        soup = BeautifulSoup(html)
        # remove all javascript and stylesheet code
        for script in soup(["script", "style"]):
            script.extract()
        # get text
        text = soup.get_text()
        # break into lines and remove leading and trailing space on each
        lines = (line.strip() for line in text.splitlines())
        # break multi-headlines into a line each
        chunks = (phrase.strip()
                  for line in lines for phrase in line.split("  "))
        # drop blank lines
        text = '\n<br>'.join(chunk for chunk in chunks if chunk)
        return text

    def get_website(self):
        site = self.website
        if site is not None and '//' in site:
            site = site.split("//")[1]
        return site

    def get_logo_url(self):
        if self.profile_pic:
            return str(self.profile_pic)
        return 'https://cdn.peeljobs.com/static/company_logo.png'


class EducationInstitue(models.Model):
    name = models.CharField(max_length=500)
    address = models.CharField(max_length=2000, default='')
    city = models.ForeignKey(City, on_delete=models.CASCADE)


class EmploymentHistory(models.Model):
    company = models.CharField(max_length=500)
    from_date = models.DateField(null=True)
    to_date = models.DateField(null=True, blank=True)
    # TODO: this need to be be sorted as standard designation at some point in future
    designation = models.CharField(max_length=500)
    salary = models.CharField(max_length=100)
    current_job = models.BooleanField(default=False)
    job_profile = models.TextField()


class Degree(models.Model):
    degree_name = models.ForeignKey(Qualification, on_delete=models.CASCADE)
    degree_type = models.CharField(choices=DEGREE_TYPES, max_length=50)
    specialization = models.CharField(max_length=500)


class EducationDetails(models.Model):
    institute = models.ForeignKey(EducationInstitue, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField(null=True, blank=True)
    degree = models.ForeignKey(Degree, on_delete=models.CASCADE)
    score = models.CharField(max_length=50)
    current_education = models.BooleanField(default=False)



class Project(models.Model):
    name = models.CharField(max_length=500)
    from_date = models.DateField(null=True, blank=True)
    to_date = models.DateField(null=True, blank=True)
    skills = models.ManyToManyField(Skill)
    description = models.TextField(max_length=2000, default='')
    location = models.ForeignKey(City, null=True, blank=True, on_delete=models.CASCADE)
    role = models.CharField(max_length=500, null=True, blank=True)
    size = models.IntegerField(null=True, blank=True)


TechnicalSkill_STATUS = (
    ('Poor', 'Poor'),
    ('Average', 'Average'),
    ('Good', 'Good'),
    ('Expert', 'Expert'),
)


class TechnicalSkill(models.Model):
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    year = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    last_used = models.DateField(null=True, blank=True)
    version = models.CharField(max_length=100, null=True, blank=True)
    proficiency = models.CharField(
        choices=TechnicalSkill_STATUS, max_length=100, null=True, blank=True)
    is_major = models.BooleanField(default=False)


MARTIAL_STATUS = (
    ('Single', 'Single'),
    ('Married', 'Married'),
)

REGISTERED_FROM = (
    ('Email', 'Email'),
    ('Social', 'Social'),
    ('ResumePool', 'ResumePool'),
    ('Resume', 'Resume'),
    ('Careers', 'Careers'),
)

class User(AbstractBaseUser, PermissionsMixin):
    file_prepend = "user/img/"
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_staff = models.BooleanField(_('staff status'), default=False)
    company = models.ForeignKey(Company, blank=True, null=True, on_delete=models.CASCADE)
    profile_pic = models.FileField(
        max_length=1000, upload_to=img_url, null=True, blank=True)
    user_type = models.CharField(choices=USER_TYPE, max_length=10, default='')
    signature = models.CharField(max_length=2000, default='')
    is_active = models.BooleanField(default=False)
    gender = models.CharField(
        choices=GENDER_TYPES, max_length=10, blank=True, null=True)
    address = models.TextField(max_length=1000, blank=True, null=True)
    permanent_address = models.TextField(
        max_length=1000, blank=True, null=True)
    nationality = models.TextField(max_length=50, blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    alternate_mobile = models.BigIntegerField(blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    email_verified = models.BooleanField(default=False)
    city = models.ForeignKey(
        City, null=True, blank=True, related_name='user_city', on_delete=models.CASCADE)
    state = models.ForeignKey(State, null=True, blank=True, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, null=True, blank=True, on_delete=models.CASCADE)
    pincode = models.IntegerField(null=True, blank=True)
    last_password_reset_on = models.DateTimeField(auto_now=True, null=True)
    photo = models.CharField(max_length=500, blank=True, null=True)
    # TODO: this needs to be choice field
    marital_status = models.CharField(
        choices=MARTIAL_STATUS, max_length=50, blank=True, null=True)
    employment_history = models.ManyToManyField(EmploymentHistory)
    current_city = models.ForeignKey(
        City, blank=True, null=True, related_name='current_city', on_delete=models.CASCADE)
    preferred_city = models.ManyToManyField(
        City, related_name='preferred_city')
    functional_area = models.ManyToManyField(FunctionalArea)
    job_role = models.CharField(max_length=500, default='')
    education = models.ManyToManyField(EducationDetails)
    project = models.ManyToManyField(Project)
    skills = models.ManyToManyField(TechnicalSkill)
    language = models.ManyToManyField(UserLanguage)
    current_salary = models.CharField(max_length=50, blank=True, null=True)
    expected_salary = models.CharField(max_length=500, blank=True, null=True)
    prefered_industry = models.ForeignKey(Industry, blank=True, null=True, on_delete=models.CASCADE)
    industry = models.ManyToManyField(
        Industry, related_name='recruiter_industries')
    technical_skills = models.ManyToManyField(
        Skill, related_name='recruiter_skill')
    dob = models.DateField(blank=True, null=True)
    profile_description = models.CharField(max_length=2000, default='')
    # this must be s3 file key
    resume = models.CharField(max_length=2000, default='')
    relocation = models.BooleanField(default=False)
    notice_period = models.CharField(max_length=50, blank=True, null=True)
    year = models.CharField(max_length=50, blank=True, null=True)
    month = models.CharField(max_length=50, default='')
    show_email = models.BooleanField(default=False)
    resume_title = models.TextField(max_length=2000, blank=True, null=True)
    resume_text = models.TextField(blank=True, null=True)
    mobile_verification_code = models.CharField(max_length=50, default='')
    last_mobile_code_verified_on = models.DateTimeField(auto_now=True, null=True)
    mobile_verified = models.BooleanField(default=False)
    is_login = models.BooleanField(default=False)
    email_notifications = models.BooleanField(default=True)
    profile_updated = models.DateTimeField(auto_now=True, null=True)
    is_admin = models.BooleanField(default=False)  # agency created user
    profile_completeness = models.CharField(max_length=500, default='')
    activation_code = models.CharField(max_length=100, null=True, blank=True)
    is_register_through_mail = models.BooleanField(default=False)
    registered_from = models.CharField(choices=REGISTERED_FROM, max_length=15, default='')
    is_unsubscribe = models.BooleanField(default=False)
    is_bounce = models.BooleanField(default=False)
    unsubscribe_code = models.CharField(max_length=100, null=True, blank=True)
    # Other admins in agency other than agency created user
    agency_admin = models.BooleanField(default=False)
    referer = models.TextField(null=True, blank=True)
    unsubscribe_reason = models.TextField(default='')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def has_perm(self, perm, obj=None):
        if self.is_active and self.is_staff:
            return True
        # return _user_has_perm(self, perm, obj)
        else:
            try:
                user_perm = self.user_permissions.get(codename=perm)
            except ObjectDoesNotExist:
                user_perm = False
            if user_perm:
                return True
            else:
                return False

    class Meta:
        permissions = (
            ('blog_view', 'can view blog posts and categories'),
            ('blog_edit', 'can edit blog category and post'),
            ("support_view", "can view tickets"),
            ("support_edit", "can edit tickets"),
            ("activity_view",
             "can view recruiters, applicants, data, posts"),
            ("activity_edit", "can edit data"),
            ("jobposts_edit", "can manage jobposts"),
            ("jobposts_invoice_access", "can manage invoice"),
            ("jobposts_resume_profiles", "can manage resume profiles"),
        )


