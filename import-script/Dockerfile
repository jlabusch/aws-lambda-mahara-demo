FROM node:4.3

RUN useradd -m -s /bin/bash jacques

USER jacques

ADD index.js package.json /home/jacques/

RUN cd /home/jacques && npm install

WORKDIR /home/jacques

CMD ["bash"]
