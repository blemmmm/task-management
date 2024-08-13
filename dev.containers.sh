#!/bin/bash

sudo bash ./dev.env.sh
sudo docker kill $(sudo docker ps -q)
sudo docker system prune --force --volumes
sudo docker compose up postgres --force-recreate --build