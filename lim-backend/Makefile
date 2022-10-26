SRCS = ./docker-compose.yml

all: up

up:
	docker-compose -f $(SRCS) up --build -d
down:
	docker-compose -f $(SRCS) down

ps:
	docker-compose -f $(SRCS) ps

top:
	docker-compose -f $(SRCS) top

clean:
	docker-compose -f $(SRCS) down --rmi all -v

fclean:
	docker-compose -f $(SRCS) down --rmi all -v

prune:	fclean
		docker system prune -f --all --volumes

re:	prune
	all

.PHONY:start stop all up down ps top clean fclean prune re