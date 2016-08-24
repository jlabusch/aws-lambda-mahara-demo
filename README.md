# AWS Lambda/Mahara demo

This code accompanies a presentation on doing "serverless" user import/migration for Mahara.

<b>DO NOT USE THIS FOR ANYTHING SERIOUS.</b><br/>
It's completely untested, only exists for tech demo purposes.

P.S. if you need a real Mahara system, I know people.


### Notes to self

* Start Mahara with cd mahara && docker-compose up -d
* Load website at localhost:80, mash "Install" and register your admin user
* Go to Administration -> Extensions -> Web services and select "Use web services"
* Create a service access token for "admin" in the User Provisioning service, e.g. 8b3fb24be9aeaf7e36f2cf88cb19112c
* Update the token and password in import-script/config.json (which I haven't checked in on purpose.)
* cd import-script && make clean build
* Upload import-script.zip as an AWS Lambda function
