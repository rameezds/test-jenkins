FROM ubuntu:20.04

#RUN apt-get update && apt-get upgrade -y
RUN apt-get update


# server and ext installation
RUN  apt-get  install -y     nano   git  curl  zip unzip
RUN ln -snf /usr/share/zoneinfo/$CONTAINER_TIMEZONE /etc/localtime && echo $CONTAINER_TIMEZONE > /etc/timezone
RUN apt-get update && apt-get install -y tzdata
RUN apt-get install -y  nginx
RUN apt-get update

#nginx files configurations
RUN mkdir -p /var/www/html/
COPY ./   /var/www/html
WORKDIR /var/www/html
COPY nginx/domain  /etc/nginx/sites-available/
RUN rm -f /etc/nginx/sites-enabled/*
RUN ln -s /etc/nginx/sites-available/domain /etc/nginx/sites-enabled/
RUN  rm -rf /etc/localtime
EXPOSE 80


RUN apt-get install nodejs -y

RUN apt-get install npm -y
WORKDIR /var/www/html
RUN npm i
RUN npm run build

#RUN ["chmod", "+x", "/var/www/html/script.sh"]
#RUN bash script.sh

#nginx deamon off and start fpm
#CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
#CMD /etc/init.d/php8.0-fpm restart  && nginx -g "daemon off;"
ENTRYPOINT ["/bin/bash", "-c", " service nginx start && tail -f /dev/null"]

