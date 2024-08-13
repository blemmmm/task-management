#!/bin/bash

rm -f ./.env

rm -f ./server/.env

echo "--> Creating .env file."

echo "NODE_ENV=production" >> .env

echo "POSTGRES_HOST=postgres" >> .env
echo "POSTGRES_DB=postgres" >> .env
echo "POSTGRES_USER=postgres" >> .env
echo "POSTGRES_PASSWORD=postgres" >> .env

cat ./.env

ln ./.env ./server/.env

sudo rm -rf ./caddy/config/
sudo rm -rf ./caddy/data/
sudo rm -rf ./caddy/logs/

sudo rm -rf ./postgres/data/