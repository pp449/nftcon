FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev", "--host", "0.0.0.0"]
