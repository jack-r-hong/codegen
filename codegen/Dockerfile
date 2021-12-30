FROM openjdk:8-jdk-alpine

RUN set -x \
 && apk update && apk upgrade \
 && apk add wget \
 && apk add --no-cache bash ca-certificates maven \
 && wget https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.29/swagger-codegen-cli-3.0.29.jar -O swagger-codegen-cli.jar

VOLUME  /root/.m2/repository

