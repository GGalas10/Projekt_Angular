FROM node:20 AS build
WORKDIR /app

COPY FrontEnd_Angular/package*.json ./

RUN rm -rf node_modules package-lock.json

COPY FrontEnd_Angular/ .
EXPOSE 80

CMD ["npm", "run", "start"]