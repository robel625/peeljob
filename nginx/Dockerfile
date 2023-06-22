FROM nginx:latest
RUN apt-get update && apt-get install -y procps
RUN mkdir -p /home/app/staticfiles
RUN chmod 755 /home/app/staticfiles

COPY ./staticfiles /home/app/staticfiles