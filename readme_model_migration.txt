py -m venv venv
. venv\Scripts\activate
From within VS Code, you can create local environments, using virtual environments or Anaconda, by opening the Command Palette (Ctrl+Shift+P)
pip install -r requirements.txt

comment out all under BlogAttachment  class
commet out from django_blog_it.django_blog_it.models import Post
py manage.py makemigrations 
py manage.py migrate 

uncommet  from django_blog_it.django_blog_it.models import Post 

python manage.py makemigrations django_blog_it
python manage.py migrate django_blog_it

python manage.py migrate sites

uncomment all under BlogAttachment 
py manage.py makemigrations 
py manage.py migrate 

py manage.py createsuperuser
py manage.py load_initial_data
python manage.py compress
py manage.py runserver  


curl -X GET "localhost:9200/_cluster/health?pretty"   in cmd   to see elastic search is working
python manage.py rebuild_index

if admin login can't open, change in user class is_active to default=True, is_active = models.BooleanField(default=True)



in postgres table  add slug , with thi query  
UPDATE public.peeldb_skill SET slug = REPLACE(name, ' ', '_');
















Here are the fields for the `Post` model in the `django_blog_it` app:

- `title`: CharField
- `slug`: SlugField
- `content`: MarkdownxField
- `description`: TextField
- `author`: ForeignKey to User model
- `featured_image`: ImageField
- `created_date`: DateTimeField (auto_now_add=True)
- `updated_date`: DateTimeField (auto_now=True)
- `published_date`: DateTimeField (null=True, blank=True)
- `status`: CharField with choices=('published', 'draft', 'deleted')
- `allow_comments`: BooleanField (default=True)
- `view_count`: PositiveIntegerField (default=0)
- `tag`: ManyToManyField to Tag model
- `category`: ForeignKey to Category model




