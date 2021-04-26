export COMPOSE_HTTP_TIMEOUT=200

.PHONY: up down reboot

reboot:	build up

build: down docker-clean-images docker-build

up:
	docker-compose up

down:
	docker-compose down --volumes

docker-clean-images:
	docker image prune --force --filter "until=24h"

docker-build:
	docker-compose pull

docker-clean-volumes:
	docker volume prune --force

docker-nuke:
	docker system prune --force --all
