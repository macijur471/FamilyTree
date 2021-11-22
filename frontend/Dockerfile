ARG PORT_FRONTEND=3000

FROM node:14.17-alpine
# Set ENV
ENV CHOKIDAR_USEPOLLING=true

WORKDIR /usr/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app config files
COPY tsconfig.json ./

# Copy app sources
COPY src src/
COPY public public/

RUN npm install -g serve

RUN npm run build

EXPOSE ${PORT_FRONTEND}

CMD [ "serve", "-p", "3000", "-s", "build" ]