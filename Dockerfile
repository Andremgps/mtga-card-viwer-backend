FROM node:12
WORKDIR /app
COPY package-lock.json .
COPY package.json .
ADD images/ ./images/
RUN npm install
COPY dist .
COPY wait-for-it.sh .
CMD node main.js