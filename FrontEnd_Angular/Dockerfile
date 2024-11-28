FROM node:20.12.2 as build

WORKDIR /app

RUN npm install -g @angular/cli


EXPOSE 4200

CMD npm install && ng serve --host 0.0.0.0 --poll 2000