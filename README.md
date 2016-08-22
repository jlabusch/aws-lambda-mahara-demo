# mahara-docker

DO NOT USE THIS FOR ANYTHING SERIOUS.
It's completely untested, only exists because I needed a Mahara system for a tech demo.

P.S. if you need a real Mahara system, I know people.


### Configuration tasks

* Load website, mash "Install" and register your admin user
* Go to Administration -> Extensions -> Web services and select "Use web services"
* Create a service access token for "admin" in the User Provisioning service, e.g. 8b3fb24be9aeaf7e36f2cf88cb19112c
* Try it out: 
  curl -H 'Content-Type: application/json' -d @user_example.json -i 'http://localhost:8003//webservice/rest/server.php?wstoken=8b3fb24be9aeaf7e36f2cf88cb19112c&wsfunction=mahara_user_create_users&alt=json'
  curl -H 'Content-Type: application/json' -i 'http://localhost:8003//webservice/rest/server.php?wstoken=8b3fb24be9aeaf7e36f2cf88cb19112c&wsfunction=mahara_user_get_users&alt=json'
