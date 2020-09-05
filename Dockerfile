FROM node:slim as build-deps
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /build /usr/share/nginx/html
COPY --from=build-deps /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]