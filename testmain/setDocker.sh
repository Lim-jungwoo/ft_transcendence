#!/bin/bash
docker stop $(docker ps -qa)
docker rm $(docker ps -qa)
docker rmi $(docker images -qa)
docker network rm storage_transce
docker volume rm $(docker volume ls -q)

