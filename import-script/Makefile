RUN_ARGS=-it --rm -v $$PWD:/opt
BASE=$(shell basename $$PWD)
IMAGE=jlabusch/$(BASE)
DOCKER=docker

.PHONY: build run clean

build:
	@$(DOCKER) build -t $(IMAGE) .

run:
	@$(DOCKER) images | grep -q $(IMAGE) || make build
	@$(DOCKER) run $(RUN_ARGS) $(VOLUME_ARGS) $$MORE_RUN_ARGS $(IMAGE) $$OVERRIDE

clean:
	rm -fr node_modules
	$(DOCKER) rmi $(docker images --filter dangling=true -q) $(IMAGE) || :

