py -m venv venv
. venv\Scripts\activate
pip install -r requirements.txt

comment out all under BlogAttachment 
commet out from django_blog_it.django_blog_it.models import Post
py manage.py makemigrations 
py manage.py migrate 

uncommet  from django_blog_it.django_blog_it.models import Post 

python manage.py makemigrations django_blog_it
python manage.py migrate django_blog_it

uncomment all under BlogAttachment 
py manage.py makemigrations 
py manage.py migrate 

py manage.py createsuperuser
py manage.py runserver  
