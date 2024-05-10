up:
	docker-compose up -d --build

stop:
	docker stop pulsopus

prune:
	docker system prune \
	&& docker system prune -a

end:
	make stop \
	&& make prune \

restart:
	make end \
	&& make up

dev:
	yarn run dev

prod:
	yarn vite
