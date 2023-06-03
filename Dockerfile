FROM ubuntu:latest

WORKDIR /usr/src/app
RUN apt-get update && apt-get upgrade -y && apt-get autoremove -y
RUN  apt-get install -y apt-utils
RUN  apt-get install -y curl   
RUN  apt-get install -y wget
RUN  apt-get install -y libpq-dev
RUN  apt-get install -y python3-dev 
RUN apt-get update && apt-get upgrade -y
RUN  apt-get install -y gem   
RUN  apt-get install -y ruby
RUN  apt-get install -y ruby-dev
RUN  apt-get install -y build-essential 
RUN apt-get update && apt-get upgrade -y
RUN  apt-get install -y libssl-dev  python3-pip 
RUN apt-get update && apt-get upgrade -y
RUN  gem install sass
RUN  apt-get install -y libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev libharfbuzz-dev libfribidi-dev tcl8.6-dev tk8.6-dev python-tk
RUN  pip3 install --upgrade pip
RUN  apt-get install -y npm
RUN  npm install -g less
# RUN  ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get update && apt-get upgrade -y
RUN  apt-get install -y libffi-dev 
RUN  apt-get install -y python2-dev
RUN  apt-get install -y zsh









RUN export PATH=$PATH:/usr/local/bin/

ENV PATH="/usr/src/app:${PATH}"






COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip3 install -r requirements.txt

RUN  apt-get install -y  python3.11
RUN apt-get update && apt-get upgrade -y





# pip3 install -r /home/peeljobs/requirements.txt
