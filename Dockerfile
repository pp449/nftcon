FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]

