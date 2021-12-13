# use an existing docker image as a base
FROM node:alpine
WORKDIR /usr/app
# download and install a dependency
COPY ./package.json ./
RUN npm install
COPY ./ ./

# tell the image what to do when it starts as a container
CMD ["npm","start"]

#############################################
FROM node:14.slim
WORKDIR /opt/node-todo-app

COPY . .
ENV PORT=4000
EXPOSE 4000
RUN npm install
CMD ["node","app.js"]