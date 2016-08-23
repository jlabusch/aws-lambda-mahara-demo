# mahara-docker

<span style="background-color:yellow">DO NOT USE THIS FOR ANYTHING SERIOUS.</span><br/>
It's completely untested, only exists because I needed a Mahara system for a tech demo.

P.S. if you need a real Mahara system, I know people.


### Notes

* Start Mahara with docker-compose up
* Load website, mash "Install" and register your admin user
* Go to Administration -> Extensions -> Web services and select "Use web services"
* Create a service access token for "admin" in the User Provisioning service, e.g. 8b3fb24be9aeaf7e36f2cf88cb19112c
* Update the token and password in import-script/Makefile
* cd import-script && make clean build run
