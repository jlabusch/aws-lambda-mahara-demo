BASE=$(shell basename $$PWD)
IMAGE=jlabusch/$(BASE)
DOCKER=docker

.PHONY: build run clean

build: $(BASE).zip

$(BASE).zip:
	@$(DOCKER) build -t $(IMAGE) .
	@$(DOCKER) run -it --rm -v $$PWD:/opt/app $(IMAGE) npm install
	rm -f $@
	zip -r $@ *

run:
	@$(DOCKER) run -it --rm -v $$PWD:/opt/app $(IMAGE)

clean:
	$(DOCKER) rmi $(IMAGE) || :
	$(DOCKER) rmi $$($(DOCKER) images --filter dangling=true -q) || :
	rm -f $(BASE).zip

