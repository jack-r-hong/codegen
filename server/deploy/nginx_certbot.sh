#!/bin/bash

apt-get update -y
apt-get install -y certbot 
apt-get install -y python3-certbot-nginx
certbot --nginx -d $EXTERNAL_HOSTNAME
systemctl status certbot.timer
certbot renew --dry-run