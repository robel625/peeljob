#!/bin/sh

   # Collect static files
   python manage.py collectstatic --noinput


   python manage.py compress

    # Start the server
   gunicorn jobsp.wsgi:application --bind 0.0.0.0:8000
   

