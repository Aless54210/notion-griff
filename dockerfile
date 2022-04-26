#############
### build ###
#############

# base image
FROM node:14.15.0

# set working directory
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /frontend/package.json

RUN npm update
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /frontend

# generate build
CMD ["npm", "start"]
