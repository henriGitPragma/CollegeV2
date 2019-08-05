FROM node:11-alpine

RUN apk add --no-cache tini
COPY --chown=node:node . /home/node/app

USER node
WORKDIR /home/node/app

RUN npm install --production

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD npm start
