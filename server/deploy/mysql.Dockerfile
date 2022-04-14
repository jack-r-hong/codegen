FROM mysql:latest

COPY ./deploy/create_backend_mysql_user.sh /docker-entrypoint-initdb.d