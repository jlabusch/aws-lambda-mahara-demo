FROM node:4.3

RUN useradd -m -s /bin/bash jacques && \
    mkdir -p /opt/app && \
    chown jacques:jacques /opt/app

USER jacques

ADD index.js package.json /opt/app/

WORKDIR /opt/app

CMD ["bash"]
