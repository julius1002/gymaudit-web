FROM node:16.9 as node
WORKDIR /app
COPY package*.json ./
RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN npm install
COPY . .
RUN npm run ng build -- --configuration=production
FROM nginx:1.13
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf