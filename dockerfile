# Dockerfile to run a Sheppark web server with NodeJs build agents
# Based on the Ubuntu 14.04 (LTS) image

FROM ubuntu:14.04

# © Andrew Sheppard 2016
MAINTAINER Andrew Sheppard <asheppard.dev@gmail.com>

# Install common utilities
RUN sudo apt-get update && sudo apt-get install -y \
    build-essential \
    curl \
    git \
    nano \
    software-properties-common \
    tar \ 
    unzip \
    wget
    
# Install Ruby and Sass
RUN sudo apt-get install -y ruby-full && \
    sudo gem install sass

# Install Node and Npm (v5.x)
RUN sudo apt-get remove --purge nodejs npm && \
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash - && \
    sudo apt-get install -y \
    nodejs
    
# Provide Node link to NodeJs
RUN sudo ln -s /usr/bin/nodejs /usr/local/bin/node

# Install Node global packages
RUN sudo npm install -g grunt-cli forever

# Clone Sheppark Git repository
RUN echo Cloning Sheppark - 13012016 && \
    mkdir /var/www && \
    git clone https://github.com/DDN-Shep/Sheppark /var/www

# Define the working directory.
WORKDIR /var/www

# Install local Node dependencies
RUN npm install && \
    grunt build

# Open Sheppark web server port 80
EXPOSE 80

# Run Sheppark web server via Forever
CMD ["forever", "-c", "node --harmony", "server.js"]

# Or replace aboove with this to run directly via Node
#CMD ["node", "server"]



# Start Sheppark Web Server
# sudo docker stop sheppark-web-server && docker rm sheppark-web-server
# sudo docker run -dit -p 80:3000 -v /var/data/sheppark:/data/sheppark --name sheppark-web-server andyshep/sheppark-web-server
# sudo docker run -dit -p 80:80 -v /var/data/sheppark:/data/sheppark --name sheppark-web-server andyshep/sheppark-web-server

# To inspect the docker process
# PID=$(sudo docker inspect --format {{.State.Pid}} sheppark-web-server) && \ 
# sudo nsenter --target $PID --mount --uts --ipc --net --pid