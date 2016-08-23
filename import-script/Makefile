BASE=$(shell basename $$PWD)
IMAGE=jlabusch/$(BASE)
DOCKER=docker

.PHONY: build run clean

build:
	@$(DOCKER) build -t $(IMAGE) .

run:
	@$(DOCKER) images | grep -q $(IMAGE) || make build
	@$(DOCKER) run -it --rm -e SCRIPT_HOST=whale.shark.horse -e SCRIPT_USER=jacques -e SCRIPT_PASS=XXX -e SCRIPT_MAHARA='http://192.168.0.16:8003/webservice/rest/server.php?wstoken=2d8cf387e7bfd1e2a8848845a3a7e26f&wsfunction=mahara_user_create_users&alt=json' $(IMAGE) npm start

clean:
	rm -fr node_modules
	$(DOCKER) rmi $(docker images --filter dangling=true -q) $(IMAGE) || :

