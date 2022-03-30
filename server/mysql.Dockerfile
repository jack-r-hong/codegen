FROM mysql:latest

COPY ./create_backend_mysql_user.sh /docker-entrypoint-initdb.d