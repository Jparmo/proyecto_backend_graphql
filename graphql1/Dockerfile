FROM node:16.14.0

WORKDIR /app
# copia todos los los pquetes que terminen .json al directorio actual app dentro del contenedor
COPY package*.json .

RUN npm install 

COPY ./src /app/src


EXPOSE 4000

CMD [ "npm", "run", "dev" ]