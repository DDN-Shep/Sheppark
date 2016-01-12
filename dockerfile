# Dockerfile to run a Sheppark web server with NodeJs build agents
# Based on the Ubuntu 14.04 (LTS) image

FROM ubuntu:14.04

# © Andrew Sheppard 2016
MAINTAINER Andrew Sheppard <asheppard.dev@gmail.com>

# Install utilities
RUN sudo apt-get update && sudo apt-get install -y \
    build-essential \
    curl \
    git \
    software-properties-common \
    tar \ 
    unzip \
    wget

# Install NodeJs (latest)
RUN curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    sudo apt-get install -y \
    nodejs

# Install NodeJs global packages
RUN sudo npm install -g \
    npm@latest \
    grunt-cli \
    forever

# Define the working directory.
WORKDIR /data

# Clone Sheppark Git repository
RUN sudo mkdir /var/www - && \
    sudo git clone https://github.com/DDN-Shep/Sheppark /var/www

RUN cd /var/www && sudo npm install

# Open Sheppark web server port 80
EXPOSE 80
EXPOSE 3000

# Run Sheppark web server via NodeJs
#CMD ["forever", "start", "/var/www/server.js"]
CMD ["node", "/var/www/server.js"]




# Start Sheppark Web Server
# sudo docker stop sheppark && docker rm sheppark
# sudo docker run -dt -p 80:3000 -v /var/data/sheppark:/data/sheppark --name sheppark-web-server andyshep/sheppark-web-server
# sudo docker run -dt -p 80:80 -v /var/data/sheppark:/data/sheppark --name sheppark-web-server

# To inspect the docker process
# PID=$(sudo docker inspect --format {{.State.Pid}} sheppard-web-server) && \ 
# sudo nsenter --target $PID --mount --uts --ipc --net --pid