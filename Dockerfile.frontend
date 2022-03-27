FROM node:16 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV DISABLE_ESLINT_PLUGIN=true

ARG BUILD_ENV=testing

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build:$BUILD_ENV

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
