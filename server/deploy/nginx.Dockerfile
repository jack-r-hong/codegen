FROM nginx

RUN apt-get update -y
RUN apt-get install -y certbot 
RUN apt-get install -y python3-certbot-nginx
RUN certbot --nginx -d localhost

RUN openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

# COPY app/build/web /usr/share/nginx/html