FROM node:latest
 # Create app directory
 RUN mkdir -p /app
 WORKDIR /app

 #Install app dependencies
 COPY app/package.json /app/
 COPY app/webpack.config.js /app/
 RUN npm install

 #Bundle app source
 #COPY app/src /app/src

 EXPOSE 3333
 CMD ["npm", "run", "dev"]
