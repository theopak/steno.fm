FROM ubuntu

MAINTAINER Theodore X. Pak <mail@theopak.com>

# Install dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y install git python build-essential nodejs && \
    npm install -g bower grunt-cli

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install && bower install
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/web/ && cp -a /tmp/bower_components /opt/web/
# RUN grunt build && cp -a /tmp/dist /opt/web/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/web
ADD . /opt/web
RUN npm install && bower --allow-root install && grunt build

EXPOSE 9000

CMD ["npm", "start"]
