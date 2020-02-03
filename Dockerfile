# BASE
FROM alpine

# COPY CURRENT FILES
COPY . /var/www/localhost/htdocs

# SETUP / RUN
RUN apk add nginx && \
    mkdir /run/nginx && \
    apk add nodejs && \
    apk add npm && \
    cd /var/www/localhost/htdocs && \
    npm install && \
    npm run build && \
    apk del nodejs && \
    apk del npm && \
    mv /var/www/localhost/htdocs/build /var/www/localhost && \
    cd /var/www/localhost/htdocs && \
    rm -rf * && \
    mv /var/www/localhost/build /var/www/localhost/htdocs;

# CONF
WORKDIR /var/www/localhost/htdocs

## CONFIGURATIONS
ADD docker/default.conf /etc/nginx/conf.d/default.conf

COPY $PWD/docker/entrypoint.sh /usr/local/bin

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]

# EXPOSE PORTS
EXPOSE 80

EXPOSE 443/tcp

# RUN COMMAND
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]