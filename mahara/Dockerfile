FROM ubuntu:14.04

ENV TERM=xterm

RUN DEBIAN_FRONTEND=noninteractive; \
    apt-get update && \
    apt-get install -y \
        apache2 make curl wget xvfb git gitk postgresql default-jre php5-cli libapache2-mod-php5 php5-curl php5-gd php5-json php5-ldap php5-pgsql php5-xmlrpc nodejs-legacy npm

RUN cd /opt && git clone https://git.mahara.org/mahara/mahara.git && \
    cd mahara && git checkout 16.04.3_RELEASE && \
    sed -i 's/2,4/2,20/' /opt/mahara/htdocs/lib/pieforms/pieform/rules/email.php && \
    chmod a+rx /opt/mahara

ADD config.php /opt/mahara/htdocs/

RUN mkdir /var/lib/maharadata && \
    mkdir /var/lib/maharadata/master && \
    chown www-data:www-data /var/lib/maharadata/master && \
    echo 'post_max_size = 32M' >> /etc/php5/cli/php.ini && \
    echo 'post_max_size = 32M' >> /etc/php5/apache2/php.ini

ADD mahara.conf /etc/apache2/sites-available/

RUN a2ensite mahara && \
    a2dissite 000-default && \
    apache2ctl configtest && \
    apache2ctl graceful && \
    echo '* * * * * www-data /usr/bin/php /opt/mahara/htdocs/lib/cron.php' > /etc/cron.d/mahara

RUN cd /opt/mahara && npm install && npm install -g gulp && make css

#RUN apt-clean && rm -fr /var/lib/apt/lists/*

EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
