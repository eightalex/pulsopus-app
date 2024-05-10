FROM node:20-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD package.json package.json
ADD . .
#RUN yarn --network-timeout 100000 --network-concurrency 1
#RUN yarn config delete proxy
#RUN yarn config delete https-proxy
RUN yarn install
RUN yarn run build:dev

ARG REACT_APP_BASE_URL

ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL


# production environment
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

