#!/bin/bash
 
CODEGEN_LANG=typescript_express
CODEGEN_OUTPUT=/server



if [ "$1" = "new_lang" ]
then
    java -jar /swagger-codegen-cli.jar meta -o /codegen/gen -n $CODEGEN_LANG -p "custom.$CODEGEN_LANG"
else
    cd /codegen/gen
    mvn clean package 

    java -cp  "/codegen/gen/target/$CODEGEN_LANG-swagger-codegen-1.0.0.jar:/swagger-codegen-cli.jar" \
    io.swagger.codegen.v3.cli.SwaggerCodegen generate -l $CODEGEN_LANG\
    -i http://petstore.swagger.io/v2/swagger.json \
    -o "$CODEGEN_OUTPUT"
fi
