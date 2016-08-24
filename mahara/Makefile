DOCKER=docker
COMPOSE=docker-compose
IMAGE=jlabusch/mahara:16.04.3

.PHONY: all build run clean

all: build run

build:
	$(COMPOSE) build
	$(DOCKER) save $(IMAGE) | bzip2 > mahara_16-04-3.tbz2

run:
	$(DOCKER) images | grep -q $(IMAGE) || make build
	$(COMPOSE) up -d
	$(COMPOSE) logs -f || :

clean:
	$(DOCKER) rmi $(IMAGE) || :
	$(DOCKER) rmi $$($(DOCKER) images --filter dangling=true -q) || :

