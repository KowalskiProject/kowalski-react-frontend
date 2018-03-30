FROM nginx:1.13

RUN mkdir /var/www/
COPY ./build/* /var/www/
COPY ./app/.nginx.conf /etc/nginx/conf.d/saturno.conf
RUN rm /etc/nginx/conf.d/default.conf